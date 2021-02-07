<template>
  <div class="flex flex-col mt-2 bg-gray-600 rounded p-4 ">
    <div class="flex">
      <div id="imageContainer" class="mr-2 flex-shrink-0">
        <img
          class="h-12 border-2 rounded p-1 border-gray-600 transition-colors duration-200 hover:border-red-600 cursor-pointer"
          v-if="item.image && item.image.dataURI"
          :src="item.image.dataURI"
          :alt="item.image.title"
          title="Click to remove product image"
          @click="removeImage(i)"
          @keypress.prevent="removeImage(i)"
          tabindex="0"
        />
        <button
          v-else
          class="p-3 h-12 w-12 box-border rounded cursor-pointer border border-dashed border-gray-900 hover:border-gray-500 transition-colors duration-200"
          @click="loadFile(i)"
          aria-label="Attach product image"
          title="Attach product image"
        >
          <input
            ref="import"
            type="file"
            accept="image/jpeg, image/png"
            v-show="false"
            @change="fileLoaded($event, i)"
            @click="$event.target.files = null"
          />
          <div
            class="w-6 h-6"
            v-html="require(`~/assets/icons/add-img.svg?include`)"
          ></div>
        </button>
      </div>
      <div class="w-full">
        <input
          class="px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
          ref="input"
          type="text"
          v-model="item.title"
          aria-label="Product title"
          title="Product title"
          placeholder="Product title"
        />
      </div>
      <button
        class="p-3 flex-shrink-0 outline-none border-transparent"
        @click="removeItem(i)"
        aria-label="Remove product"
        title="Remove product"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/x.svg?include`)"
        ></div>
      </button>
    </div>
    <textarea
      name="description"
      placeholder="Product description"
      class="pDescription block mt-2 px-4 py-3 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 resize-none hover:border-green-600"
      rows="3"
      v-model="item.description"
    ></textarea>
    <input
      type="text"
      name="price"
      class="pPrice px-4 h-12 mt-2 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
      placeholder="Price"
      v-model="item.price"
    />
    <div class="grid grid-cols-2 gap-x-2">
      <input
        type="text"
        name="link"
        class="pLink px-4 h-12 mt-2 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
        placeholder="Button link"
        v-model="item.link"
      />
      <input
        type="text"
        name="label"
        class="pLabel px-4 h-12 mt-2 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
        placeholder="Button label"
        v-model="item.label"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['i', 'index', 'item', 'products', 'showAlert', 'resizeImage'],
  methods: {
    removeImage(i) {
      this.products[this.index].content[i].image = null
    },
    removeItem(i) {
      this.products[this.index].content.splice(i, 1)
    },
    loadFile() {
      this.$refs.import.click()
    },
    getFileName(file) {
      return file.name.replace(/(?:\.([^.]+))?$/, '')
    },
    fileLoaded(e, i) {
      let file = e.target.files[0]
      let mimetype = file.type
      if (file && mimetype.match(/image\/jpeg|image\/png/gi)) {
        this.imageLoaded(file, i)
      } else this.showAlert('Unsupported file format.\nSupports jpeg, png')
    },
    imageLoaded(file, i) {
      let title = this.getFileName(file)
      let reader = new FileReader()
      reader.onload = (f) => {
        let dataURI = f.target.result
        this.products[this.index].content[i].image = {
          dataURI,
          file,
          type: 'image',
          format: 'jpeg',
          title,
        }
        this.resizeImage(
          'product',
          this.index,
          this.products[this.index].content.length - 1
        )
      }
      reader.readAsDataURL(file)
    },
  },
  mounted() {
    this.$refs.input.focus()
  },
}
</script>
