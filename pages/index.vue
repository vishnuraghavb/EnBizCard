<template>
  <div
    ref="container"
    class="container relative bg-gray-900 mx-auto text-gray-100"
    style="max-width: 960px"
  >
    <Modal
      v-if="content"
      @click.native.self="clearContent"
      :content="content"
      :clearContent="clearContent"
    />
    <transition name="drop">
      <div
        v-if="inView || showPreview"
        class="fixed top-0 w-full z-30 bg-gray-900 justify-between items-center flex md:hidden"
      >
        <div
          class="logo w-16 m-4"
          v-html="require(`~/assets/icons/logo.svg?include`)"
        ></div>
        <button
          class="p-3 mx-4 font-extrabold rounded tracking-wide focus:outline-none select-none"
          :class="showPreview ? 'bg-gray-700' : 'bg-green-600'"
          @click="!opening && togglePreview()"
        >
          {{ showPreview ? 'Close preview' : 'Open preview' }}
        </button>
      </div>
    </transition>
    <transition name="fade">
      <Preview
        v-show="showPreview"
        class="fixed top-20 w-full bottom-0 z-20 border-none rounded-b-none"
        ref="html"
        :username="username"
        :genInfo="genInfo"
        :images="images"
        :featured="featured"
        :colors="colors"
        :primaryActions="primaryActions"
        :secondaryActions="secondaryActions"
        :PreviewMode="PreviewMode"
        :downloadVcard="downloadVcard"
        :footerCredit="footerCredit"
        :showAlert="showAlert"
        :hasLightBG="hasLightBG"
        :downloadKey="downloadKey"
        :pubKeyIsValid="pubKeyIsValid"
      />
    </transition>

    <div class="px-4">
      <div class="flex items-start justify-between pt-8">
        <div
          class="logo w-24"
          v-html="require(`~/assets/icons/logo.svg?include`)"
          title="EnBizCard - An Open-Source Digital Business Card Generator"
        ></div>
        <a
          class="font-extrabold tracking-wide leading-none flex-shrink-0 p-3 border-2 text-white border-gray-700 rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
          href="https://www.vishnuraghav.com/donate"
          target="_blank"
          rel="noreferrer"
          >Donate</a
        >
      </div>
      <h1
        class="text-3xl md:text-5xl font-extrabold mt-24 md:mt-48 md:leading-tight"
      >
        Why Pay When Your Website Can Host Your Digital Business Cards for Free!
      </h1>
      <p class="mt-8 text-lg md:text-xl w-full md:w-3/4 text-gray-200">
        EnBizCard helps you create beautiful, responsive HTML&#8209;based
        digital business cards that can be hosted on your website.
      </p>
      <ul class="mt-4 text-gray-400">
        <li>-&ensp;No sign-up required</li>
        <li>-&ensp;100% free and open-source</li>
        <li>-&ensp;No user tracking and data collection</li>
        <li>-&ensp;Works offline</li>
      </ul>
      <div class="mt-4 flex flex-wrap items-center">
        <button
          class="font-extrabold leading-none text-lg tracking-wide select-none flex-shrink-0 p-5 mt-2 mr-2 text-white bg-green-600 rounded hover:bg-green-500 focus:bg-green-500 transition-colors duration-200 focus:outline-none"
          @click="create()"
        >
          Create your own
        </button>
        <a
          class="font-extrabold leading-none text-lg tracking-wide flex-shrink-0 p-5 mt-2 text-white bg-gray-700 rounded hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200"
          href="/demo"
          target="_blank"
          >View demo</a
        >
      </div>
      <p class="mt-6">
        Read the
        <NuxtLink
          to="/hosting-guide"
          class="cursor-pointer underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
          >Hosting Guide</NuxtLink
        >
      </p>
    </div>
    <div class="md:grid md:grid-cols-2">
      <div class="px-4 mt-32">
        <div ref="create" id="step-1" class="pt-8">
          <h2 class="font-extrabold text-2xl">Image attachments</h2>
          <div class="stepC">
            <Attachment
              :content="images"
              type="logo"
              :resizeImage="resizeImage"
              label="Attach brand logo"
              description="suggested format: svg, png or gif"
              :showAlert="showAlert"
            />
            <Attachment
              :content="images"
              type="photo"
              :resizeImage="resizeImage"
              label="Attach photo"
              description="suggested format: jpeg, png or gif"
              :showAlert="showAlert"
            />
          </div>
        </div>
        <div id="step-2" class="mt-16">
          <h2 class="font-extrabold text-2xl">General information</h2>
          <div class="stepC mt-6">
            <label for="fullname" class="ml-4">Full name</label>
            <input
              id="fullname"
              spellcheck="false"
              type="text"
              v-model="genInfo.name"
              class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
            />
          </div>
          <div class="stepC mt-6">
            <label for="job-title" class="ml-4">Job title</label>
            <input
              id="job-title"
              type="text"
              spellcheck="true"
              v-model="genInfo.title"
              class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
            />
          </div>
          <div class="stepC mt-6">
            <label for="business-name" class="ml-4">Business name</label>
            <input
              id="business-name"
              spellcheck="false"
              type="text"
              v-model="genInfo.biz"
              class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
            />
          </div>
          <div class="stepC mt-6">
            <label for="business-description" class="ml-4"
              >Business description
            </label>
            <textarea
              id="business-description"
              :value="genInfo.desc"
              @input="genInfo.desc = $event.target.value"
              class="block mt-2 px-4 py-3 w-full bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
              rows="4"
            ></textarea>
          </div>
          <div class="stepC relative mt-6">
            <label for="pgp-public-key" class="flex justify-between ml-4"
              >Public key<span
                v-if="genInfo.key"
                class="mr-4"
                :class="pubKeyIsValid ? 'text-green-600' : 'text-orange-600'"
                >{{ pubKeyIsValid ? '' : 'Invalid schema' }}</span
              >
            </label>
            <textarea
              id="pgp-public-key"
              v-model="genInfo.key"
              class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
              rows="4"
              spellcheck="false"
              placeholder="Paste PGP PUBLIC KEY BLOCK here"
            ></textarea>
          </div>
          <div class="stepC relative mt-6">
            <label for="pgp-fingerprint" class="flex justify-between ml-4"
              >Public key fingerprint<span
                v-if="genInfo.fp"
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
              v-model="genInfo.fp"
              class="mt-2 px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
              placeholder="Paste 40 character fingerprint here"
            />
          </div>
        </div>
        <div id="step-3" class="mt-16">
          <h2 class="font-extrabold text-2xl">Primary actions</h2>
          <draggable
            v-model="primaryActions"
            handle=".drag"
            animation="1"
            ghostClass="ghost"
          >
            <transition-group type="transition" name="list">
              <Action
                v-for="(item, index) in primaryActions"
                :key="'item' + index"
                name="primaryActions"
                :type="primaryActions"
                :item="item"
                :index="index"
                :buttonBg="colors.buttonBg.color"
                :removeAction="removeAction"
              />
            </transition-group>
          </draggable>

          <div
            class="stepC actions mt-6 border-gray-800"
            :class="{ 'border-t pt-6': primaryActions.length }"
          >
            <button
              v-for="(action, index) in actions.primaryActions"
              :key="index"
              @click="addAction('primaryActions', index)"
              class="p-3 flex-shrink-0 rounded-full hover:scale-125 focus:scale-125 transform transition-transform duration-200 focus:outline-none"
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
          <draggable
            v-model="secondaryActions"
            handle=".drag"
            animation="1"
            ghostClass="ghost"
          >
            <transition-group type="transition" name="list">
              <Action
                v-for="(item, index) in secondaryActions"
                :key="'item' + index"
                name="secondaryActions"
                :type="secondaryActions"
                :item="item"
                :index="index"
                :removeAction="removeAction"
              /> </transition-group
          ></draggable>
          <div
            class="stepC actions mt-6 border-gray-800"
            :class="{ 'border-t pt-6': secondaryActions.length }"
          >
            <button
              v-for="(action, index) in actions.secondaryActions"
              :key="index"
              @click="addAction('secondaryActions', index)"
              class="p-3 flex-shrink-0 rounded-full hover:scale-125 focus:scale-125 transform transition-transform duration-200 focus:outline-none"
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
          <h2 class="font-extrabold text-2xl">Featured content</h2>
          <div class="stepC">
            <draggable
              v-model="featured"
              handle=".drag"
              animation="1"
              ghostClass="ghost"
            >
              <transition-group type="transition" name="list">
                <Featured
                  v-for="(content, index) in featured"
                  :key="'content' + index"
                  :featured="featured"
                  :resizeImage="resizeImage"
                  :index="index"
                  label="Attach content"
                  mimetypes="image/jpeg, image/png, audio/mpeg, video/mp4, video/webm, application/pdf"
                  :showAlert="showAlert"
                /> </transition-group
            ></draggable>

            <div class="flex mt-6">
              <div class="flex flex-wrap items-center">
                <button
                  class="p-3 rounded bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
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
            <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
              Supported media file formats: jpeg, png, mp3, mp4, webm and pdf
            </p>
          </div>
        </div>
        <div id="step-6" class="mt-16">
          <h2 class="font-extrabold text-2xl">Enable footer credit?</h2>
          <div class="stepC mt-6">
            <div class="flex items-center">
              <div
                class="relative group inline-block w-24 h-12 mr-3 align-middle select-none transition duration-200 ease-in bg-gray-700 rounded hover:bg-gray-600 focus:bg-gray-600 cursor-pointer focus:outline-none"
                :class="{
                  'bg-green-600 hover:bg-green-500 focus:bg-green-500': footerCredit,
                }"
                tabindex="0"
                @click="footerCredit = !footerCredit"
                @keypress.space.enter.prevent="footerCredit = !footerCredit"
              >
                <transition name="slide">
                  <input
                    type="checkbox"
                    name="toggle"
                    aria-label="Toggle footer credit"
                    id="toggle"
                    v-model="footerCredit"
                    class="toggle-switch absolute block w-10 h-10 m-1 rounded border-4 border-transparent appearance-none cursor-pointer transition-colors duration-200 focus:outline-none bg-white"
                    tabindex="-1"
                  />
                </transition>
              </div>
              <p>{{ footerCredit ? 'Yes, for sure!' : 'No, thanks' }}</p>
            </div>
            <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
              Footer credit lets others to use this Service. You can support
              this project by enabling the footer credit.
            </p>
          </div>
        </div>
        <div id="step-7" class="mt-16">
          <h2 class="font-extrabold text-2xl">Themes (coming soon)</h2>
          <div class="stepC mt-3 flex flex-wrap">
            <button
              class="w-12 h-12 rounded mt-3 mr-3 bg-green-600 hover:bg-green-500 focus:bg-green-500 font-extrabold focus:outline-none transition-colors duration-200"
            >
              T1
            </button>
            <button
              class="w-12 h-12 rounded mt-3 mr-3 text-black bg-gray-700 font-extrabold focus:outline-none transition-colors duration-200 cursor-default"
            >
              T2
            </button>
          </div>
        </div>
        <div id="step-8" class="mt-16">
          <h2 class="font-extrabold text-2xl">Colour customisation</h2>
          <div class="stepC">
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
          <h2 class="font-extrabold text-2xl">Fonts</h2>
          <div class="stepC mt-6">
            <label for="font-link" class="ml-4">Web font embed code</label>
            <textarea
              id="font-link"
              v-model="genInfo.fontLink"
              class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
              rows="4"
              spellcheck="false"
              :placeholder="`<link href=&quot;https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap&quot; rel=&quot;stylesheet&quot;>`"
            ></textarea>
          </div>
          <div class="stepC mt-6">
            <label for="font-css" class="ml-4">Web font CSS rule</label>
            <input
              spellcheck="false"
              type="text"
              id="font-css"
              v-model="genInfo.fontCss"
              class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
              :placeholder="`font-family: 'Poppins', sans-serif;`"
            />
          </div>
          <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
            Supports services such as Google Fonts, Adobe Typekit, etc. Make
            sure to get the embed link for both regular and bold font variants
            from the same font family.
          </p>
        </div>
        <div id="step-10" class="mt-16">
          <h2 class="font-extrabold text-2xl">Analytics</h2>
          <div class="stepC mt-6">
            <textarea
              id="tracking-code"
              aria-label="tracking-code"
              v-model="genInfo.tracker"
              class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
              rows="4"
              spellcheck="false"
              placeholder="Paste tracking code here"
            ></textarea>
            <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
              Supports services such as Clicky, Matomo, Google Analytics etc.
            </p>
          </div>
        </div>
        <Download
          :downloadCheckList="downloadCheckList"
          :downloadChecked="downloadChecked"
          :downloadPackage="downloadPackage"
        />
        <Help />
      </div>
      <div
        id="preview-container"
        class="relative w-full mt-20 sm:mt-0 hidden md:block"
      >
        <div
          id="preview"
          class="flex flex-col items-center justify-center sm:sticky sm:top-0 md:mx-6 lg:mx-12"
        >
          <div id="device" class="bg-black rounded sm:mt-10">
            <h2 class="text-center py-4 font-extrabold text-gray-200">
              LIVE PREVIEW
            </h2>
            <div id="browserFrame" class="overflow-hidden flex flex-col">
              <div
                id="topBar"
                class="topbar border-r-4 border-l-4 border-black bg-gray-900 z-10"
              >
                <div id="searchField" class="p-2 flex items-center">
                  <input
                    type="text"
                    class="pl-4 h-12 w-full bg-black rounded text-gray-500"
                    aria-label="vCard URL"
                    disabled
                    :value="'yoursite/vcard/' + username + '/'"
                    tabindex="-1"
                  />
                  <div
                    class="w-6 ml-2"
                    v-html="require(`~/assets/icons/ellipsis.svg?include`)"
                  ></div>
                </div>
              </div>
              <Preview
                class="rounded-b-2xl"
                ref="html"
                :username="username"
                :genInfo="genInfo"
                :images="images"
                :featured="featured"
                :colors="colors"
                :primaryActions="primaryActions"
                :secondaryActions="secondaryActions"
                :PreviewMode="PreviewMode"
                :downloadVcard="downloadVcard"
                :footerCredit="footerCredit"
                :showAlert="showAlert"
                :hasLightBG="hasLightBG"
                :downloadKey="downloadKey"
                :pubKeyIsValid="pubKeyIsValid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Vcard ref="vCard" :vCard="vCard" />
    <Footer />
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Attachment from '@/components/Attachment'
import Action from '@/components/Action'
import Featured from '@/components/Featured'
import Colour from '@/components/Colour'
import Preview from '@/components/Preview'
import Download from '@/components/Download'
import Help from '@/components/Help'
import Footer from '@/components/Footer'
import Cropper from '@/components/Cropper'

import Vcard from '@/components/Vcard'
import JSZip from 'jszip'
import draggable from 'vuedraggable'

import { saveAs } from 'file-saver'
import QRCode from '!!raw-loader!~/static/qrcode.min.js'
import Theme1 from '!!raw-loader!~/assets/styles/T1.min.css'
export default {
  components: {
    Cropper,
    Modal,
    Attachment,
    Action,
    Featured,
    Colour,
    Preview,
    Download,
    Help,
    Footer,
    Vcard,
    draggable,
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
          label: 'I have verified that all the links are working correctly',
          checked: false,
        },
        {
          label: 'I have removed all unused fields and sections',
          checked: false,
        },
      ],
      images: {
        logo: {
          url: null,
          blob: null,
          ext: null,
          mime: null,
          resized: null,
        },
        photo: {
          url: null,
          blob: null,
          ext: null,
          mime: null,
          resized: null,
        },
      },
      colors: {
        logoBg: {
          color: `#1F2937`,
          openPalette: false,
        },
        mainBg: {
          color: `#F9FAFB`,
          openPalette: false,
        },
        buttonBg: {
          color: `#374151`,
          openPalette: false,
        },
        cardBg: {
          color: `#E5E7EB`,
          openPalette: false,
        },
      },
      genInfo: {
        name: null,
        title: null,
        biz: null,
        desc: null,
        key: null,
        fp: null,
        tracker: null,
        fontLink: null,
        fontCss: null,
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
          {
            name: 'patreon',
            placeholder: 'https://patreon.com/username',
            value: null,
            color: '#FF424D',
            label: 'Patreon URL',
          },
          {
            name: 'open-collective',
            placeholder: 'https://opencollective.com/username',
            value: null,
            color: '#fff',
            label: 'Open Collective URL',
          },
        ],
      },
      featured: [
        {
          title: 'Section title',
          content: [],
        },
      ],
      footerCredit: true,
      PreviewMode: true,
      content: null,
      inView: false,
      showPreview: false,
      scrollPos: null,
      opening: false,
    }
  },
  computed: {
    pubKeyIsValid() {
      if (this.genInfo.key) {
        if (!this.genInfo.key.match(/^(-----BEGIN PGP PUBLIC KEY BLOCK-----)/))
          return false

        if (!this.genInfo.key.match(/(-----END PGP PUBLIC KEY BLOCK-----)$/))
          return false

        return true
      } else return false
    },
    fingerprintIsValid() {
      return this.genInfo.fp && this.genInfo.fp.match(/^[a-zA-Z0-9]{40}$/)
    },
    downloadChecked() {
      return this.downloadCheckList.filter((e) => e.checked).length == 3
    },
    username() {
      return this.genInfo.name
        ? this.genInfo.name.toLowerCase().replace(/\W+/g, '')
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
        FN: this.genInfo.name,
        TITLE: this.genInfo.title,
        ORG: this.genInfo.biz,
        TEL1: phoneNumbers[0],
        TEL2: phoneNumbers[1],
        EMAIL: email,
        URL: website,
        KEY: this.genInfo.fp,
        UID: `enbizcard-${randomNumber}`,
      }
    },
  },
  methods: {
    togglePreview() {
      this.opening = true
      let c = this.$refs.container
      if (this.showPreview) {
        c.classList.remove('overflow-y-hidden', 'h-screen')
        window.scrollTo(0, this.scrollPos)
        this.opening = false
      } else {
        this.scrollPos = window.scrollY
        setTimeout(() => {
          c.classList.add('overflow-y-hidden', 'h-screen')
          this.opening = false
        }, 400)
      }
      this.showPreview = !this.showPreview
    },
    checkView() {
      let e = this.$refs.create
      if (e) {
        let top = e.getBoundingClientRect().top
        this.inView = this.showPreview ? true : top < 0
      }
    },
    clearContent() {
      this.content = null
    },
    create() {
      this.$refs.create.scrollIntoView({ behavior: 'smooth' })
    },
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
    addFeature() {
      this.featured.push({
        title: 'Section title',
        content: [],
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
      let blob = new Blob([this.genInfo.key], {
        type: 'text/plain',
      })
      saveAs(
        window.URL.createObjectURL(blob),
        `${this.genInfo.name}'s public key.asc`
      )
    },
    async resizeImage(type, mime, index1, index2) {
      let vm = this
      let reader = new FileReader()
      let file
      if (index2 >= 0) {
        if (type == 'image') {
          file = await this.featured[index1].content[index2].file
        } else if (type == 'music') {
          file = await this.featured[index1].content[index2].cover
        } else if (type == 'product') {
          file = await this.featured[index1].content[index2].image.file
        }
      } else {
        file = await this.images[type].blob
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
            (blob) => {
              let image = new File([blob], type, {
                type: mime,
              })
              if (index2 >= 0) {
                if (type == 'image') {
                  vm.featured[index1].content[index2].file = image
                } else if (type == 'music') {
                  vm.featured[index1].content[index2].cover = image
                } else if (type == 'product') {
                  vm.featured[index1].content[index2].image.file = image
                }
              } else {
                vm.images[type].resized = image
              }
            },
            mime,
            0.8
          )
        }
      }
      reader.readAsDataURL(file)
    },
    getTrackingCode() {
      let regex = /<script[^<]*<\/script>/g
      let tracker = this.genInfo.tracker
      if (regex.test(tracker)) {
        let scripts = tracker.match(regex)
        let temp = document.createElement('div')
        temp.innerHTML = tracker
        return scripts.length && temp
      }
      return false
    },
    downloadPackage() {
      if (this.downloadChecked) {
        this.PreviewMode = false
        setTimeout(() => {
          let el = new DOMParser().parseFromString(
            this.$refs.html.$refs.html.outerHTML,
            'text/html'
          )

          // Inject stylesheets
          let styleLink = document.createElement('link')
          styleLink.rel = 'stylesheet'
          styleLink.href = './style.min.css'
          el.querySelector('head').appendChild(styleLink)

          // Inject qrcode script
          let qrcode = document.createElement('script')
          qrcode.src = './qrcode.min.js'
          el.querySelector('body').appendChild(qrcode)

          // Inject general script
          let modals = document.createElement('script')
          modals.innerText =
            'let m=document.getElementById("modal"),c=document.getElementById("close"),ki=document.getElementById("keyInfo"),cv=document.getElementById("copyView"),curl=document.getElementById("copyURL"),qrv=document.getElementById("qrView"),qr=document.getElementById("qr"),s=document.getElementById("share"),sqr=document.getElementById("showQR"),sk=document.getElementById("showKey");function tC(e){"2rem"==e.style.top?(e.style.visibility="visible",e.style.top="0px",e.style.opacity=1):(e.style.top="2rem",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},200))}function dN(e){e.style.display="none"}window.addEventListener("load",()=>{document.querySelector("#topActions").style.display="flex",qr.innerHTML=new QRCode({content:window.location.href,container:"svg-viewbox",join:!0,ecl:"L",padding:0}).svg()}),navigator.canShare?s.addEventListener("click",()=>{navigator.share({title:document.title,text:"You can view my Digital Business Card here:",url:window.location.href})}):s.addEventListener("click",()=>{tC(m),cv.style.display="flex",dN(qrv),ki&&dN(ki)}),sqr.addEventListener("click",()=>{tC(m),qrv.style.display="block",dN(cv),ki&&dN(ki)}),sk&&sk.addEventListener("click",()=>{tC(m),ki&&(ki.style.display="flex"),dN(cv),dN(qrv)}),c.addEventListener("click",()=>tC(m)),curl.addEventListener("click",async()=>{let e=curl.querySelectorAll(".action")[1];await navigator.clipboard.writeText(window.location.href).then(t=>{e.innerText="Copied",setTimeout(()=>{e.innerText="Copy URL"},1e3)})});'
          el.querySelector('body').appendChild(modals)

          // Inject media script
          let mediaHandler = document.createElement('script')
          mediaHandler.innerText =
            'let pC=document.querySelectorAll(".pCtrl"),pP=document.querySelectorAll(".playPause"),srcs=document.querySelectorAll(".source");srcs.forEach(e=>{e.style.pointerEvents="none",e.removeAttribute("controls")}),pC.forEach((e,l)=>{e.style.display="flex";let r=e.querySelector(".currentTime"),s=e.querySelector(".seekBar"),t=e.querySelector(".playPause"),a=t.querySelector(".play"),c=t.querySelector(".pause");srcs[l].addEventListener("timeupdate",()=>{let e=srcs[l].currentTime,t=100/srcs[l].duration*e;s.value=t,100==t&&(s.value=0,a.style.display="block",c.style.display="none");let o=Math.floor(e/60),y=Math.floor(e%60);o.toString().length<2&&(o="0"+o),y.toString().length<2&&(y="0"+y),r.value=o+":"+y}),s.addEventListener("change",()=>{srcs[l].currentTime=srcs[l].duration*(parseInt(s.value)/100)}),t.addEventListener("click",()=>{srcs[l].paused?(srcs.forEach((e,r)=>{l!=r&&(e.paused||e.pause())}),pP.forEach((e,l)=>{let r=e.querySelector(".play"),s=e.querySelector(".pause");r.style.display="block",s.style.display="none"}),srcs[l].play(),a.style.display="none",c.style.display="block"):(srcs[l].pause(),c.style.display="none",a.style.display="block")})});'
          if (this.featured.length)
            el.querySelector('body').appendChild(mediaHandler)

          // Inject tracking scripts
          let tracker = this.getTrackingCode()
          while (tracker.firstChild) el.head.appendChild(tracker.firstChild)

          // Create blobs
          let html = new Blob(
            [`<!DOCTYPE html>${el.documentElement.outerHTML}`],
            {
              type: 'text/html',
            }
          )
          let css = new Blob([Theme1], {
            type: 'text/css',
          })
          let vCard = new Blob([this.$refs.vCard.$refs.vCard.innerText], {
            type: 'text/plain',
          })
          let guide = new Blob(
            [
              '<html><head><meta http-equiv="refresh" content="0; url=https://enbizcard.vercel.app/hosting-guide" /></head></html>',
            ],
            {
              type: 'text/html',
            }
          )
          let qrScript = new Blob([QRCode], {
            type: 'application/javascript',
          })

          // Prepare files
          let username = this.username
          let zip = new JSZip()
          zip.folder(username).file('index.html', html)
          zip.folder(username).file('style.min.css', css)
          zip.folder(username).file('qrcode.min.js', qrScript)
          zip.file('Hosting-Guide.html', guide)

          // Image attachments
          for (const key in this.images) {
            if (this.images[key].url) {
              zip
                .folder(username)
                .file(
                  `${key}.${this.images[key].ext}`,
                  this.images[key].resized
                )
            }
          }

          // Featured content
          let hasFeaturedContent = this.featured.filter((e) => e.content.length)
            .length
          if (hasFeaturedContent) {
            this.featured.forEach((item) => {
              item.content.forEach((item) => {
                if (item.contentType == 'media') {
                  zip
                    .folder(username)
                    .folder('media')
                    .file(`${this.getTitle(item.title)}.${item.ext}`, item.file)
                  if (item.type.match(/music|document/gi)) {
                    if (!item.info) {
                      zip
                        .folder(username)
                        .folder('media')
                        .file(
                          `${this.getTitle(item.title)}.${item.coverExt}`,
                          item.cover
                        )
                    }
                  }
                } else if (item.contentType == 'product' && item.image) {
                  zip
                    .folder(username)
                    .folder('media')
                    .file(
                      `${this.getTitle(item.image.title)}.${item.image.ext}`,
                      item.image.file
                    )
                }
              })
            })
          }

          //  Public key
          let name = this.genInfo.name
          if (this.pubKeyIsValid) {
            zip
              .folder(username)
              .file(`${name}'s public key.asc`, this.genInfo.key)
          }

          // VCARD
          zip.folder(username).file(`${username}.vcf`, vCard)

          // Final ZIP file
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
  mounted() {
    window.addEventListener('scroll', this.checkView)
    // window.onbeforeunload = function () {
    //   return 'Your work will be lost.'
    // }
  },
}
</script>