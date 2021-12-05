<template>
  <div
    id="notificationContainer"
    class="flex justify-center fixed top-0 left-0 right-0 bottom-0 items-center z-50 bg-black bg-opacity-80"
  >
    <div
      class="flex items-start notification content bg-gray-800 text-gray-100 rounded relative z-50 mx-8 max-w-md p-2"
    >
      <div class="whitespace-pre-line p-2" v-html="content"></div>
      <div
        @click="clearContent()"
        class="w-8 cursor-pointer flex-shrink-0 p-1 focus:outline-none rounded bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 absolute -top-4 -right-4"
        v-html="require(`~/assets/icons/x.svg?include`)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'clearContent'],
  methods: {
    navTo() {
      router.push('hosting-guide')
    },
  },
}
</script>
