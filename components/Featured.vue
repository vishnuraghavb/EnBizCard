<template>
  <div class="flex flex-col w-full mt-6 bg-gray-800 rounded">
    <div class="flex justify-between">
      <div class="flex items-center w-full">
        <div
          class="p-1 flex-shrink-0 focus:outline-none drag cursor-move"
          tabindex="-1"
        >
          <div
            class="w-6 h-6"
            v-html="require(`~/assets/icons/drag.svg?include`)"
          ></div>
        </div>
        <div class="w-full">
          <input
            class="px-4 w-full h-12 bg-transparent placeholder-gray-600 transition-colors duration-200 border-b border-black focus:outline-none focus:border-gray-500 hover:border-gray-500"
            type="text"
            name="section title"
            placeholder="Section title"
            v-model="featured[index].title"
            title="Type your own section title"
          />
        </div>
      </div>
      <button
        class="p-1 m-2 flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
        @click="featured.splice(index, 1)"
        aria-label="Remove section"
        title="Remove section"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/x.svg?include`)"
        ></div>
      </button>
    </div>
    <draggable
      group="featured"
      :list="featured[index].content"
      class="mt-4"
      handle=".drag"
      animation="1"
      ghostClass="ghost"
    >
      <transition-group name="list">
        <div v-for="(item, i) in featured[index].content" :key="'item' + i">
          <div
            class="flex items-center mt-2"
            v-if="item.contentType == 'media'"
          >
            <button
              class="p-1 flex-shrink-0 focus:outline-none drag cursor-move"
              tabindex="-1"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/drag.svg?include`)"
              ></div>
            </button>
            <img
              class="w-12 h-12 rounded mr-3 object-contain flex-shrink-0"
              v-if="
                item.type == 'image'
                  ? item.dataURI
                  : item.coverDataURI
                  ? item.coverDataURI
                  : false
              "
              :src="item.type == 'image' ? item.dataURI : item.coverDataURI"
              :alt="item.title"
            />
            <a
              v-else
              class="w-12 h-12 mr-3 bg-gray-900 flex items-center justify-center text-center text-xs rounded flex-shrink-0 leading-none select-none cursor-pointer"
              target="_blank"
              href="https://duckduckgo.com/?q=Add+ID3+tags+to+mp3+file"
            >
              {{ item.info }}
            </a>
            <!-- prettier-ignore -->
            <p class="w-full leading-none whitespace-pre overflow-x-hidden">{{ item.name }}</p>
            <button
              class="p-1 m-2 self-end flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
              @click="removeItem(i)"
              aria-label="Remove media"
              title="Remove media"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/x.svg?include`)"
              ></div>
            </button>
          </div>
          <ProductCard
            v-else-if="item.contentType == 'product'"
            :featured="featured"
            :item="item"
            :index="index"
            :i="i"
            :resizeImage="resizeImage"
            :showAlert="showAlert"
          />
          <div
            class="flex items-center mt-2"
            v-else-if="item.contentType == 'text'"
          >
            <button
              class="p-1 flex-shrink-0 focus:outline-none drag cursor-move"
              tabindex="-1"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/drag.svg?include`)"
              ></div>
            </button>
            <div class="w-full">
              <textarea
                class="block px-4 py-3 w-full bg-black rounded border border-transparent placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-gray-500 resize-none hover:border-gray-500"
                ref="text"
                aria-label="Type text content here"
                title="Type text content here"
                v-model="featured[index].content[i].value"
                placeholder="Type text content here"
                rows="5"
              ></textarea>
            </div>
            <button
              class="p-1 m-2 flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
              @click="removeItem(i)"
              aria-label="Remove text"
              title="Remove text"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/x.svg?include`)"
              ></div>
            </button>
          </div>
          <div class="flex items-center mt-2" v-else>
            <button
              class="p-1 flex-shrink-0 focus:outline-none drag cursor-move"
              tabindex="-1"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/drag.svg?include`)"
              ></div>
            </button>
            <div class="w-full">
              <input
                class="px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
                ref="link"
                type="text"
                aria-label="Paste HTML embed link here"
                title="Paste HTML embed link here"
                v-model="featured[index].content[i]"
                placeholder="Paste HTML embed link here"
              />
            </div>
            <button
              class="p-1 m-2 flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
              @click="removeItem(i)"
              aria-label="Remove field"
              title="Remove field"
            >
              <div
                class="w-6 h-6"
                v-html="require(`~/assets/icons/x.svg?include`)"
              ></div>
            </button>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div
      class="grid grid-flow-row sm:grid-cols-2 gap-2 w-full p-2"
      :class="{ 'mt-4': hasContent }"
    >
      <button
        class="flex sm:flex-col items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
        @click="attachMedia()"
        aria-label="Attach media"
        :class="
          dragOver ? 'bg-gray-900 outline-white' : 'bg-gray-700 border-none'
        "
        @drop.prevent="fileLoaded($event, true)"
        @dragleave.prevent.self="dragOver = false"
        @dragover.prevent.self="dragOver = true"
      >
        <input
          ref="import"
          type="file"
          :accept="mimetypes"
          v-show="false"
          @change="fileLoaded($event, false)"
          @click="$event.target.files = null"
        />
        <div
          class="w-6 h-6 mr-2 sm:mr-0 pointer-events-none"
          v-html="require(`~/assets/icons/file.svg?include`)"
        ></div>
        <p class="sm:mt-2 leading-none pointer-events-none">Attach media</p>
      </button>
      <button
        class="flex sm:flex-col items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
        @click="addText()"
        aria-label="Add text"
      >
        <div
          class="w-6 h-6 mr-2 sm:mr-0"
          v-html="require(`~/assets/icons/text.svg?include`)"
        ></div>
        <p class="sm:mt-2 leading-none">Add text</p>
      </button>
      <button
        class="flex sm:flex-col items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
        @click="addLink()"
        aria-label="Embed link"
      >
        <div
          class="w-6 h-6 mr-2 sm:mr-0"
          v-html="require(`~/assets/icons/code.svg?include`)"
        ></div>
        <p class="sm:mt-2 leading-none">Embed link</p>
      </button>
      <button
        class="flex sm:flex-col items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
        @click="addProduct()"
        aria-label="Add product"
      >
        <div
          class="w-6 h-6 mr-2 sm:mr-0"
          v-html="require(`~/assets/icons/box.svg?include`)"
        ></div>
        <p class="sm:mt-2 leading-none">Add product</p>
      </button>
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
import draggable from 'vuedraggable'

import ProductCard from './ProductCard'

export default {
  props: [
    'featured',
    'mimetypes',
    'label',
    'index',
    'resizeImage',
    'showAlert',
  ],
  data() {
    return {
      dragOver: false,
    }
  },
  components: {
    ProductCard,
    draggable,
  },
  computed: {
    hasContent() {
      return this.featured[this.index].content.length
    },
  },
  methods: {
    mediaType(t) {
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
    attachMedia() {
      this.$refs.import.click()
    },
    addLink() {
      this.featured[this.index].content.push('')
      let links = this.featured[this.index].content.filter(
        (e) => !e.contentType
      )
      setTimeout(() => this.$refs.link[links.length - 1].focus(), 50)
    },
    addProduct() {
      this.featured[this.index].content.push({
        image: null,
        title: null,
        description: null,
        price: null,
        label: null,
        link: null,
        contentType: 'product',
      })
    },
    addText() {
      this.featured[this.index].content.push({
        contentType: 'text',
        value: null,
      })
      let texts = this.featured[this.index].content.filter(
        (e) => e.contentType == 'text'
      )
      setTimeout(() => this.$refs.text[texts.length - 1].focus(), 50)
    },
    fileLoaded(e, dropped) {
      if (
        (dropped && e.dataTransfer.files.length) ||
        (!dropped && e.target.files.length)
      ) {
        let file = dropped ? e.dataTransfer.files[0] : e.target.files[0]
        this.dragOver = false
        let mimetype = file.type
        let type = this.mediaType(mimetype)
        if (file) {
          switch (type) {
            case 'image':
              this.imageLoaded(file, type, mimetype)
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
                'Unsupported file format.\n\nOnly jpeg, png, mp3, mp4, webm and pdf files can be attached.'
              )
              break
          }
        }
      } else this.dragOver = false
    },
    getFileName(file) {
      return file.name.replace(/(?:\.([^.]+))?$/, '')
    },
    removeItem(i) {
      this.featured[this.index].content.splice(i, 1)
    },
    // Images
    imageLoaded(file, type, mime) {
      let title = this.getFileName(file)
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        let ext = dataURI
          .split(',')[0]
          .split(':')[1]
          .split('/')[1]
          .match(/^\w+/g)[0]
        this.featured[this.index].content.push({
          name: file.name,
          title,
          dataURI,
          file,
          type,
          contentType: 'media',
          ext,
          mime,
        })
        this.resizeImage(
          type,
          mime,
          this.index,
          this.featured[this.index].content.length - 1
        )
      }
      reader.readAsDataURL(file)
    },

    // Music
    musicLoaded(file, type) {
      this.extractTags(file, type)
        .then((f) => {
          this.resizeImage(
            type,
            'image/jpeg',
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
                  name: file.name,
                  cover,
                  coverDataURI,
                  coverExt: 'jpeg',
                  title: tag.title,
                  artist: tag.artist,
                  album: tag.album,
                  dataURI: URL.createObjectURL(file),
                  type,
                  contentType: 'media',
                  file,
                  ext: 'mp3',
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
                this.featured[this.index].content.push({
                  name: file.name,
                  title: tag.title,
                  artist: tag.artist,
                  album: tag.album,
                  dataURI: URL.createObjectURL(file),
                  type,
                  contentType: 'media',
                  file,
                  ext: 'mp3',
                  info: 'No Thumb',
                })
                reject()
              }
            } else {
              this.featured[this.index].content.push({
                name: file.name,
                title: this.getFileName(file),
                dataURI: URL.createObjectURL(file),
                type,
                contentType: 'media',
                file,
                ext: 'mp3',
                info: 'No ID3 Tag',
              })
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
      let vm = this
      function videoProcessor() {
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
        vm.featured[vm.index].content.push({
          name: file.name,
          coverDataURI,
          coverExt: 'jpeg',
          dataURI,
          file,
          title,
          type,
          contentType: 'media',
          ext: 'mp4',
        })
      }
      if (uA && uA.length == 2) {
        video.addEventListener('loadstart', videoProcessor)
      } else {
        video.addEventListener('seeked', videoProcessor)
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
                name: file.name,
                cover,
                coverDataURI,
                coverExt: 'jpeg',
                file,
                filesize,
                title,
                type,
                contentType: 'media',
                ext: 'pdf',
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
