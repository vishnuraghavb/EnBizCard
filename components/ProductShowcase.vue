<template>
  <div class="media" :style="{ backgroundColor: `${colors.cardBg.color}` }">
    <img
      v-if="product.image"
      :src="
        PreviewMode
          ? product.image.dataURI
          : `./media/${getTitle(product.image.title)}.${product.image.ext}`
      "
      alt="Product image"
    />
    <div class="controls cardColor prodInfo">
      <p class="title">
        {{ product.title }}
      </p>
      <p v-if="product.description" class="sub">
        {{ product.description }}
      </p>
      <p v-if="product.price" class="price">
        {{ product.price }}
      </p>
      <a
        v-if="product.label"
        class="label"
        :style="{
          backgroundColor: `${colors.buttonBg.color}`,
          lineHeight: PreviewMode ? 'inherit' : '1.5rem',
        }"
        target="_blank"
        :href="product.link"
        ><p class="iconColor">{{ product.label }}</p></a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'colors', 'PreviewMode'],
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
  },
}
</script>
