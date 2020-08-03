<template>
  <div
    class="container relative mx-auto mt-16 max-w-screen-lg text-gray-900 md:px-4"
  >
    <CustomAlert
      v-if="content"
      @click.native.self="content = null"
      @scroll.native="content = null"
      :content="content"
    />
    <div class="md:grid md:grid-cols-2">
      <div>
        <header class="px-4">
          <div
            class="logo w-32"
            v-html="require(`~/assets/icons/logo.svg?include`)"
          ></div>
          <h1 class="text-4xl font-extrabold leading-tight mt-4 text-gray-900">
            Digital Business Card Generator
          </h1>
        </header>
        <p class="mt-2 px-4">
          Quickly generate an interactive and responsive HTML-based digital
          business card, that can be hosted with your website.
        </p>
        <ul class="mt-8 font-extrabold px-4">
          <li>&bull;&ensp;100% Free and open-source</li>
          <li>&bull;&ensp;No sign-up required</li>
          <li>&bull;&ensp;No user tracking and data collection</li>
          <li>&bull;&ensp;Works offline</li>
        </ul>
        <div id="steps" class="px-4">
          <div id="step-1" class="mt-16">
            <h2 class="font-extrabold text-2xl">Image attachments</h2>
            <div class="field-container">
              <ImageLoader
                :content="images"
                type="logo"
                :resizeImage="resizeImage"
                label="Attach brand logo"
                description="recommended format: svg or png"
                :showAlert="showAlert"
              />
              <ImageLoader
                :content="images"
                type="photo"
                :resizeImage="resizeImage"
                label="Attach photo"
                description="recommended: a square photo"
                :showAlert="showAlert"
              />
            </div>
          </div>
          <div id="step-2" class="mt-16">
            <h2 class="font-extrabold text-2xl">Business information</h2>
            <div class="field-container mt-6">
              <label for="fullname" class="ml-4">Full name</label>
              <input
                id="fullname"
                spellcheck="false"
                type="text"
                v-model="businessInfo.name"
                class="mt-2 px-4 w-full h-12 bg-gray-200 placeholder-gray-600 rounded focus:outline-none"
              />
            </div>
            <div class="field-container mt-6">
              <label for="job-title" class="ml-4">Job title</label>
              <input
                id="job-title"
                type="text"
                spellcheck="true"
                v-model="businessInfo.jobTitle"
                class="mt-2 px-4 w-full h-12 bg-gray-200 placeholder-gray-600 rounded focus:outline-none"
              />
            </div>
            <div class="field-container mt-6">
              <label for="business-name" class="ml-4">Business name</label>
              <input
                id="business-name"
                spellcheck="false"
                type="text"
                v-model="businessInfo.businessName"
                class="mt-2 px-4 w-full h-12 bg-gray-200 placeholder-gray-600 rounded focus:outline-none"
              />
            </div>
            <div class="field-container relative mt-6">
              <label
                for="business-description"
                class="flex justify-between ml-4"
                >Business description
                <span
                  v-if="businessInfo.businessDescription"
                  class="mr-4"
                  :class="
                    descriptionCharCount <= 160
                      ? 'text-green-600'
                      : 'text-orange-600'
                  "
                  >{{ descriptionCharCount }}</span
                ></label
              >
              <textarea
                id="business-description"
                :value="businessInfo.businessDescription"
                @input="businessInfo.businessDescription = $event.target.value"
                class="block mt-2 px-4 py-3 w-full bg-gray-200 placeholder-gray-600 rounded focus:outline-none resize-none"
                rows="5"
                placeholder="Please keep it short and simple ( <160 characters )"
              ></textarea>
            </div>
            <div class="field-container relative mt-6">
              <label for="pgp-public-key" class="flex justify-between ml-4"
                >Public encryption key<span
                  v-if="businessInfo.publicKey"
                  class="mr-4"
                  :class="pubKeyIsValid ? 'text-green-600' : 'text-orange-600'"
                  >{{ pubKeyIsValid ? 'Valid schema' : 'Invalid schema' }}</span
                >
              </label>
              <textarea
                id="pgp-public-key"
                v-model="businessInfo.publicKey"
                class="block mt-2 px-4 py-3 w-full bg-gray-200 placeholder-gray-600 rounded focus:outline-none resize-none"
                rows="5"
                spellcheck="false"
                placeholder="Paste the PGP PUBLIC KEY here"
              ></textarea>
            </div>
          </div>
          <div id="step-3" class="mt-16">
            <h2 class="font-extrabold text-2xl">Primary actions</h2>
            <ButtonInput
              v-for="(item, index) in primaryActions"
              :key="index"
              name="primaryActions"
              :type="primaryActions"
              :item="item"
              :index="index"
              :buttonBg="colors.buttonBg.color"
              :removeAction="removeAction"
            />
            <div class="field-container flex flex-wrap">
              <button
                v-for="(action, index) in actions.primaryActions"
                @click="addAction('primaryActions', index)"
                class="p-3 flex-shrink-0 bg-gray-900 mt-6 mr-6 rounded-full cursor-pointer"
                :style="{
                  backgroundColor: `${colors.buttonBg.color}`,
                }"
                :title="action.name"
                :aria-label="'Add '+action.name"
              >
                <div
                  class="w-6 h-6 action"
                  v-html="require(`~/assets/icons/${action.name}.svg?include`)"
                ></div>
              </button>
            </div>
          </div>
          <div id="step-4" class="mt-16">
            <h2 class="font-extrabold text-2xl">Social links</h2>
            <ButtonInput
              v-for="(item, index) in socialLinks"
              :key="index"
              name="socialLinks"
              :type="socialLinks"
              :item="item"
              :index="index"
              :removeAction="removeAction"
            />
            <div class="field-container flex flex-wrap">
              <button
                v-for="(action, index) in actions.socialLinks"
                @click="addAction('socialLinks', index)"
                class="p-3 flex-shrink-0 mt-6 mr-6 rounded-full cursor-pointer shadow"
                :style="{ backgroundColor: action.color }"
                :title="
                  action.name.substr(0, 1).toUpperCase() + action.name.slice(1)
                "
              >
                <div
                  class="w-6 h-6"
                  v-html="require(`~/assets/icons/${action.name}.svg?include`)"
                ></div>
              </button>
            </div>
          </div>
          <div id="step-5" class="mt-16">
            <h2 class="font-extrabold text-2xl">
              Featured content
            </h2>
            <div class="field-container">
              <FeaturedContentLoader
                :featured="featured"
                type="images"
                :multiple="true"
                :resizeImage="resizeImage"
                label="Attach image"
                mimetypes="image/jpeg, image/png"
                description="supports jpeg, png"
                :showAlert="showAlert"
              />
              <FeaturedContentLoader
                :featured="featured"
                type="music"
                :resizeImage="resizeImage"
                label="Attach music"
                mimetypes="audio/mpeg"
                description="supports mp3"
                :showAlert="showAlert"
              />
              <FeaturedContentLoader
                :featured="featured"
                type="videos"
                :resizeImage="resizeImage"
                label="Attach video"
                mimetypes="video/mp4,video/webm"
                description="supports mp4, webm"
                :showAlert="showAlert"
              />
              <FeaturedContentLoader
                :featured="featured"
                type="documents"
                :resizeImage="resizeImage"
                label="Attach document"
                mimetypes="application/pdf"
                description="supports pdf"
                :showAlert="showAlert"
              />
            </div>
          </div>
          <div id="step-6" class="mt-16">
            <h2 class="font-extrabold text-2xl">Colour customisation</h2>
            <div class="field-container">
              <ColourSelector
                name="logoBg"
                label="Logo background"
                :colors="colors"
              />
              <ColourSelector
                name="buttonBg"
                label="Button background"
                :colors="colors"
              />
            </div>
          </div>

          <div id="step-7" class="mt-16">
            <h2 class="font-extrabold text-2xl">Enable footer credit?</h2>
            <div class="field-container mt-6">
              <div
                class="relative inline-block w-24 mr-3 align-middle select-none transition duration-200 ease-in"
              >
                <input
                  type="checkbox"
                  name="toggle"
                  aria-label="Toggle footer credit"
                  id="toggle"
                  v-model="footerCredit"
                  class="toggle-checkbox absolute block w-12 h-12 rounded-full bg-white border-4 border-gray-900 appearance-none cursor-pointer transition-colors duration-200"
                />
                <label
                  for="toggle"
                  class="toggle-label block overflow-hidden h-12 rounded-full bg-gray-900 cursor-pointer transition-colors duration-200 shadow"
                ></label>
              </div>
              <label for="toggle">{{
                footerCredit ? 'Yes, for sure!' : 'No, thanks'
              }}</label>
              <p class="text-gray-700 mt-6">
                Footer credit is nothing but a backlink which lets others to use
                this Service. You can help getting the word out by enabling the
                footer credit.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="preview-container" class="relative w-full sm:h-full mt-20">
        <div
          id="preview"
          class="flex flex-col items-center justify-center sm:sticky sm:top-0"
        >
          <div
            id="device"
            class="bg-gray-900 device-curve rounded-lg w-full sm:max-w-sm shadow-lg sm:mt-10 sm:mb-20"
          >
            <h2 class="text-2xl text-center py-3 font-extrabold text-gray-200">
              Preview
            </h2>
            <div
              id="browserFrame"
              class="overflow-hidden rounded-lg mx-2 pb-8 flex flex-col"
            >
              <div id="topBar" class="topbar bg-white shadow-sm z-10">
                <div id="searchField" class="pt-6 pl-2 pb-2 flex items-center">
                  <input
                    type="text"
                    class="pl-4 h-12 w-full bg-gray-200 rounded"
                    aria-label="vCard URL"
                    disabled
                    :value="'yoursite/vcard/' + username + '/'"
                  />
                  <div
                    class="w-6 mx-4"
                    v-html="require(`~/assets/icons/ellipsis.svg?include`)"
                  ></div>
                </div>
              </div>
              <DBizCard
                ref="html"
                :username="username"
                :businessInfo="businessInfo"
                :images="images"
                :featured="featured"
                :colors="colors"
                :primaryActions="primaryActions"
                :socialLinks="socialLinks"
                :PreviewMode="PreviewMode"
                :downloadVcard="downloadVcard"
                :footerCredit="footerCredit"
                :showAlert="showAlert"
                :dynamicShareBG="dynamicShareBG"
                :shareHasLightBG="shareHasLightBG"
                :actionHasLightBG="actionHasLightBG"
                :publicKey="businessInfo.publicKey"
                :downloadKey="downloadKey"
                :pubKeyIsValid="pubKeyIsValid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="downloadSection" class="mt-16 px-4">
      <h2 class="font-extrabold text-2xl">Download</h2>
      <div class="field-container">
        <div class="checklistItem mt-6 flex items-center">
          <div class="relative" style="line-height: 0;">
            <input
              v-model="downloadCheck[0]"
              class="checkbox cursor-pointer appearance-none h-12 w-12 border-gray-900 border-4 rounded-lg"
              type="checkbox"
              name="check1"
              id="check1"
            />
            <img
              v-if="downloadCheck[0]"
              src="~/assets/icons/check.svg"
              class="absolute top-0 left-0 m-3 z-10 pointer-events-none select-none"
            />
          </div>
          <label class="ml-4" for="check1"
            >I did not attach any link or file that will cause any risk to the
            user</label
          >
        </div>
        <div class="checklistItem mt-6 flex items-center">
          <div class="relative" style="line-height: 0;">
            <input
              v-model="downloadCheck[1]"
              class="checkbox cursor-pointer appearance-none h-12 w-12 border-gray-900 border-4 rounded-lg"
              type="checkbox"
              name="check2"
              id="check2"
            />
            <img
              v-if="downloadCheck[1]"
              src="~/assets/icons/check.svg"
              class="absolute top-0 left-0 m-3 z-10 pointer-events-none select-none"
            />
          </div>
          <label class="ml-4" for="check2"
            >I have verified that all the links are working correctly in the
            Preview</label
          >
        </div>
        <div class="checklistItem mt-6 flex items-center">
          <div class="relative" style="line-height: 0;">
            <input
              v-model="downloadCheck[2]"
              class="checkbox cursor-pointer appearance-none h-12 w-12 border-gray-900 border-4 rounded-lg"
              type="checkbox"
              name="check3"
              id="check3"
            />
            <img
              v-if="downloadCheck[2]"
              src="~/assets/icons/check.svg"
              class="absolute top-0 left-0 m-3 z-10 pointer-events-none select-none"
            />
          </div>
          <label class="ml-4" for="check3"
            >I have verified that all the information provided here are
            correct</label
          >
        </div>
        <button
          ref="downloadPackage"
          @click="downloadPackage"
          class="inline-block bg-gray-900 text-lg uppercase font-extrabold text-white px-8 py-6 rounded-full mt-12 shadow-md select-none transition-colors duration-200"
          :class="
            downloadChecked
              ? 'bg-green-600 cursor-pointer focus:bg-green-500 hover:bg-green-500'
              : 'cursor-not-allowed'
          "
        >
          Download Package
        </button>
        <p class="text-gray-700 mt-6">
          Extract the package and follow the instructions in the README.txt file
        </p>
      </div>
    </div>

    <StyleSheet ref="stylesheet" v-show="false" />
    <Vcard ref="vCard" v-show="false" :vCard="vCard" />
    <ReadMe ref="readme" v-show="false" :name="username" />
    <QRCode ref="qrcode" v-show="false" />
    <footer class="py-8 mx-4 mt-24">
      <p class="text-gray-700 text-sm">
        <a
          class="underline hover:text-green-600 transition-colors duration-200"
          href="http://t.me/dbizcard"
          target="_blank"
          rel="noopener noreferrer"
          >Join the Telegram group</a
        >
        for reporting issues, suggestions and feedback.
      </p>
      <hr class="border-t-2 border-gray-200 mt-4" />
      <div class="flex justify-start items-center mt-8">
        <div
          class="logo w-16 mr-2 self-start"
          v-html="require(`~/assets/icons/logo.svg?include`)"
        ></div>
        <div>
          <p class="font-extrabold leading-tight">
            Digital Business Card Generator
          </p>
          <p class="text-gray-700 text-xs">
            by
            <a
              class="underline hover:text-green-600 transition-colors duration-200"
              href="https://www.vishnuraghav.com/"
              target="_blank"
              rel="noopener noreferrer"
              >Vishnu&nbsp;Raghav</a
            >
            | MIT&nbsp;License |
            <a
              class="underline hover:text-green-600 transition-colors duration-200"
              href="https://github.com/vishnuraghavb/dbizcard"
              target="_blank"
              rel="noopener noreferrer"
              >View&nbsp;Source</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import CustomAlert from '@/components/CustomAlert'
import ImageLoader from '@/components/ImageLoader'
import FeaturedContentLoader from '@/components/FeaturedContentLoader'
import ButtonInput from '@/components/ButtonInput'
import ColourSelector from '@/components/ColourSelector'
import DBizCard from '@/components/DBizCard'
import StyleSheet from '@/components/StyleSheet'
import ReadMe from '@/components/ReadMe'
import Vcard from '@/components/Vcard'
import QRCode from '@/components/QRCode'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
export default {
  components: {
    CustomAlert,
    ImageLoader,
    FeaturedContentLoader,
    ButtonInput,
    ColourSelector,
    DBizCard,
    StyleSheet,
    ReadMe,
    Vcard,
    QRCode,
  },

  data() {
    return {
      downloadCheck: [false, false, false],
      images: {
        logo: {
          url: null,
          blob: null,
          format: null,
          resized: null,
        },
        photo: {
          url: null,
          blob: null,
          format: null,
          resized: null,
        },
      },
      featured: {
        images: [],
        music: [],
        videos: [],
        documents: [],
      },
      colors: {
        logoBg: {
          color: `#000000`,
          openPalette: false,
        },
        buttonBg: {
          color: `#000000`,
          openPalette: false,
        },
      },
      businessInfo: {
        name: null,
        jobTitle: null,
        businessName: null,
        businessDescription: null,
        publicKey: null,
      },
      primaryActions: [
        {
          name: 'call',
          action: 'Call',
          href: 'tel:',
          placeholder: '+91 XXXXX XXXXX',
          value: null,
          label: 'Phone number',
        },
      ],
      socialLinks: [
        {
          name: 'instagram',
          placeholder: 'instagram.com/username',
          value: null,
          color: '#405de6',
          label: 'Instagram profile URL',
        },
      ],
      actions: {
        primaryActions: [
          {
            name: 'call',
            href: 'tel:',
            placeholder: '+91 XXXXX XXXXX',
            value: null,
            label: 'Phone number',
          },
          {
            name: 'whatsapp',
            placeholder: 'wa.me/userid',
            value: null,
            label: 'WhatsApp profile URL',
          },
          {
            name: 'telegram',
            placeholder: 't.me/username',
            value: null,
            label: 'Telegram profile URL',
          },
          {
            name: 'email',
            href: 'mailto:',
            placeholder: 'info@example.com',
            value: null,
            label: 'Email address',
          },
          {
            name: 'website',
            placeholder: 'example.com',
            value: null,
            label: 'Website URL',
          },
          {
            name: 'store',
            placeholder: 'example.com/storeID',
            value: null,
            label: 'Online Store URL',
          },
          {
            name: 'locate',
            placeholder: 'goo.gl/maps/location',
            value: null,
            label: 'Map location URL',
          },
        ],
        socialLinks: [
          {
            name: 'facebook',
            placeholder: 'facebook.com/pagename',
            value: null,
            color: '#1877f2',
            label: 'Facebook page URL',
          },
          {
            name: 'twitter',
            placeholder: 'twitter.com/username',
            value: null,
            color: '#1da1f2',
            label: 'Twitter profile URL',
          },
          {
            name: 'mastodon',
            placeholder: 'mastodon.social/@username',
            value: null,
            color: '#2b90d9',
            label: 'Mastodon profile URL',
          },
          {
            name: 'linkedin',
            placeholder: 'linkedin.com/username',
            value: null,
            color: '#0077b5',
            label: 'Linkedin profile URL',
          },
          {
            name: 'youtube',
            placeholder: 'youtube.com/channelname',
            value: null,
            color: '#ff0000',
            label: 'Youtube channel URL',
          },
          {
            name: 'vimeo',
            placeholder: 'vimeo.com/channelname',
            value: null,
            color: '#1ab7ea',
            label: 'Vimeo channel URL',
          },
          {
            name: 'pinterest',
            placeholder: 'pinterest.com/username',
            value: null,
            color: '#bd081c',
            label: 'Pinterest profile URL',
          },
          {
            name: 'behance',
            placeholder: 'behance.net/username',
            value: null,
            color: '#1769ff',
            label: 'Behance profile URL',
          },
          {
            name: 'dribbble',
            placeholder: 'dribbble.com/username',
            value: null,
            color: '#ea4c89',
            label: 'Dribbble profile URL',
          },
          {
            name: 'reddit',
            placeholder: 'reddit.com/username',
            value: null,
            color: '#ff5700',
            label: 'Reddit profile URL',
          },
          {
            name: 'vk',
            placeholder: 'vk.com/pagename',
            value: null,
            color: '#4a76a8',
            label: 'VK page URL',
          },
          {
            name: 'snapchat',
            placeholder: 'snapchat.com/username',
            value: null,
            color: '#fffc00',
            label: 'Snapchat profile URL',
          },
          {
            name: 'tumblr',
            placeholder: 'username.tumblr.com',
            value: null,
            color: '#2c4762',
            label: 'Tumblr blog URL',
          },
        ],
      },
      footerCredit: false,
      PreviewMode: true,
      content: null,
    }
  },
  computed: {
    pubKeyIsValid() {
      if (this.businessInfo.publicKey) {
        if (
          !this.businessInfo.publicKey.match(
            /^(-----BEGIN PGP PUBLIC KEY BLOCK-----)/
          )
        )
          return false

        if (
          !this.businessInfo.publicKey.match(
            /(-----END PGP PUBLIC KEY BLOCK-----)$/
          )
        )
          return false

        return true
      } else return false
    },
    downloadChecked() {
      return this.downloadCheck.filter((e) => e).length == 3
    },
    descriptionCharCount() {
      return this.businessInfo.businessDescription
        ? this.businessInfo.businessDescription.length
        : null
    },
    username() {
      return this.businessInfo.name
        ? this.businessInfo.name.toLowerCase().replace(/\W+/g, '')
        : 'username'
    },
    vCard() {
      let phoneNumbers = this.primaryActions
        .map((e) => (e.name == 'call' ? e.value : null))
        .filter((e) => e)

      let email = this.primaryActions
        .map((e) => (e.name == 'email' ? e.value : null))
        .filter((e) => e)[0]

      let website = this.primaryActions
        .map((e) => (e.name == 'website' ? e.value : null))
        .filter((e) => e)[0]

      let randomNumber = Math.floor(100000 + Math.random() * 900000)
      return {
        FN: this.businessInfo.name,
        TITLE: this.businessInfo.jobTitle,
        ORG: this.businessInfo.businessName,
        TEL1: phoneNumbers[0],
        TEL2: phoneNumbers[1],
        EMAIL: email,
        URL: website,
        UID: `dbizcard-${randomNumber}`,
      }
    },
    dynamicShareBG() {
      let hex = this.colors.logoBg.color
      hex = hex.slice(1)
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      let r = parseInt(hex.slice(0, 2), 16)
      let g = parseInt(hex.slice(2, 4), 16)
      let b = parseInt(hex.slice(4, 6), 16)
      const brightness = Math.round(
        (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
      )
      return brightness > 125
        ? `rgba(228,228,228,.25)`
        : `rgba(128,128,128,.25)`
    },
    shareHasLightBG() {
      let hex = this.colors.logoBg.color
      hex = hex.slice(1)
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      let r = parseInt(hex.slice(0, 2), 16)
      let g = parseInt(hex.slice(2, 4), 16)
      let b = parseInt(hex.slice(4, 6), 16)
      const brightness = Math.round(
        (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
      )
      return brightness > 125 ? true : false
    },
    actionHasLightBG() {
      let hex = this.colors.buttonBg.color
      hex = hex.slice(1)
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      let r = parseInt(hex.slice(0, 2), 16)
      let g = parseInt(hex.slice(2, 4), 16)
      let b = parseInt(hex.slice(4, 6), 16)
      const brightness = Math.round(
        (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
      )
      return brightness > 125 ? true : false
    },
  },
  methods: {
    showAlert(content) {
      this.content = content
    },
    addAction(type, index) {
      this[type].push(this.actions[type][index])
      this.actions[type].splice(index, 1)
    },
    removeAction(type, index) {
      this.actions[type].unshift(this[type][index])
      this[type].splice(index, 1)
    },
    downloadVcard() {
      let blob = new Blob([this.$refs.vCard.$refs.vCard.innerText], {
        type: 'text/plain',
      })
      saveAs(window.URL.createObjectURL(blob), `${this.username}.vcf`)
    },
    downloadKey() {
      let blob = new Blob([this.businessInfo.publicKey], {
        type: 'text/plain',
      })
      saveAs(
        window.URL.createObjectURL(blob),
        `${this.businessInfo.name}'s public key.asc`
      )
    },
    async resizeImage(type, index) {
      let vm = this
      let reader = new FileReader()
      let file
      if (index >= 0) {
        if (type == 'images') {
          file = await this.featured[type][index].file
        } else if (type == 'music') {
          file = await this.featured[type][index].cover
        }
      } else {
        file = this.images[type].blob
      }
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let img = document.createElement('img')
      let maxWidth, maxHeight
      reader.onload = (e) => {
        img.src = e.target.result
        img.onload = () => {
          if (type == 'photo') {
            canvas.width = canvas.height = 320
          } else {
            if (type == 'logo') {
              maxWidth = 1056
              maxHeight = 288
            } else {
              maxWidth = maxHeight = 1296
            }
            let width = img.width
            let height = img.height

            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
            canvas.width = width
            canvas.height = height
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          canvas.toBlob(
            function (blob) {
              let image = new File([blob], type)
              if (index >= 0) {
                if (type == 'images') {
                  vm.featured[type][index].file = image
                } else if (type == 'music') {
                  vm.featured[type][index].cover = image
                }
              } else {
                vm.images[type].resized = image
              }
            },
            'image/jpeg',
            0.8
          )
        }
      }
      reader.readAsDataURL(file)
    },
    downloadPackage() {
      if (this.downloadChecked) {
        this.PreviewMode = false
        setTimeout(() => {
          let html = new Blob(
            [`<!DOCTYPE html>${this.$refs.html.$refs.html.outerHTML}`],
            {
              type: 'text/html',
            }
          )
          let css = new Blob(
            [this.$refs.stylesheet.$refs.stylesheet.innerText],
            {
              type: 'text/css',
            }
          )
          let vCard = new Blob([this.$refs.vCard.$refs.vCard.innerText], {
            type: 'text/plain',
          })
          let README = new Blob([this.$refs.readme.$refs.readme.innerText], {
            type: 'text/plain',
          })
          let qrcode = new Blob([this.$refs.qrcode.$refs.qrcode.innerText], {
            type: 'application/javascript',
          })
          let name = this.businessInfo.name
          let username = this.username
          let zip = new JSZip()
          zip.folder(username).file('index.html', html)
          zip.folder(username).file('style.min.css', css)
          zip.file('README.txt', README)
          zip.folder(username).file('qrcode.min.js', qrcode)
          if (this.images.logo.url) {
            zip.folder(username).file(
              `logo.${this.images.logo.format}`,

              this.images.logo.format == 'svg'
                ? this.images.logo.blob
                : this.images.logo.resized
            )
          }
          if (this.images.photo.url) {
            zip
              .folder(username)
              .file(
                `photo.${this.images.photo.format}`,
                this.images.photo.resized
              )
          }
          if (this.featured.images.length) {
            this.featured.images.forEach((image, index) => {
              zip
                .folder(username)
                .folder('featured')
                .file(`image-${index}.${image.format}`, image.file)
            })
          }
          if (this.featured.music.length) {
            this.featured.music.forEach((music, index) => {
              zip
                .folder(username)
                .folder('featured')
                .file(`music-${index}.mp3`, music.file)
              zip
                .folder(username)
                .folder('featured')
                .file(`music-${index}.${music.coverFormat}`, music.cover)
            })
          }
          if (this.featured.videos.length) {
            this.featured.videos.forEach((video, index) => {
              zip
                .folder(username)
                .folder('featured')
                .file(`video-${index}.mp4`, video.file)
            })
          }
          if (this.featured.documents.length) {
            this.featured.documents.forEach((document, index) => {
              zip
                .folder(username)
                .folder('featured')
                .file(`${document.title}.pdf`, document.file)
              zip
                .folder(username)
                .folder('featured')
                .file(
                  `document-${index}.${document.coverFormat}`,
                  document.cover
                )
            })
          }
          if (this.pubKeyIsValid) {
            zip
              .folder(username)
              .file(
                `${this.businessInfo.name}'s public key.asc`,
                this.businessInfo.publicKey
              )
          }
          zip.folder(username).file(`${username}.vcf`, vCard)
          zip.generateAsync({ type: 'blob' }).then(function (zip) {
            saveAs(zip, `${name}'s Digital Business Card.zip`)
          })
          this.PreviewMode = true
        }, 250)
      }
    },
  },
}
</script>
