<template>
  <div
    class="overflow-y-scroll max-hd border-t-0 border-4 border-black bg-gray-900"
  >
    <div id="Theme1">
      <html
        ref="html"
        lang="en"
        :style="{ backgroundColor: `${colors.logoBg.color}` }"
      >
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta v-if="!PreviewMode" name="robots" content="noindex, nofollow" />
          <meta
            name="author"
            content="EnBizCard - An Open-Source Digital Business Card Generator"
          />
          <meta name="url" content="https://enbizcard.vercel.app/" />
          <meta name="designer" content="Vishnu Raghav" />
          <meta
            property="og:title"
            :content="`${genInfo.name}'s Digital Business Card`"
          />
          <meta
            property="twitter:title"
            :content="`${genInfo.name}'s Digital Business Card`"
          />
          <!-- prettier-ignore -->
          <script>
            "http"==window.location.href.substr(0,4)&&"/"!=window.location.href.slice(-1)&&window.location.replace(window.location.href+"/");
          </script>
          <link v-if="getCssHref" :href="getCssHref" rel="stylesheet" />
          <title>{{ genInfo.name }}'s Digital Business Card</title>
          <style>
            #body{ font-family: sans-serif; } input[type='range']::-moz-range-track { background: none; } input[type='range']::-moz-range-thumb { -moz-appearance: none; width: 3rem; height: 3rem; border-radius: 100%; border: none; background: {{colors.buttonBg.color}}; z-index: 3; cursor: pointer; } input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 3rem; height: 3rem; border-radius: 100%; border: none; background: {{colors.buttonBg.color}}; z-index: 3; cursor: pointer; } .closeBtnColor{ {{hasLightBG('mainBg') && 'filter:invert(1)'}} } .topAction{ {{hasLightBG('logoBg') && 'filter:invert(1)'}} } .action{ color:#fff; {{hasLightBG('buttonBg') ? 'filter:invert(1)' : null}} } .card{ {{hasLightBG('cardBg') && 'color:#000 !important'}} } .text{ text-align: center;line-height: 1.5;{{hasLightBG('mainBg') ? 'color:#000 !important' : 'color:#fff !important'}} }
          </style>
          <style v-if="getCssHref">
            #body{
            {{genInfo.fontCss && getFontFamily}}
            }
          </style>
        </head>
        <body id="body">
          <div
            id="modal"
            ref="modal"
            :style="`backgroundColor: ${colors.mainBg.color}; visibility: hidden; top: 2rem; opacity: 0;`"
          >
            <div id="closeModal">
              <a id="close" @click="closePublicKey()" class="closeBtnColor">
                <div
                  class="icon"
                  v-html="require(`~/assets/icons/close.svg?include`)"
                ></div>
              </a>
            </div>
            <div id="modalView">
              <div id="keyInfo">
                <p class="text">
                  Use my public key to send me encrypted messages
                </p>
                <a
                  :href="!PreviewMode && `./${genInfo.name}'s public key.asc`"
                  download
                  target="_blank"
                  id="dlKey"
                  rel="noreferrer"
                  @click.prevent.capture="downloadKey()"
                  :style="{
                    backgroundColor: `${colors.buttonBg.color}`,
                  }"
                  tabindex="-1"
                >
                  <div
                    class="icon action"
                    v-html="require(`~/assets/icons/download.svg?include`)"
                  ></div>
                  <span class="action">Download Key</span>
                </a>
              </div>
              <div id="copyView" ref="copyView">
                <p class="text">
                  Copy and send the URL to share my Business Card
                </p>
                <button
                  id="copyURL"
                  :style="{
                    backgroundColor: `${colors.buttonBg.color}`,
                  }"
                >
                  <div
                    class="icon action"
                    v-html="require(`~/assets/icons/copy.svg?include`)"
                  ></div>
                  <span class="action">Copy URL</span>
                </button>
              </div>
              <div id="qrView" ref="qrView">
                <div id="qr"></div>
                <h2 class="text">Scan the QR Code</h2>
                <p class="text">to view my Business Card on another device</p>
              </div>
            </div>
          </div>
          <header>
            <img
              id="logo"
              v-if="images.logo.url"
              :src="PreviewMode ? images.logo.url : `./logo.${images.logo.ext}`"
              alt="Logo"
            />
            <div
              id="topActions"
              :style="{ display: PreviewMode ? 'flex' : 'none' }"
            >
              <div>
                <a id="share" @click.prevent.capture="sharingAlert()">
                  <div
                    class="icon topAction"
                    v-html="require(`~/assets/icons/share.svg?include`)"
                  ></div>
                </a>
                <a id="showQR" @click.prevent.capture="sharingAlert()"
                  ><div
                    class="icon topAction"
                    v-html="require(`~/assets/icons/qrcode.svg?include`)"
                  ></div>
                </a>
              </div>
              <a
                v-if="pubKeyIsValid"
                id="showKey"
                @click.prevent.capture="showKey()"
                ><div
                  class="icon topAction"
                  v-html="require(`~/assets/icons/key.svg?include`)"
                ></div>
              </a>
            </div>
          </header>
          <main :style="{ backgroundColor: `${colors.mainBg.color}` }">
            <div id="profile">
              <img
                v-if="images.photo.url"
                :src="
                  PreviewMode ? images.photo.url : `./photo.${images.photo.ext}`
                "
                alt="Photo"
              />
              <div id="info">
                <p class="name text">
                  {{ genInfo.name }}
                </p>
                <p class="jobtitle text">
                  {{ genInfo.title }}
                </p>
              </div>
            </div>
            <p class="desc text" v-if="genInfo.desc">
              {{ genInfo.desc }}
            </p>
            <div class="actions">
              <div
                class="actionsC"
                v-for="(item, index) in primaryActions"
                :key="'pa' + index"
              >
                <div class="actionBtn">
                  <a
                    :href="`${item.href ? item.href + item.value : item.value}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    :style="{
                      backgroundColor: `${colors.buttonBg.color}`,
                    }"
                    :aria-label="item.name"
                  >
                    <div
                      class="icon action"
                      v-html="
                        require(`~/assets/icons/${item.name}.svg?include`)
                      "
                    ></div>
                  </a>
                  <p class="text">
                    {{
                      item.name.substr(0, 1).toUpperCase() + item.name.slice(1)
                    }}
                  </p>
                </div>
              </div>
              <div id="cta">
                <a
                  id="vcard"
                  rel="noreferrer"
                  :href="!PreviewMode && `${username}.vcf`"
                  download
                  target="_blank"
                  :style="{ backgroundColor: `${colors.buttonBg.color}` }"
                  @click.prevent="downloadVcard"
                  aria-label="Add to Contacts"
                >
                  <div
                    class="icon action"
                    v-html="require(`~/assets/icons/user-plus.svg?include`)"
                  ></div>
                  <p class="action">Add to Contacts</p>
                </a>
              </div>
            </div>
            <div class="actions secondary">
              <div
                class="actionsC"
                v-for="(item, index) in secondaryActions"
                :key="'sa' + index"
              >
                <div class="actionBtn secBtn">
                  <a
                    :href="item.value"
                    target="_blank"
                    rel="noopener noreferrer"
                    :style="{ backgroundColor: item.color }"
                    :aria-label="item.name"
                  >
                    <div
                      class="icon"
                      v-html="
                        require(`~/assets/icons/${item.name}.svg?include`)
                      "
                    ></div>
                  </a>
                </div>
              </div>
            </div>
            <div
              class="attachments"
              v-for="(item, index) in featured"
              :key="'fc' + index"
            >
              <h2 class="section text">{{ item.title }}</h2>
              <div v-for="(item, i) in item.content" :key="i">
                <div
                  v-if="item.contentType == 'media'"
                  class="content"
                  :class="item.type"
                  :style="{ backgroundColor: `${colors.cardBg.color}` }"
                >
                  <div v-if="item.type == 'image'">
                    <img
                      v-if="item.dataURI"
                      :src="
                        PreviewMode
                          ? item.dataURI
                          : `./media/${getTitle(item.title)}.${item.ext}`
                      "
                      alt="Product image"
                    />
                    <div class="controls">
                      <p class="title card">
                        {{ item.title }}
                      </p>
                    </div>
                  </div>
                  <MediaPlayer
                    v-if="item.type == 'music' || item.type == 'video'"
                    ref="mediaPlayer"
                    :media="item"
                    :type="item.type"
                    :colors="colors"
                    :togglePlay="togglePlay"
                    :PreviewMode="PreviewMode"
                  />
                  <DocumentDownloader
                    v-if="item.type == 'document'"
                    :media="item"
                    :type="item.type"
                    :colors="colors"
                    :PreviewMode="PreviewMode"
                  />
                </div>
                <ProductShowcase
                  v-else-if="item.contentType == 'product' && item.title"
                  :product="item"
                  :colors="colors"
                  :PreviewMode="PreviewMode"
                />
                <div
                  v-else-if="item.contentType == 'text' && item.value"
                  class="content text"
                  :style="{ backgroundColor: `${colors.cardBg.color}` }"
                >
                  <p class="textC card">{{ item.value }}</p>
                </div>
                <div v-else-if="stripAttr(item)" class="content embedded">
                  <iframe
                    :src="stripAttr(item)"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </main>
          <footer
            v-if="footerCredit"
            :style="{ backgroundColor: `${colors.mainBg.color}` }"
            class="text"
          >
            Created with
            <a
              class="text"
              href="https://enbizcard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              >EnBizCard</a
            >
          </footer>
        </body>
      </html>
    </div>
  </div>
</template>

<script>
import MediaPlayer from './MediaPlayer'
import DocumentDownloader from './DocumentDownloader'
import ProductShowcase from './ProductShowcase'
export default {
  props: [
    'username',
    'genInfo',
    'images',
    'featured',
    'colors',
    'primaryActions',
    'secondaryActions',
    'PreviewMode',
    'downloadVcard',
    'downloadKey',
    'footerCredit',
    'showAlert',
    'hasLightBG',
    'pubKeyIsValid',
  ],
  components: {
    MediaPlayer,
    DocumentDownloader,
    ProductShowcase,
  },
  watch: {
    getFeaturedMusic(oldv, newv) {
      this.paused = this.getFeaturedMusic.map((e) => true)
    },
  },
  data() {
    return {
      paused: [],
    }
  },
  computed: {
    getFeaturedMusic() {
      return this.featured.music
    },
    getEmbedContent() {
      return this.embedded
        .map((e) => {
          return {
            title: e.title,
            content: e.content.filter((f) => this.stripAttr(f)),
          }
        })
        .filter((e) => e)
    },
    getCssHref() {
      if (this.genInfo.fontLink) {
        let html = new DOMParser().parseFromString(
          this.genInfo.fontLink,
          'text/html'
        )
        let link = Array.from(html.getElementsByTagName('link')).filter(
          (e) => e.getAttribute('rel') == 'stylesheet'
        )
        return link.length && link[0].getAttribute('href')
      }
      return false
    },
    getFontFamily() {
      let regex = /^font-family[^;]*/
      let css = this.genInfo.fontCss.replace(/\s+/, '')
      if (regex.test(css)) {
        return css.match(/^font-family[^;]*/)[0]
      }
    },
  },
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
    stripAttr(val) {
      if (/<iframe(.*)\/iframe>/.test(val)) {
        let iframe = val.match(/<iframe(.*)\/iframe>/)[0]
        return iframe.match(/src="?([^"\s]+)"/)[1]
      } else return null
    },

    toggleContainer(e) {
      '2rem' == e.style.top
        ? ((e.style.visibility = 'visible'),
          (e.style.top = '0px'),
          (e.style.opacity = 1))
        : ((e.style.top = '2rem'),
          (e.style.opacity = 0),
          setTimeout(() => {
            e.style.visibility = 'hidden'
          }, 200))
    },
    showKey() {
      let modal = this.$refs.modal
      let copyView = this.$refs.copyView
      let qrView = this.$refs.qrView
      this.toggleContainer(modal)
      copyView.style.display = qrView.style.display = 'none'
    },
    closePublicKey() {
      let modal = this.$refs.modal
      this.toggleContainer(modal)
    },
    sharingAlert() {
      this.showAlert(
        'You are able to share your business card after completing the hosting process.\n\nCheck out the <a class="underline font-extrabold text-green-600 hover:text-green-500 transition-colors duration-200" href="/demo" target="_blank">demo</a> to test the functionality.'
      )
    },
    togglePlay(ref) {
      let mediaPlayers = this.$refs.mediaPlayer
      mediaPlayers.forEach((e) => {
        let mediaSource = e.$refs.mediaSource
        let play = e.$refs.play
        let pause = e.$refs.pause
        if (ref != mediaSource) {
          mediaSource.pause()
          play.style.display = 'block'
          pause.style.display = 'none'
        } else {
          if (mediaSource.paused) {
            mediaSource.play()
            play.style.display = 'none'
            pause.style.display = 'block'
          } else {
            mediaSource.pause()
            play.style.display = 'block'
            pause.style.display = 'none'
          }
        }
      })
    },
  },
}
</script>
<style lang="scss">
#Theme1 {
  body {
    margin: 0 auto;
    width: 100%;
    padding: 0;
    max-width: 30rem;
    color: #fff;
    position: relative;
  }
  #modal {
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 0;
    transition: top 0.2s ease-out, opacity 0.1s ease-out;
    transform: translateZ(0);
  }
  #closeModal {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 1rem 0 0;
  }
  #close {
    padding: 0.75rem;
    cursor: pointer;
    line-height: 0;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  #modalView,
  #copyView,
  #qrView,
  #keyInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #copyView,
  #keyInfo {
    p {
      margin: 1rem 2em 2rem;
      text-align: center;
    }
  }
  #copyURL,
  #dlKey {
    display: inline-flex;
    align-items: center;
    border-radius: 5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    outline: none;
    cursor: pointer;
    span {
      margin-left: 0.5rem;
    }
  }
  #qrView {
    h2,
    p {
      margin: 0 2rem 0.5rem;
    }
  }
  #qr {
    margin: 1rem 2rem 2rem;
    padding: 2rem;
    background: #fff;
    border-radius: 0.5rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 6rem 3rem;
    box-sizing: border-box;
  }
  #logo {
    max-height: 6rem;
    text-align: center;
    color: gray;
    pointer-events: none;
    user-select: none;
  }
  #topActions {
    flex-direction: row-reverse;
    justify-content: space-between;
    position: absolute;
    left: 1rem;
    right: 0;
    top: 1rem;
    & > div {
      display: flex;
    }
    a {
      padding: 0.75rem;
      cursor: pointer;
      border-radius: 100%;
      line-height: 0;
      margin-right: 1rem;
    }
  }
  main {
    padding: 1rem;
  }
  #profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 7rem;
      height: 7rem;
      border-radius: 100%;
      text-align: center;
      pointer-events: none;
      user-select: none;
      margin-top: -4.5rem;
    }
  }
  #info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    line-height: 1.25;
    word-break: break-word;
  }
  .name {
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0;
  }
  .jobtitle {
    font-size: 1rem;
    margin: 0.25rem 0 0 0;
  }
  .desc,
  .textC {
    font-size: 0.875rem;
    white-space: pre-line;
    line-height: 1.5;
    margin: 1rem;
  }
  .textC {
    font-size: 1rem;
    margin: 2rem 1rem;
  }
  .actions {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .actionsC {
    width: 33.33%;
  }
  .actionBtn {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    a {
      border-radius: 100%;
      padding: 0.75rem;
      line-height: 0;
    }
    p {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
    }
  }
  .secondary {
    margin-top: 1.25rem;
  }
  .secBtn {
    padding: 1rem;
  }
  a {
    text-decoration: none;
    user-select: none;
  }
  #cta {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  #vcard {
    display: flex;
    align-items: center;
    border-radius: 5rem;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    line-height: 0;
    .icon {
      margin-right: 0.5rem;
    }
    p {
      margin: 0;
    }
  }
  .attachments {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .section {
    font-weight: bold;
    text-align: center;
    font-size: 1.5rem;
    margin: 3rem 1rem 1rem;
  }
  .content {
    overflow: hidden;
    border-radius: 0.5rem;
    margin-top: 1rem;
    img {
      display: block;
      pointer-events: none;
      user-select: none;
      width: 100%;
    }
  }
  .embedded {
    position: relative;
    padding-top: 56.25%;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .music,
  .video {
    width: 100%;
  }
  .mediaC {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  video {
    width: 100%;
  }
  .controls {
    padding: 2rem 1rem;
    font-size: 0.875rem;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  .prodInfo {
    .desc {
      margin: -1rem 0 0;
    }
  }
  .price {
    margin: 2rem 0 0;
    font-size: 1.25rem;
    font-weight: bold;
  }
  .label {
    display: inline-block;
    font-size: 1rem;
    margin-top: 1rem;
    border-radius: 5rem;
    letter-spacing: 1px;
    padding: 0.75rem 1.5rem;
    p {
      margin: 0;
    }
  }
  .title {
    font-size: 1.125rem;
    font-weight: bold;
    margin: 0 0 0.5rem;
  }
  .mediaInfo {
    margin: 0;
  }
  .pCtrl,
  .docDl {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .docDl {
    display: flex;
  }
  .seekBar {
    width: 100%;
    height: 0.5rem;
    margin-top: 2rem;
    border-radius: 5rem;
    background: #adb5bd;
    appearance: none;
    cursor: pointer;
  }
  .playPause,
  .dlBtn {
    margin: 2rem 0.5rem 0;
    padding: 0.75rem;
    border-radius: 5rem;
    line-height: 0;
    cursor: pointer;
  }
  .pause {
    display: none;
  }
  footer {
    padding: 2.5rem 1.5rem 2rem;
    font-size: 0.75rem;
    a {
      text-decoration: underline;
      color: inherit;
    }
  }
}
</style>
