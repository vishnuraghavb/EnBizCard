<template>
  <div class="crypto flex mt-6 relative">
    <div
      class="p-3 flex-shrink-0 bg-gray-900 mr-3 rounded-full"
      :style="{ backgroundColor: `${crypto.bg}` }"
      :title="crypto.title"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/${crypto.name}.svg?include`)"
      ></div>
    </div>
    <div class="w-full">
      <input
        class="px-4 w-full h-12 bg-gray-200 placeholder-gray-600 rounded focus:outline-none"
        type="text"
        :value="crypto.address"
        @click="(e) => e.target.select()"
        readonly
      />
    </div>
    <transition name="showQR">
      <div
        ref="cryptoQR"
        v-show="showCrypto"
        v-on-clickaway="() => closeCryptoQR()"
        class="absolute right-0 bottom-0 w-48 bg-white shadow-md z-10 rounded m-12 p-4"
      ></div>
    </transition>
    <button
      v-if="!isMobile"
      class="p-3 flex-shrink-0"
      @click="showCrypto = !showCrypto"
    >
      <div
        class="w-6 h-6"
        v-html="require(`~/assets/icons/qrcodeb.svg?include`)"
      ></div>
    </button>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway2'
export default {
  props: ['crypto'],
  directives: {
    onClickaway: onClickaway,
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? true
        : false
    },
  },
  data() {
    return {
      showCrypto: false,
    }
  },
  methods: {
    closeCryptoQR() {
      this.showCrypto = false
    },
  },
  mounted() {
    this.$refs.cryptoQR.innerHTML = new QRCode({
      content: this.crypto.address,
      container: 'svg-viewbox',
      join: !0,
      ecl: 'L',
      padding: 0,
    }).svg()
  },
}
</script>
<style lang="scss">
.showQR-enter-active,
.showQR-leave-active {
  transition: transform 0.1s ease;
  transform-origin: right bottom;
}
.showQR-enter,
.showQR-leave-to {
  transform: scale(0);
}
</style>
