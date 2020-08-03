<template>
  <div class="mt-6 flex flex-col items-start">
    <div class="flex items-center">
      <div
        :style="{ backgroundColor: colors[name].color }"
        class="w-12 h-12 rounded-full mr-3 shadow relative cursor-pointer"
        tabindex="0"
        @click.self="colors[name].openPalette = !colors[name].openPalette"
        @keypress.space.enter="
          colors[name].openPalette = !colors[name].openPalette
        "
      >
        <div
          class="absolute mt-10 ml-10 z-10"
          v-if="colors[name].openPalette"
          v-on-clickaway="() => closeColourPalette(name)"
        >
          <colorpicker
            theme="light"
            :color="colors[name].color"
            @changeColor="changeColour($event, name)"
          ></colorpicker>
        </div>
      </div>
      <p class="">{{ label }}</p>
    </div>
  </div>
</template>

<script>
import colorpicker from '@caohenghu/vue-colorpicker'
import { directive as onClickaway } from 'vue-clickaway2'
export default {
  components: {
    colorpicker,
  },
  directives: {
    onClickaway: onClickaway,
  },
  props: ['name', 'label', 'colors'],
  methods: {
    changeColour({ hex }, name) {
      this.colors[name].color = hex
    },
    closeColourPalette(name) {
      this.colors[name].openPalette = false
    },
  },
}
</script>
<style lang="scss">
.hu-color-picker {
  & > div:nth-last-child(-2n + 2),
  .color-alpha {
    display: none;
  }
  .color-show {
    justify-items: flex-start;
    canvas {
      width: 100% !important;
    }
  }
  & > div:last-of-type {
    .colors {
      margin: 0;
      margin-top: 0.5rem;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(5, 30px);
      grid-column-gap: 0.5rem;
      .item {
        margin: 0;
        width: auto;
        height: 30px;
        &:nth-last-child(-n + 14) {
          display: none;
        }
      }
    }
    .history {
      display: none;
    }
  }
}
</style>
