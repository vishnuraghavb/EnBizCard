<template>
  <div class="flex flex-col w-full mt-6 bg-gray-700 p-4 rounded shadow">
    <div class="flex justify-between">
      <div class="flex items-center w-full">
        <div
          class="w-12 h-12 p-3 mr-3"
          v-html="require(`~/assets/icons/featured.svg?include`)"
        ></div>
        <div class="w-3/4">
          <input
            class="px-4 w-full h-12 bg-gray-700 placeholder-gray-500 border-b border-gray-600 transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
            type="text"
            name="section title"
            placeholder="Section title"
            v-model="featured[index].title"
            title="Type your own section title"
          />
        </div>
      </div>
      <button
        class="p-3 flex-shrink-0 outline-none"
        @click="featured.splice(index, 1)"
        aria-label="Remove section"
        title="Remove section"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/remove.svg?include`)"
        ></div>
      </button>
    </div>

    <div class="flex mt-4">
      <div class="flex flex-wrap items-center">
        <div v-for="(item, i) in featured[index].content" :key="i">
          <img
            class="h-10 border-2 rounded p-1 m-1 border-gray-700 transition-colors duration-200 hover:border-red-600 cursor-pointer"
            v-if="item.type == 'image' ? item.dataURI : item.coverDataURI"
            :src="item.type == 'image' ? item.dataURI : item.coverDataURI"
            :alt="item.title"
            title="Click to remove content"
            @click="removeItem(i)"
            @keypress.prevent="removeItem(i)"
            tabindex="0"
          />
        </div>
        <button
          class="p-1 m-2 shadow-md rounded-full cursor-pointer bg-gray-500 hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
          @click="loadFile()"
          :aria-label="label"
          :title="fileAttached ? label : ''"
        >
          <input
            ref="import"
            type="file"
            :accept="mimetypes"
            v-show="false"
            @change="fileLoaded($event)"
            @click="$event.target.files = null"
          />
          <div
            class="w-6 h-6"
            v-html="require(`~/assets/icons/add.svg?include`)"
          ></div>
        </button>
        <p class="ml-1 leading-none" v-if="!fileAttached">
          {{ label }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { convertFileToBuffer } from 'id3-parser/lib/universal/helpers'
import { parse } from 'id3-parser'
const pdfjs = require('pdfjs-dist/build/pdf.min')
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry')
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
pdfjs.disableWorker = true
pdfjs.workerSrc = false
export default {
  props: [
    'featured',
    'mimetypes',
    'label',
    'index',
    'resizeImage',
    'showAlert',
  ],
  computed: {
    fileAttached() {
      return this.featured[this.index].content.length
    },
  },
  methods: {
    type(t) {
      switch (true) {
        case t == 'image/jpeg' || t == 'image/png':
          return 'image'
        case t == 'audio/mpeg':
          return 'music'
        case t == 'video/mp4' || t == 'video/webm':
          return 'video'
        case t == 'application/pdf':
          return 'document'
      }
    },
    loadFile() {
      this.$refs.import.click()
    },
    fileLoaded(e) {
      let file = e.target.files[0]
      let mimetype = file.type
      let type = this.type(mimetype)
      if (file) {
        switch (type) {
          case 'image':
            this.imageLoaded(file, type)
            break
          case 'music':
            this.musicLoaded(file, type)
            break
          case 'video':
            this.videoLoaded(file, type)
            break
          case 'document':
            this.documentLoaded(file, type)
            break
          default:
            this.showAlert(
              'Unsupported file format.\nSupports jpeg, png, mp3, mp4, webm, pdf'
            )
            break
        }
      }
    },
    getFileName(file) {
      return file.name.replace(/(?:\.([^.]+))?$/, '')
    },
    removeItem(i) {
      this.featured[this.index].content.splice(i, 1)
    },
    // Images
    imageLoaded(file, type) {
      let title = this.getFileName(file)
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        this.featured[this.index].content.push({
          dataURI,
          file,
          type,
          format: 'jpeg',
          title,
        })
        this.resizeImage(
          type,
          this.index,
          this.featured[this.index].content.length - 1
        )
      }
      reader.readAsDataURL(file)
    },

    // Music
    async musicLoaded(file, type) {
      this.extractTags(file, type)
        .then((f) => {
          this.resizeImage(
            type,
            this.index,
            this.featured[this.index].content.length - 1
          )
        })
        .catch((err) => {})
    },
    async extractTags(file, type) {
      return new Promise((resolve, reject) => {
        convertFileToBuffer(file)
          .then(parse)
          .then((tag) => {
            if (tag) {
              if (tag.image) {
                let cover = new Blob([new Uint8Array(tag.image.data)])
                let coverDataURI = URL.createObjectURL(cover)
                this.featured[this.index].content.push({
                  cover,
                  coverDataURI,
                  coverFormat: 'jpeg',
                  title: tag.title,
                  artist: tag.artist,
                  album: tag.album,
                  dataURI: URL.createObjectURL(file),
                  type,
                  file,
                  format: 'mp3',
                })
                let loadTags = setInterval(() => {
                  if (
                    this.featured[this.index].content[
                      this.featured[this.index].content.length - 1
                    ].file
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
      })
    },

    // Videos
    videoLoaded(file, type) {
      let title = this.getFileName(file)
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let video = document.createElement('video')
      let videoFile, dataURI
      let maxWidth, maxHeight
      maxWidth = maxHeight = 80
      let reader = new FileReader()
      let uA = navigator.userAgent.match(/firefox|android/gi)
      if (uA && uA.length == 2) {
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
          this.featured[this.index].content.push({
            coverDataURI,
            coverFormat: 'jpeg',
            dataURI,
            file,
            title,
            type,
            format: 'mp4',
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
          this.featured[this.index].content.push({
            coverDataURI,
            coverFormat: 'jpeg',
            dataURI,
            file,
            title,
            type,
            format: 'mp4',
          })
        })
      }

      reader.onload = (f) => {
        videoFile = new Blob([f.target.result], { type: 'video/mp4' })
        dataURI = URL.createObjectURL(videoFile)
        video.src = dataURI + '#t=0.2'
      }
      reader.readAsArrayBuffer(file)
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
    documentLoaded(file, type) {
      let filesize = this.formatBytes(file.size)
      let title = this.getFileName(file)
      let reader = new FileReader()
      let data, maxWidth, maxHeight
      maxWidth = maxHeight = 1296
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
              this.featured[this.index].content.push({
                cover,
                coverDataURI,
                coverFormat: 'jpeg',
                file,
                filesize,
                title,
                type,
                format: 'pdf',
              })
            })
          })
        })
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
