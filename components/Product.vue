<template>
  <div class="flex flex-col w-full mt-6 bg-gray-700 p-4 rounded ">
    <div class="flex justify-between">
      <div class="flex items-center w-full">
        <div
          class="w-12 h-12 p-3 mr-3"
          v-html="require(`~/assets/icons/box.svg?include`)"
        ></div>
        <div class="w-3/4">
          <input
            class="px-4 w-full h-12 bg-gray-700 placeholder-gray-500 border-b border-gray-600 transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
            type="text"
            name="section title"
            placeholder="Section title"
            v-model="products[index].title"
            title="Type your own section title"
          />
        </div>
      </div>
      <button
        class="p-3 flex-shrink-0 outline-none"
        @click="products.splice(index, 1)"
        aria-label="Remove section"
        title="Remove section"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/x.svg?include`)"
        ></div>
      </button>
    </div>
    <div class="mt-4" v-if="products[index].content.length">
      <ProductCard
        v-for="(item, i) in products[index].content"
        :key="i"
        :products="products"
        :item="item"
        :index="index"
        :i="i"
        :resizeImage="resizeImage"
        :showAlert="showAlert"
      />
    </div>
    <div class="flex flex-wrap items-center mt-4">
      <button
        class="p-1 m-2  rounded cursor-pointer bg-gray-500 hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
        aria-label="Add product"
        @click="addField()"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/add.svg?include`)"
        ></div>
      </button>
      <p class="ml-1 leading-none">Add product</p>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  props: ['index', 'products', 'showAlert', 'resizeImage'],
  components: {
    ProductCard,
  },
  methods: {
    addField() {
      this.products[this.index].content.push({
        image: null,
        title: null,
        description: null,
        price: null,
        label: null,
        link: null,
      })
    },
    removeImage(i) {
      this.products[this.index].content[i].image = null
    },
    removeItem(i) {
      this.products[this.index].content.splice(i, 1)
    },
    loadFile(i) {
      this.$refs.import[i].click()
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
}
</script>
