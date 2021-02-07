<template>
  <div>
    <div
      class="content"
      v-for="(item, i) in products"
      :key="i"
      :style="{ backgroundColor: `${colors.cardBg.color}` }"
    >
      <img
        v-if="item.image"
        :src="
          PreviewMode
            ? item.image.dataURI
            : `./products/${getTitle(item.image.title)}.${item.image.format}`
        "
        alt="Product image"
      />
      <div class="controls prodInfo">
        <p class="title card">
          {{ item.title }}
        </p>
        <p class="desc card">
          {{ item.description }}
        </p>
        <p class="price card">
          {{ item.price }}
        </p>
        <a
          class="label"
          :style="{
            backgroundColor: `${colors.buttonBg.color}`,
            lineHeight: PreviewMode ? 'inherit' : '1.5rem',
          }"
          target="_blank"
          :href="item.link"
          ><p class="action">{{ item.label }}</p></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products', 'colors', 'index', 'PreviewMode'],
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
  },
}
</script>