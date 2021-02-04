<template>
  <div class="flex mt-6">
    <div
      v-if="imageAttached"
      class="w-12 h-12 p-3 mr-2"
      v-html="
        require(`~/assets/icons/${
          type == 'logo' ? 'brand' : 'photo'
        }.svg?include`)
      "
      :title="`${type == 'logo' ? 'Brand logo' : 'Card holder\'s photo'}`"
    ></div>
    <div class="flex flex-wrap items-center">
      <img
        class="h-12 rounded border-2 p-1 border-gray-800 transition-colors duration-200 hover:border-red-600 cursor-pointer"
        v-if="imageAttached"
        :src="content[type].url"
        @click="content[type].url = null"
        :title="`Click to remove ${type}`"
      />
      <button
        v-if="!imageAttached"
        class="p-3 rounded-full bg-gray-500 cursor-pointer shadow hover:bg-green-600 focus:bg-green-600 transition-colors duration-200 "
        @click="loadImage(type)" :aria-label="label"
      >
        <input
          :ref="`import${type}`"
          type="file"
          :accept="`.png,.jpg,.jpeg${type == 'logo' ? ',.svg' : ''}`"
          v-show="false"
          @change="imageLoaded($event, type)"
          @click="$event.target.files = null"
        />
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/add.svg?include`)"
        ></div>
      </button>
      <p v-if="!imageAttached" class="ml-3 leading-none">
        {{ label
        }}<span class="text-sm text-gray-500"><br />{{ description }}</span>
      </p>
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
  computed: {
    imageAttached() {
      return this.content[this.type].url ? true : false
    },
  },
  methods: {
    loadImage(type) {
      this.$refs[`import${type}`].click()
    },
    imageLoaded(e, type) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        let format = dataURI
          .split(',')[0]
          .split(':')[1]
          .split('/')[1]
          .match(/^\w+/g)[0]
        if (type == 'photo') {
          let img = new Image()
          img.src = dataURI
          img.onload = () => {
            img.width != img.height
              ? this.showAlert(
                  'Looks like its not a square photo.\n\nPlease use an image editor to crop the photo to 1:1 and re-attach the same.\n\nA stretched photo could make you look unprofessional.'
                )
              : null
          }
        }
        this.content[type] = {
          url: dataURI,
          blob: e.target.files[0],
          format,
        }
        if (this.content[type].format.match(/(png|jpg|jpeg)/)) {
          this.resizeImage(type)
        }
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
