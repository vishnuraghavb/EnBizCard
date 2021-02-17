<template>
  <div class="stepC flex mt-6">
    <button
      class="p-1 flex-shrink-0 focus:outline-none drag cursor-move"
      tabindex="-1"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/drag.svg?include`)"
      ></div>
    </button>
    <div
      class="p-3 flex-shrink-0 mr-3 rounded-full"
      :style="{
        backgroundColor: `${
          name == 'secondaryActions' ? item.color : buttonBg
        }`,
      }"
    >
      <div
        class="w-6 h-6"
        :class="name == 'secondaryActions' ? null : 'action'"
        v-html="require(`~/assets/icons/${item.name}.svg?include`)"
      ></div>
    </div>
    <div class="w-full">
      <input
        ref="input"
        class="px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
        type="text"
        :aria-label="'Enter ' + item.label"
        :title="'Enter ' + item.label"
        v-model="type[index].value"
        :placeholder="item.placeholder"
      />
    </div>
    <button
      class="p-1 m-2 flex-shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
      @click="removeAction(name, index)"
      :aria-label="'Remove ' + item.label"
      title="Remove field"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/x.svg?include`)"
      ></div>
    </button>
  </div>
</template>

<script>
export default {
  props: ['name', 'item', 'index', 'type', 'buttonBg', 'removeAction'],
  mounted() {
    this.$refs.input.focus()
  },
}
</script>
