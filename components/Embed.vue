<template>
  <div class="flex flex-col w-full mt-6 bg-gray-700 p-4 rounded ">
    <div class="flex justify-between">
      <div class="flex items-center w-full">
        <div
          class="w-12 h-12 p-3 mr-3"
          v-html="require(`~/assets/icons/code.svg?include`)"
        ></div>
        <div class="w-3/4">
          <input
            class="px-4 w-full h-12 bg-gray-700 placeholder-gray-500 border-b border-gray-600 transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
            type="text"
            name="section title"
            placeholder="Section title"
            v-model="embedContent[index].title"
            title="Type your own section title"
          />
        </div>
      </div>
      <button
        class="p-3 flex-shrink-0 outline-none"
        @click="embedContent.splice(index, 1)"
        aria-label="Remove section"
        title="Remove section"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/x.svg?include`)"
        ></div>
      </button>
    </div>

    <div class="mt-4" v-if="embedContent[index].content.length">
      <div
        class="flex items-center mt-2"
        v-for="(item, i) in embedContent[index].content"
        :key="i"
      >
        <div class="w-full">
          <input
            class="px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
            ref="input"
            type="text"
            aria-label="Paste HTML embed link here"
            title="Paste HTML embed link here"
            v-model="embedContent[index].content[i]"
            placeholder="Paste HTML embed link here"
          />
        </div>
        <button
          class="p-3 flex-shrink-0 outline-none border-transparent"
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
    <div class="flex flex-wrap items-center mt-4">
      <button
        class="p-1 m-2  rounded-full cursor-pointer bg-gray-500 hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
        aria-label="Add field"
        @click="addField()"
      >
        <div
          class="w-6 h-6"
          v-html="require(`~/assets/icons/add.svg?include`)"
        ></div>
      </button>
      <p class="ml-1 leading-none">Add field</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index', 'embedContent'],
  methods: {
    addField() {
      this.embedContent[this.index].content.push('')
      setTimeout(
        () =>
          this.$refs.input[
            this.embedContent[this.index].content.length - 1
          ].focus(),
        50
      )
    },
    removeItem(i) {
      this.embedContent[this.index].content.splice(i, 1)
    },
  },
}
</script>
