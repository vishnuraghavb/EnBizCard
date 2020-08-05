<template>
  <div id="donate" class="mt-16 px-4">
    <h2 class="font-extrabold text-2xl">Support me</h2>
    <div class="field-container mt-6">
      <p>
        If you find this service valuable to your
        business, please consider donating. Your donation will encourage me to
        better this service and develop more free services like this.
      </p>
      <div class="donateBtns">
        <div class="donateBtn flex items-center mt-6">
          <a
            href="https://www.paypal.com/paypalme/vishnuraghav"
            target="_blank"
            class="inline-block p-3 flex-shrink-0 mr-3 rounded-full cursor-pointer shadow focus:shadow-none"
            title="Donate via PayPal"
            style="background: #003087;"
          >
            <div
              class="w-6 h-6 action"
              v-html="require(`~/assets/icons/paypal.svg?include`)"
            ></div>
          </a>
          <p>PayPal</p>
        </div>
        <div class="donateBtn relative flex items-center mt-6">
          <transition name="showUPI">
            <div
              v-show="showUPI"
              v-on-clickaway="() => closeUPIQR()"
              class="absolute text-center left-0 bottom-0 w-48 bg-white shadow-md z-10 rounded m-12 p-4"
            >
              <div ref="upiQR"></div>
              <p class="mt-2 font-extrabold">Scan to donate via UPI</p>
            </div>
          </transition>
          <a
            @click="triggerUPI()"
            @keydown.space="triggerUPI()"
            @keydown.enter="triggerUPI()"
            tabindex="0"
            ref="upiLink"
            target="_blank"
            class="inline-block p-3 bg-gray-200 flex-shrink-0 mr-3 rounded-full cursor-pointer shadow"
            title="Donate via UPI"
          >
            <div
              class="w-6 h-6 action"
              v-html="require(`~/assets/icons/upi.svg?include`)"
            ></div>
          </a>
          <p>UPI</p>
        </div>
      </div>
      <div class="cryptocurrencies mt-6 max-w-lg">
        <p>You may also donate via the cryptocurrencies below.</p>
        <CryptoField
          v-for="(crypto, index) in cryptocurrencies"
          :key="index"
          :crypto="crypto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway2'
import CryptoField from './CryptoField'
export default {
  components: {
    CryptoField,
  },
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      cryptocurrencies: [
        {
          name: 'bitcoin',
          title: 'Bitcoin',
          address: 'bc1qjxwecmmajnl7qvyzwqqka60tfvcyj9qhy2lpq8',
          bg: '#f7931a',
        },
        {
          name: 'monero',
          title: 'Monero',
          address:
            '4BH5LiYgX4rUoEpTkekokzKXLSJSYoRUKiZdbXNgeQTZgobU4JFVrKgRQecLc4aZBQDDq3ABss2kGX5HYHuZz8anV514a5A',
          bg: '#EDF2F7',
        },
      ],
      showUPI: false,
      UPIurl:
        'upi://pay?pa=vishnuraghav@icici&pn=Vishnu%20Raghav%20B&cu=INR&mode=00&tn=Donation%20for%20Digital%20Business%20Card%20Generator',
    }
  },
  methods: {
    triggerUPI() {
      let upiLink = this.$refs.upiLink
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        upiLink.setAttribute('href', this.UPIurl)
      } else {
        this.showUPI = !this.showUPI
      }
    },
    closeUPIQR() {
      this.showUPI = false
    },
  },
  mounted() {
    this.$refs.upiQR.innerHTML = new QRCode({
      content: this.UPIurl,
      container: 'svg-viewbox',
      join: !0,
      ecl: 'L',
      padding: 0,
    }).svg()
  },
}
</script>
<style lang="scss">
.showUPI-enter-active,
.showUPI-leave-active {
  transition: transform 0.1s ease;
  transform-origin: left bottom;
}
.showUPI-enter,
.showUPI-leave-to {
  transform: scale(0);
}
</style>