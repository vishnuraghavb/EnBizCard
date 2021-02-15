<template>
  <div
    id="notificationContainer"
    class="flex justify-center fixed top-0 left-0 right-0 bottom-0 items-center z-30 bg-black bg-opacity-80"
  >
    <div
      class="flex items-start notification content bg-gray-800 text-gray-100 rounded relative z-10 mx-4 max-w-md p-2"
    >
      <div class="whitespace-pre-line p-2" v-html="content"></div>
      <div
        @click="clearContent()"
        class="w-8 cursor-pointer flex-shrink-0 p-1 m-1 focus:outline-none rounded hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200"
        v-html="require(`~/assets/icons/x.svg?include`)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'clearContent'],
}
</script>
