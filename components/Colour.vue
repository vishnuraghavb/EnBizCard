<template>
  <div class="mt-6 flex flex-col items-start">
    <div class="flex items-center">
      <div
        :style="{ backgroundColor: colors[name].color }"
        class="w-12 h-12 rounded mr-3 relative cursor-pointer transition-colors duration-200 focus:outline-none focus:ring ring-gray-100"
        tabindex="0"
        @click.self="colors[name].openPalette = !colors[name].openPalette"
        @keydown.space.enter.esc.prevent="
          colors[name].openPalette = !colors[name].openPalette
        "
      >
        <transition name="palette">
          <div
            class="absolute mt-14 ml-14 z-10"
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
      <p>{{ label }}</p>
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
  transition: transform 0.2s ease;
  transform-origin: left top;
}
.palette-enter,
.palette-leave-to {
  transform: scale(0);
}
.hu-color-picker {
  box-shadow: none;
  &.light {
    background: #2d3748;
    .color-type {
      .name {
        background: #4a5568;
        color: #fff;
      }
      .value {
        background: #000;
        color: #fff;
      }
    }
  }
  .color-show {
    display: none;
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
        box-shadow: none;
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
