<template>
  <div
    class="container relative bg-gray-800 mx-auto mt-16 max-w-screen-lg text-gray-100 md:px-4"
  >
    <Modal
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
          <h1 class="text-4xl font-extrabold leading-tight mt-4">
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
              <Attachment
                :content="images"
                type="logo"
                :resizeImage="resizeImage"
                label="Attach brand logo"
                description="recommended format: svg or png"
                :showAlert="showAlert"
              />
              <Attachment
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
                class="mt-2 px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
              />
            </div>
            <div class="field-container mt-6">
              <label for="job-title" class="ml-4">Job title</label>
              <input
                id="job-title"
                type="text"
                spellcheck="true"
                v-model="businessInfo.jobTitle"
                class="mt-2 px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
              />
            </div>
            <div class="field-container mt-6">
              <label for="business-name" class="ml-4">Business name</label>
              <input
                id="business-name"
                spellcheck="false"
                type="text"
                v-model="businessInfo.businessName"
                class="mt-2 px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
              />
            </div>
            <div class="field-container mt-6">
              <label for="business-description" class="ml-4"
                >Business description
              </label>
              <textarea
                id="business-description"
                :value="businessInfo.businessDescription"
                @input="businessInfo.businessDescription = $event.target.value"
                class="block mt-2 px-4 py-3 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 resize-none hover:border-green-600"
                rows="5"
              ></textarea>
            </div>
            <div class="field-container relative mt-6">
              <label for="pgp-public-key" class="flex justify-between ml-4"
                >Public key<span
                  v-if="businessInfo.publicKey"
                  class="mr-4"
                  :class="pubKeyIsValid ? 'text-green-600' : 'text-orange-600'"
                  >{{ pubKeyIsValid ? '' : 'Invalid schema' }}</span
                >
              </label>
              <textarea
                id="pgp-public-key"
                v-model="businessInfo.publicKey"
                class="block mt-2 px-4 py-3 w-full bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 resize-none hover:border-green-600"
                rows="5"
                spellcheck="false"
                placeholder="Paste PGP PUBLIC KEY BLOCK here"
              ></textarea>
            </div>
            <div class="field-container relative mt-6">
              <label for="pgp-public-key" class="flex justify-between ml-4"
                >Public key fingerprint<span
                  v-if="businessInfo.fingerprint"
                  class="mr-4"
                  :class="
                    fingerprintIsValid ? 'text-green-600' : 'text-orange-600'
                  "
                  >{{ fingerprintIsValid ? '' : 'Invalid fingerprint' }}</span
                >
              </label>
              <input
                id="pgp-fingerprint"
                spellcheck="false"
                type="text"
                v-model="businessInfo.fingerprint"
                class="mt-2 px-4 w-full h-12 bg-gray-900 placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-green-600 hover:border-green-600"
                placeholder="Paste 40 character fingerprint here"
              />
            </div>
          </div>
          <div id="step-3" class="mt-16">
            <h2 class="font-extrabold text-2xl">Primary actions</h2>
            <Action
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
                :key="index"
                @click="addAction('primaryActions', index)"
                class="p-3 flex-shrink-0 bg-gray-900 mt-6 mr-6 rounded-full cursor-pointer  hover:scale-110 transform transition-transform duration-200"
                :style="{
                  backgroundColor: `${colors.buttonBg.color}`,
                }"
                :title="
                  action.name.substr(0, 1).toUpperCase() + action.name.slice(1)
                "
                :aria-label="action.name"
              >
                <div
                  class="w-6 h-6 action"
                  v-html="require(`~/assets/icons/${action.name}.svg?include`)"
                ></div>
              </button>
            </div>
          </div>
          <div id="step-4" class="mt-16">
            <h2 class="font-extrabold text-2xl">Secondary actions</h2>
            <Action
              v-for="(item, index) in secondaryActions"
              :key="index"
              name="secondaryActions"
              :type="secondaryActions"
              :item="item"
              :index="index"
              :removeAction="removeAction"
            />
            <div class="field-container flex flex-wrap">
              <button
                v-for="(action, index) in actions.secondaryActions"
                :key="index"
                @click="addAction('secondaryActions', index)"
                class="p-3 flex-shrink-0 mt-6 mr-6 rounded-full cursor-pointer  hover:scale-110 transform transition-transform duration-200"
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
            <h2 class="font-extrabold text-2xl">Feature content</h2>
            <div class="field-container">
              <Feature
                v-for="(content, index) in featured"
                :key="index"
                :featured="featured"
                :resizeImage="resizeImage"
                :index="index"
                label="Attach content"
                mimetypes="image/jpeg, image/png, audio/mpeg, video/mp4, video/webm, application/pdf"
                :showAlert="showAlert"
              />
              <div class="flex mt-6">
                <div class="flex flex-wrap items-center">
                  <button
                    class="p-3 rounded-full cursor-pointer bg-gray-500  hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
                    @click="addFeature()"
                    aria-label="Add section"
                  >
                    <div
                      class="w-6 h-6"
                      v-html="require(`~/assets/icons/add.svg?include`)"
                    ></div>
                  </button>
                  <p class="ml-3 leading-none">Add section</p>
                </div>
              </div>
              <!-- <p
                class="mt-6 border px-4 py-2 rounded border-gray-600 text-gray-500"
              >
                Add a section to attach images, music, videos and documents to
                your business card.
                <br />
                <br />
                Supported file formats: jpeg, png, mp3, mp4, webm, pdf
              </p> -->
            </div>
          </div>
          <div id="step-6" class="mt-16">
            <h2 class="font-extrabold text-2xl">Embed content</h2>
            <div class="field-container">
              <Embed
                v-for="(item, index) in embedContent"
                :key="index"
                :index="index"
                :embedContent="embedContent"
              />
              <div class="flex mt-6">
                <div class="flex flex-wrap items-center">
                  <button
                    class="p-3 rounded-full cursor-pointer bg-gray-500  hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
                    @click="addEmbed()"
                    aria-label="Add section"
                  >
                    <div
                      class="w-6 h-6"
                      v-html="require(`~/assets/icons/add.svg?include`)"
                    ></div>
                  </button>
                  <p class="ml-3 leading-none">Add section</p>
                </div>
              </div>
            </div>
          </div>
          <div id="step-7" class="mt-16">
            <h2 class="font-extrabold text-2xl">Product catalogue</h2>
            <div class="field-container">
              <Product
                v-for="(item, index) in products"
                :key="index"
                :index="index"
                :products="products"
                :showAlert="showAlert"
                :resizeImage="resizeImage"
              />
              <div class="flex mt-6">
                <div class="flex flex-wrap items-center">
                  <button
                    class="p-3 rounded-full cursor-pointer bg-gray-500  hover:bg-green-600 focus:bg-green-600 transition-colors duration-200"
                    @click="addProduct()"
                    aria-label="Add section"
                  >
                    <div
                      class="w-6 h-6"
                      v-html="require(`~/assets/icons/add.svg?include`)"
                    ></div>
                  </button>
                  <p class="ml-3 leading-none">Add section</p>
                </div>
              </div>
            </div>
          </div>
          <div id="step-8" class="mt-16">
            <h2 class="font-extrabold text-2xl">Colour customisation</h2>
            <div class="field-container">
              <Colour name="logoBg" label="Logo background" :colors="colors" />
              <Colour name="mainBg" label="Main background" :colors="colors" />
              <Colour
                name="buttonBg"
                label="Button background"
                :colors="colors"
              />
              <Colour name="cardBg" label="Card background" :colors="colors" />
            </div>
          </div>
          <div id="step-9" class="mt-16">
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
                  class="toggle-switch absolute block w-10 h-10 m-1 rounded-full bg-gray-900 border-4 border-transparent appearance-none cursor-pointer transition-colors duration-200"
                />
                <label
                  for="toggle"
                  class="toggle-label block overflow-hidden h-12 rounded-full bg-gray-500 hover:bg-green-600 cursor-pointer transition-colors duration-200  focus:border-green-600"
                ></label>
              </div>
              <label for="toggle">{{
                footerCredit ? 'Yes, for sure!' : 'No, thanks'
              }}</label>
              <p class="text-gray-500 mt-6">
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
            class="bg-gray-900 device-curve rounded-lg w-full sm:max-w-sm sm:mt-10 sm:mb-20"
          >
            <h2 class="text-2xl text-center py-3 font-extrabold text-gray-200">
              Preview
            </h2>
            <div
              id="browserFrame"
              class="overflow-hidden rounded-lg mx-2 pb-8 flex flex-col"
            >
              <div id="topBar" class="topbar bg-gray-800 z-10">
                <div id="searchField" class="pt-6 pl-2 pb-2 flex items-center">
                  <input
                    type="text"
                    class="pl-4 h-12 w-full bg-gray-900 rounded text-gray-500"
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
              <Preview
                ref="html"
                :username="username"
                :businessInfo="businessInfo"
                :images="images"
                :featured="featured"
                :embedContent="embedContent"
                :products="products"
                :colors="colors"
                :primaryActions="primaryActions"
                :secondaryActions="secondaryActions"
                :PreviewMode="PreviewMode"
                :downloadVcard="downloadVcard"
                :footerCredit="footerCredit"
                :showAlert="showAlert"
                :hasLightBG="hasLightBG"
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
        <Check
          v-for="(item, index) in downloadCheckList"
          :downloadCheckList="downloadCheckList"
          :item="item"
          :key="index"
          :index="index"
        />
        <button
          ref="downloadPackage"
          @click="downloadPackage"
          class="inline-block bg-gray-700 text-lg uppercase font-extrabold text-white px-8 py-6 rounded mt-12 select-none transition-colors duration-200"
          :class="
            downloadChecked
              ? 'bg-green-600 cursor-pointer focus:bg-green-500 hover:bg-green-500'
              : 'cursor-not-allowed'
          "
        >
          Download Package
        </button>
        <p class="text-gray-500 mt-6">
          Extract the package and follow the instructions in the README.txt file
        </p>
      </div>
    </div>
    <Donate />
    <StyleSheet ref="stylesheet" v-show="false" />
    <Vcard ref="vCard" v-show="false" :vCard="vCard" />
    <ReadMe ref="readme" v-show="false" :name="username" />
    <QRCode ref="qrcode" v-show="false" />
    <footer class="py-8 mx-4 mt-24">
      <p class="text-gray-500 text-sm">
        <a
          class="underline hover:text-green-600 transition-colors duration-200"
          href="http://t.me/dbizcard"
          target="_blank"
          rel="noopener noreferrer"
          >Join the Telegram group</a
        >
        for reporting issues, suggestions and feedback
      </p>
      <hr class="border-t-2 border-gray-700 mt-4" />
      <div class="flex justify-start items-center mt-8">
        <div
          class="logo w-16 mr-2 self-start"
          v-html="require(`~/assets/icons/logo.svg?include`)"
        ></div>
        <div>
          <p class="font-extrabold leading-tight">
            Digital Business Card Generator
          </p>
          <p class="text-gray-500 text-xs">
            by
            <a
              class="underline hover:text-green-600 transition-colors duration-200"
              href="https://www.vishnuraghav.com/"
              target="_blank"
              rel="noopener noreferrer"
              >Vishnu&nbsp;Raghav</a
            >
            | AGPLv3 |
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
import Modal from '@/components/Modal'
import Attachment from '@/components/Attachment'
import Action from '@/components/Action'
import Feature from '@/components/Feature'
import Embed from '@/components/Embed'
import Product from '@/components/Product'
import Colour from '@/components/Colour'
import Preview from '@/components/Preview'
import Check from '@/components/Check'
import Donate from '@/components/Donate'

import StyleSheet from '@/components/StyleSheet'
import ReadMe from '@/components/ReadMe'
import Vcard from '@/components/Vcard'
import QRCode from '@/components/QRCode'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
export default {
  components: {
    Modal,
    Attachment,
    Action,
    Feature,
    Embed,
    Product,
    Colour,
    Preview,
    Check,
    Donate,
    StyleSheet,
    ReadMe,
    Vcard,
    QRCode,
  },

  data() {
    return {
      downloadCheckList: [
        {
          label:
            'I did not attach any link or file that will cause any risk to the user',
          checked: false,
        },
        {
          label:
            'I have verified that all the links are working correctly in the Preview',
          checked: false,
        },
        {
          label:
            'I have verified that all the information provided here are correct',
          checked: false,
        },
      ],
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
      colors: {
        mainBg: {
          color: `#eee`,
          openPalette: false,
        },
        logoBg: {
          color: `#000`,
          openPalette: false,
        },
        buttonBg: {
          color: `#000`,
          openPalette: false,
        },
        cardBg: {
          color: `#ddd`,
          openPalette: false,
        },
      },
      businessInfo: {
        name: null,
        jobTitle: null,
        businessName: null,
        businessDescription: null,
        publicKey: null,
        fingerprint: null,
      },
      primaryActions: [],
      secondaryActions: [],
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
            name: 'call',
            href: 'tel:',
            placeholder: '+91 XXXXX XXXXX',
            value: null,
            label: 'Phone number',
          },
          {
            name: 'whatsapp',
            placeholder: 'https://wa.me/userid',
            value: null,
            label: 'WhatsApp profile URL',
          },
          {
            name: 'telegram',
            placeholder: 'https://t.me/username',
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
            placeholder: 'https://example.com',
            value: null,
            label: 'Website URL',
          },
          {
            name: 'store',
            placeholder: 'https://example.com/storeID',
            value: null,
            label: 'Online Store URL',
          },
          {
            name: 'locate',
            placeholder: 'https://osm.org/go/location',
            value: null,
            label: 'Map location URL',
          },
        ],
        secondaryActions: [
          {
            name: 'instagram',
            placeholder: 'https://instagram.com/username',
            value: null,
            color: '#405de6',
            label: 'Instagram profile URL',
          },
          {
            name: 'pixelfed',
            placeholder: 'https://pixelfed.social/username',
            value: null,
            color: '#8d59a8',
            label: 'Pixelfed profile URL',
          },
          {
            name: 'facebook',
            placeholder: 'https://facebook.com/pagename',
            value: null,
            color: '#1877f2',
            label: 'Facebook page URL',
          },
          {
            name: 'diaspora',
            placeholder: 'https://diaspora.social/username',
            value: null,
            color: '#000000',
            label: 'Diaspora profile URL',
          },
          {
            name: 'friendica',
            placeholder: 'https://friendica.social/username',
            value: null,
            color: '#1d6e9a',
            label: 'Friendica profile URL',
          },
          {
            name: 'twitter',
            placeholder: 'https://twitter.com/username',
            value: null,
            color: '#1da1f2',
            label: 'Twitter profile URL',
          },
          {
            name: 'mastodon',
            placeholder: 'https://mastodon.social/@username',
            value: null,
            color: '#2b90d9',
            label: 'Mastodon profile URL',
          },
          {
            name: 'linkedin',
            placeholder: 'https://linkedin.com/username',
            value: null,
            color: '#0077b5',
            label: 'Linkedin profile URL',
          },
          {
            name: 'youtube',
            placeholder: 'https://youtube.com/channelname',
            value: null,
            color: '#ff0000',
            label: 'Youtube channel URL',
          },
          {
            name: 'vimeo',
            placeholder: 'https://vimeo.com/channelname',
            value: null,
            color: '#1ab7ea',
            label: 'Vimeo channel URL',
          },
          {
            name: 'peertube',
            placeholder: 'https://peertube.video/channelname',
            value: null,
            color: '#ffffff',
            label: 'Peertube channel URL',
          },
          {
            name: 'pinterest',
            placeholder: 'https://pinterest.com/username',
            value: null,
            color: '#bd081c',
            label: 'Pinterest profile URL',
          },
          {
            name: 'behance',
            placeholder: 'https://behance.net/username',
            value: null,
            color: '#1769ff',
            label: 'Behance profile URL',
          },
          {
            name: 'dribbble',
            placeholder: 'https://dribbble.com/username',
            value: null,
            color: '#ea4c89',
            label: 'Dribbble profile URL',
          },
          {
            name: 'reddit',
            placeholder: 'https://reddit.com/username',
            value: null,
            color: '#ff5700',
            label: 'Reddit profile URL',
          },
          {
            name: 'vk',
            placeholder: 'https://vk.com/pagename',
            value: null,
            color: '#4a76a8',
            label: 'VK page URL',
          },
          {
            name: 'snapchat',
            placeholder: 'https://snapchat.com/username',
            value: null,
            color: '#fffc00',
            label: 'Snapchat profile URL',
          },
          {
            name: 'tumblr',
            placeholder: 'https://username.tumblr.com',
            value: null,
            color: '#2c4762',
            label: 'Tumblr blog URL',
          },
          {
            name: 'quora',
            placeholder: 'https://quora.com/username',
            value: null,
            color: '#a82400',
            label: 'Quora profile URL',
          },
          {
            name: 'medium',
            placeholder: 'https://medium.com/publication_name',
            value: null,
            color: '#000000',
            label: 'Medium publication',
          },
          {
            name: 'discord',
            placeholder: 'https://discord.com/username',
            value: null,
            color: '#7289da',
            label: 'Discord profile URL',
          },
          {
            name: 'twitch',
            placeholder: 'https://twitch.tv/username',
            value: null,
            color: '#9146ff',
            label: 'Twitch profile URL',
          },
          {
            name: 'spotify',
            placeholder: 'https://spotify.com/username',
            value: null,
            color: '#1ed760',
            label: 'Spotify profile URL',
          },
          {
            name: 'soundcloud',
            placeholder: 'https://soundcloud.com/username',
            value: null,
            color: '#ff3300',
            label: 'Soundcloud profile URL',
          },
          {
            name: 'funkwhale',
            placeholder: 'https://funkwhale.audio/username',
            value: null,
            color: '#ffffff',
            label: 'Funkwhale profile URL',
          },
          {
            name: 'github',
            placeholder: 'https://github.com/username',
            value: null,
            color: '#333',
            label: 'Github profile URL',
          },
          {
            name: 'gitlab',
            placeholder: 'https://gitlab.com/username',
            value: null,
            color: '#554488 ',
            label: 'Gitlab profile URL',
          },
          {
            name: 'codeberg',
            placeholder: 'https://codeberg.org/username',
            value: null,
            color: '#2185d0',
            label: 'Codeberg profile URL',
          },
          {
            name: 'yelp',
            placeholder: 'https://yelp.com/bizname',
            value: null,
            color: '#fff',
            label: 'Yelp page URL',
          },
          {
            name: 'paypal',
            placeholder: 'https://paypal.me/username',
            value: null,
            color: '#003087',
            label: 'PayPal.me URL',
          },
        ],
      },
      featured: [
        {
          title: 'Section title',
          content: [],
        },
      ],
      embedContent: [
        {
          title: 'Section title',
          content: [''],
        },
      ],
      products: [
        {
          title: 'Section title',
          content: [
            {
              image: null,
              title: null,
              description: null,
              price: null,
              label: null,
              link: null,
            },
          ],
        },
      ],
      footerCredit: true,
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
    fingerprintIsValid() {
      return (
        this.businessInfo.fingerprint &&
        this.businessInfo.fingerprint.match(/^[a-zA-Z0-9]{40}$/)
      )
    },
    downloadChecked() {
      return this.downloadCheckList.filter((e) => e.checked).length == 3
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
        KEY: this.businessInfo.fingerprint,
        UID: `dbizcard-${randomNumber}`,
      }
    },
  },
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
    addFeature() {
      this.featured.push({
        title: 'Section title',
        content: [],
      })
    },
    addEmbed() {
      this.embedContent.push({
        title: 'Section title',
        content: [''],
      })
    },
    addProduct() {
      this.products.push({
        title: 'Section title',
        content: [
          {
            image: null,
            title: null,
            description: null,
            price: null,
            label: null,
            link: null,
          },
        ],
      })
    },
    hasLightBG(e) {
      let hex = this.colors[e].color
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
    async resizeImage(type, index1, index2) {
      let vm = this
      let reader = new FileReader()
      let file
      if (index2 >= 0) {
        if (type == 'image') {
          file = await this.featured[index1].content[index2].file
        } else if (type == 'music') {
          file = await this.featured[index1].content[index2].cover
        } else if (type == 'product') {
          file = await this.products[index1].content[index2].image.file
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
              if (index2 >= 0) {
                if (type == 'image') {
                  vm.featured[index1].content[index2].file = image
                } else if (type == 'music') {
                  vm.featured[index1].content[index2].cover = image
                } else if (type == 'product') {
                  vm.products[index1].content[index2].image.file = image
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
          if (this.featured.length) {
            this.featured.forEach((item, index) => {
              item.content.forEach((item, i) => {
                zip
                  .folder(username)
                  .folder('featured')
                  .file(
                    `${this.getTitle(item.title)}.${item.format}`,
                    item.file
                  )
                if (item.type.match(/music|document/gi)) {
                  zip
                    .folder(username)
                    .folder('featured')
                    .file(
                      `${this.getTitle(item.title)}.${item.coverFormat}`,
                      item.cover
                    )
                }
              })
            })
          }
          if (this.products.length) {
            this.products.forEach((item, index) => {
              item.content.forEach((item, i) => {
                zip
                  .folder(username)
                  .folder('products')
                  .file(
                    `${this.getTitle(item.image.title)}.${item.image.format}`,
                    item.image.file
                  )
              })
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
          zip
            .generateAsync({
              type: 'blob',
            })
            .then(function (zip) {
              saveAs(zip, `${name}'s Digital Business Card.zip`)
            })
          this.PreviewMode = true
        }, 250)
      }
    },
  },
}
</script>
