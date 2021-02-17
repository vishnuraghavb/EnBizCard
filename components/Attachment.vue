<template>
  <div class="flex mt-6">
    <transition name="list">
      <Cropper
        v-if="showCropper"
        :src="tempURL"
        @closeCropper="closeCropper"
        :content="content"
        :mime="mime"
        :resizeImage="resizeImage"
      />
    </transition>
    <div class="flex flex-wrap items-center">
      <img
        class="w-12 h-12 rounded object-contain"
        v-if="imageAttached"
        :src="content[type].url"
        :title="`${type == 'logo' ? 'Brand logo' : 'Card holder\'s photo'}`"
      />
      <button
        v-if="!imageAttached"
        class="p-3 rounded bg-gray-700 cursor-pointer hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
        @click="attachFile(null, type, false)"
        :class="
          dragOver ? 'bg-gray-900 outline-white' : 'bg-gray-700 border-none'
        "
        :aria-label="label"
        @drop.prevent="attachFile($event, type, true)"
        @dragleave.prevent.self="dragOver = false"
        @dragover.prevent.self="dragOver = true"
      >
        <input
          :ref="`import${type}`"
          type="file"
          :accept="`.png,.jpg,.jpeg,.gif,.webp${type == 'logo' ? ',.svg' : ''}`"
          v-show="false"
          @change="fileLoaded($event, type, false)"
          @click="$event.target.files = null"
        />
        <div
          class="w-6 h-6 pointer-events-none"
          v-html="require(`~/assets/icons/add.svg?include`)"
        ></div>
      </button>
      <p v-if="!imageAttached" class="ml-3 leading-none">
        {{ label
        }}<span class="text-sm text-gray-400"><br />{{ description }}</span>
      </p>
      <button
        v-else
        class="p-1 m-2 flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
        @click="content[type].url = null"
        :aria-label="`Remove ${type}`"
        :title="`Remove ${type}`"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/x.svg?include`)"
        ></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'content',
    'type',
    'label',
    'description',
    'resizeImage',
    'showAlert',
  ],
  data() {
    return {
      dragOver: false,
      showCropper: false,
      tempURL: null,
      mime: null,
    }
  },
  computed: {
    imageAttached() {
      return this.content[this.type].url ? true : false
    },
  },
  methods: {
    closeCropper() {
      this.showCropper = false
    },
    attachFile(e, type, dropped) {
      dropped
        ? (this.fileLoaded(e, type, true), (this.dragOver = false))
        : this.$refs[`import${type}`].click()
    },
    fileLoaded(e, type, dropped) {
      if (
        (dropped && e.dataTransfer.files.length) ||
        (!dropped && e.target.files.length)
      ) {
        let file = dropped ? e.dataTransfer.files[0] : e.target.files[0]
        let mime = file.type
        if (
          type == 'logo' &&
          file.type.match(/image\/(svg\+xml|png|jpeg|gif|webp)/)
        ) {
          this.imageLoaded(file, type, mime)
        } else if (file.type.match(/image\/(png|jpeg|gif|webp)/)) {
          this.imageLoaded(file, type, mime)
        } else {
          if (type == 'logo') {
            this.showAlert(
              'Unsupported file format.\nOnly jpeg, png, webp, gif and svg file can be attached.'
            )
          } else {
            this.showAlert(
              'Unsupported file format.\nOnly jpeg, png, webp and gif file can be attached.'
            )
          }
        }
      }
    },
    imageLoaded(file, type, mime) {
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        let ext = dataURI
          .split(',')[0]
          .split(':')[1]
          .split('/')[1]
          .match(/^\w+/g)[0]
        if (type == 'logo' || mime.match(/gif|webp/)) {
          this.content[type] = {
            url: dataURI,
            blob: file,
            ext,
            mime,
            resized: file,
          }
          if (!mime.match(/svg|gif|webp/)) this.resizeImage(type, mime)
        } else {
          this.content.photo.ext = ext
          this.mime = mime
          this.tempURL = dataURI
          this.showCropper = true
        }
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
