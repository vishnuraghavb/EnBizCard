<template>
  <div class="flex mt-6">
    <div
      v-if="fileAttached"
      class="w-12 h-12 p-3 mr-1"
      v-html="require(`~/assets/icons/${type}.svg?include`)"
    ></div>
    <div class="flex flex-wrap items-center">
      <div v-for="(item, index) in featured[type]">
        <img
          class="h-12 border-2 p-1 mr-1 border-white transition-colors duration-200 hover:border-red-600 cursor-pointer"
          v-if="type == 'images' ? item.dataURI : item.coverDataURI"
          :src="type == 'images' ? item.dataURI : item.coverDataURI"
          :alt="item.title"
          :title="
            type == 'music'
              ? `${item.title}\n${item.album}\n${item.artist}`
              : item.title
          "
          @click="featured[type].splice(index, 1)"
        />
      </div>
      <button
        class="p-2 border-4 border-gray-900 rounded-full cursor-pointer shadow"
        @click="loadFile(type)"
        :aria-label="label"
      >
        <input
          :ref="`import${type}`"
          type="file"
          :accept="mimetypes"
          v-show="false"
          @change="fileLoaded($event, type)"
          @click="$event.target.files = null"
        />
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/add.svg?include`)"
        ></div>
      </button>
      <p class="ml-3 leading-none" v-if="!fileAttached">
        {{ label
        }}<span class="text-sm text-gray-700"><br />{{ description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { convertFileToBuffer } from 'id3-parser/lib/universal/helpers'
import { parse } from 'id3-parser'

import pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default {
  props: [
    'featured',
    'type',
    'mimetypes',
    'label',
    'description',
    'resizeImage',
    'showAlert',
  ],
  computed: {
    fileAttached() {
      return this.featured[this.type].length
    },
  },
  methods: {
    loadFile(type) {
      this.$refs[`import${type}`].click()
    },
    fileLoaded(e, type) {
      if (e.target.files[0]) {
        switch (type) {
          case 'images':
            this.imageLoaded(e, type)
            break
          case 'music':
            this.musicLoaded(e, type)
            break
          case 'videos':
            this.videoLoaded(e, type)
            break
          case 'documents':
            this.documentLoaded(e, type)
            break
          default:
            break
        }
      }
    },
    getFileName(file) {
      return file.name.replace(/(?:\.([^.]+))?$/, '')
    },
    // Images
    imageLoaded(e, type) {
      let file = e.target.files[0]
      let mimetype = file.type
      if (mimetype.match(/(image\/jpeg|image\/png)/g)) {
        let title = this.getFileName(file)
        let reader = new FileReader()
        reader.onload = (f) => {
          let dataURI = f.target.result
          this.featured[type].push({
            dataURI,
            file,
            format:'jpeg',
            title,
          })
          this.resizeImage(type, this.featured[type].length - 1)
        }
        reader.readAsDataURL(file)
      } else
        this.showAlert(
          'Unsupported file format.\nTry again with a valid jpg, jpeg or png file.'
        )
    },

    // Music
    async musicLoaded(e, type) {
      this.extractTags(e, type)
        .then((f) => {
          this.resizeImage(type, this.featured[type].length - 1)
        })
        .catch((err) => {})
    },
    async extractTags(e, type) {
      let file = e.target.files[0]
      let mimetype = file.type
      return new Promise((resolve, reject) => {
        if (mimetype.match(/(audio\/mpeg)/g)) {
          convertFileToBuffer(file)
            .then(parse)
            .then((tag) => {
              if (tag) {
                console.log(tag)
                if (tag.image) {
                  let cover = new Blob([new Uint8Array(tag.image.data)])
                  let coverDataURI = URL.createObjectURL(cover)
                  this.featured[type].push({
                    cover,
                    coverDataURI,
                    coverFormat: 'jpeg',
                    title: tag.title,
                    artist: tag.artist,
                    album: tag.album,
                    dataURI: URL.createObjectURL(file),
                    file,
                  })
                  let loadTags = setInterval(() => {
                    if (
                      this.featured[type][this.featured[type].length - 1].file
                    ) {
                      clearInterval(loadTags)
                      resolve(true)
                    }
                  }, 500)
                } else {
                  this.showAlert(
                    'Looks like this mp3 file has no album art.\n\nMusic with no album art can make you look unprofessional. So, please re-attach the file after adding an album art.\n\n<b>Pro-tip</b>: A professionally designed album art or cover image can help your music stand out.'
                  )
                  reject()
                }
              } else {
                this.showAlert(
                  'Looks like this mp3 file has no ID3 tags.\n\nMusic with no ID3 tags can make you look unprofessional. So, please re-attach the file after adding some tag information.'
                )
                reject()
              }
            })
        } else {
          this.showAlert(
            'Unsupported file format.\nTry again with a valid mp3 file.'
          )
          reject()
        }
      })
    },

    // Videos
    videoLoaded(e, type) {
      let file = e.target.files[0]
      let mimetype = file.type
      let title = this.getFileName(file)
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let video = document.createElement('video')
      let videoFile, dataURI
      let maxWidth, maxHeight
      maxWidth = maxHeight = 80
      let reader = new FileReader()
      if (mimetype.match(/video\/mp4|video\/webm/gi)) {
        if (navigator.userAgent.match(/firefox|android/gi).length == 2) {
          video.addEventListener('loadstart', () => {
            let width = video.videoWidth
            let height = video.videoHeight

            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
            canvas.width = width
            canvas.height = height
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            let coverDataURI = canvas.toDataURL('image/jpeg', 0.8)
            this.featured[type].push({
              coverDataURI,
              coverFormat: 'jpeg',
              dataURI,
              file,
              title,
            })
          })
        } else {
          video.addEventListener('seeked', () => {
            let width = video.videoWidth
            let height = video.videoHeight

            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
            canvas.width = width
            canvas.height = height
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            let coverDataURI = canvas.toDataURL('image/jpeg', 0.8)
            this.featured[type].push({
              coverDataURI,
              coverFormat: 'jpeg',
              dataURI,
              file,
              title,
            })
          })
        }

        reader.onload = (f) => {
          videoFile = new Blob([f.target.result], { type: 'video/mp4' })
          dataURI = URL.createObjectURL(videoFile)
          video.src = dataURI + '#t=0.2'
        }
        reader.readAsArrayBuffer(file)
      } else
        this.showAlert(
          'Unsupported file format.\nTry again with a valid mp4 file.'
        )
    },

    // PDFs
    dataURIToBinary(dataURI) {
      var BASE64_MARKER = ';base64,'
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
      var base64 = dataURI.substring(base64Index)
      var raw = window.atob(base64)
      var rawLength = raw.length
      var array = new Uint8Array(new ArrayBuffer(rawLength))

      for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    },
    formatBytes(a, b = 2) {
      if (0 === a) return '0 Bytes'
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024))
      return (
        parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
        ' ' +
        ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
      )
    },
    documentLoaded(e, type) {
      let file = e.target.files[0]
      let filesize = this.formatBytes(file.size)
      let mimetype = file.type
      let title = this.getFileName(file)
      let reader = new FileReader()
      let data, maxWidth, maxHeight
      maxWidth = maxHeight = 1296
      if (mimetype.match(/application\/pdf/gi)) {
        reader.onload = (f) => {
          data = this.dataURIToBinary(f.target.result)
          let loadingTask = pdfjs.getDocument(data)
          loadingTask.promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              let scale = 1
              let viewport = page.getViewport({ scale })
              let width = viewport.width
              let height = viewport.height

              if (width > maxWidth) {
                height *= maxWidth / width
                width = maxWidth
              }
              if (height > maxHeight) {
                width *= maxHeight / height
                height = maxHeight
              }
              canvas.width = width
              canvas.height = height
              var renderContext = {
                canvasContext: ctx,
                viewport: viewport,
              }
              page.render(renderContext).promise.then((e) => {
                let coverDataURI = canvas.toDataURL('image/jpeg', 0.8)
                let cover = new Blob([this.dataURIToBinary(coverDataURI)], {
                  type: 'image/jpeg',
                })
                this.featured[type].push({
                  cover,
                  coverDataURI,
                  coverFormat: 'jpeg',
                  file,
                  filesize,
                  title,
                })
              })
            })
          })
        }
        reader.readAsDataURL(file)
      } else {
        this.showAlert(
          'Unsupported file format.\nTry again with a valid pdf file.'
        )
      }
    },
  },
}
</script>
