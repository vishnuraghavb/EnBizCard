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
        <transition name="palette">
          <div
            class="absolute mt-12 ml-12 z-10"
            v-show="colors[name].openPalette"
            v-on-clickaway="() => closeColourPalette(name)"
          >
            <colorpicker
              theme="light"
              :color="colors[name].color"
              @changeColor="changeColour($event, name)"
            ></colorpicker>
          </div>
        </transition>
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
.palette-enter-active,
.palette-leave-active {
  transition: transform 0.1s ease;
  transform-origin: left top;
}
.palette-enter,
.palette-leave-to {
  transform: scale(0);
}
.hu-color-picker {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &.light {
    background: #fff;
    .color-type {
      .name {
        background: #edf2f7;
        color: black;
      }
      .value {
        background: #f7fafc;
        color: black;
      }
    }
  }
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
        box-shadow: 0 0 1px rgba(#000, 0.2);
        margin: 0;
        width: auto;
        height: 30px;
        &:hover {
          transform: none;
        }
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
