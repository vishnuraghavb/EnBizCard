<template>
  <div
    id="notificationContainer"
    class="flex justify-center fixed top-0 left-0 right-0 bottom-0 items-center z-30 bg-black bg-opacity-80"
  >
    <div
      class="flex flex-col items-center notification content bg-gray-800 text-gray-100 rounded relative z-50 max-w-sm mx-4 p-2"
    >
      <div class="mb-2 max-w-sm max-h-80">
        <img ref="image" :src="src" />
      </div>
      <div class="flex">
        <button
          class="p-3 font-extrabold rounded tracking-wide focus:outline-none select-none bg-gray-700 mr-2 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200"
          @click="$emit('closeCropper')"
        >
          Cancel
        </button>
        <button
          class="font-extrabold leading-none tracking-wide select-none flex-shrink-0 p-3 text-white bg-green-600 rounded hover:bg-green-500 focus:bg-green-500 transition-colors duration-200 focus:outline-none"
          @click="cropPhoto"
        >
          Crop photo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: ['src', 'mime', 'content', 'resizeImage'],
  data() {
    return {
      cropper: {},
      dataURL: null,
      blobData: null,
      image: {},
    }
  },
  methods: {
    cropPhoto() {
      let vm = this
      const canvas = this.cropper.getCroppedCanvas()
      let url = canvas.toDataURL(this.mime)
      this.content.photo.url = url
      this.content.photo.mime = this.mime
      canvas.toBlob(
        (blob) => {
          vm.content.photo.blob = new File([blob], 'photo', {
            type: this.mime,
          })
          vm.resizeImage('photo', vm.mime)
          vm.$emit('closeCropper')
        },
        this.mime,
        0.8
      )
    },
  },
  mounted() {
    this.image = this.$refs.image
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: true,
      aspectRatio: 1,
      autoCropArea: 1,
      responsive: true,
      viewMode: 2,
      highlight: false,
      rotatable: false,
    })
  },
}
</script>