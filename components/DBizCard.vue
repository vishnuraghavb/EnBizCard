<template>
  <div
    id="device-viewport"
    class="rounded-b-lg overflow-y-scroll max-hd sm:max-hm"
  >
    <html
      ref="html"
      lang="en"
      :style="{ backgroundColor: `${colors.logoBg.color}` }"
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta v-if="!PreviewMode" name="robots" content="noindex, nofollow" />
        <meta name="author" content="Digital Business Card Generator" />
        <meta name="url" content="https://dbizcard.vercel.app/" />
        <meta name="designer" content="Vishnu Raghav B" />
        <script>
          'http' == window.location.href.substr(0, 4) &&
            '/' != window.location.href.slice(-1) &&
            window.location.replace(window.location.href + '/')
        </script>
        <link v-if="!PreviewMode" rel="stylesheet" href="./style.min.css" />
        <title>{{ businessInfo.name }}'s Digital Business Card</title>
        <style>
          input[type='range']::-moz-range-track {
            background: none;
          }
          input[type='range']::-moz-range-thumb {
            -moz-appearance: none;
            width: 3rem;
            height: 3rem;
            border-radius: 100%;
            border: none;
            background: {{colors.buttonBg.color}};
            z-index: 3;
            cursor: pointer;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 3rem;
            height: 3rem;
            border-radius: 100%;
            border: none;
            background: {{colors.buttonBg.color}};
            z-index: 3;
            cursor: pointer;
          }
          .action{
            color:#fff;
            {{hasLightBG('buttonBg') ? 'filter:invert(1)' : null}}
          }

          .shareAction{
            {{hasLightBG('logoBg') ? 'filter:invert(1)' : null}}
          }
          .card{
            {{hasLightBG('cardBg') ? null : 'filter:invert(1)'}}
          }
          .text{
            {{hasLightBG('mainBg') ? null : 'filter:invert(1)'}}
          }
        </style>
      </head>
      <body>
        <div 
          id="shareContainer"
          ref="shareContainer"
          :style="`backgroundColor: ${colors.mainBg.color}; visibility: hidden; top: 2rem; opacity: 0;`"
        >
          <div id="closeBtnContainer">
            <a id="closeBtn" @click="closePublicKey()" class="text">
              <div
                class="icon"
                v-html="require(`~/assets/icons/remove.svg?include`)"
              ></div>
            </a>
          </div>
          <div id="shareContent">
            <div id="pubKeyInfo">
              <p class="text">
                You can download my public key and use it to send me encrypted
                messages
              </p>
              <a
                :href="
                  PreviewMode ? '' : `${businessInfo.name}'s public key.asc`
                "
                download
                target="_blank"
                id="downloadKey"
                @click.prevent.capture="downloadKey()"
                :style="{
                  backgroundColor: `${colors.buttonBg.color}`,
                }"
                ><div
                  class="icon action"
                  v-html="require(`~/assets/icons/download.svg?include`)"
                ></div
              ><span class="action">Download</span></a>
            </div>
            <div id="copyURL" ref="copyURL">
              <p class="text">
                You can copy my Business Card URL and share it via any medium
              </p>
              <a
                id="copyShareURL"
                :style="{
                  backgroundColor: `${colors.buttonBg.color}`,
                }"
                ><div
                  class="icon action"
                  v-html="require(`~/assets/icons/copy.svg?include`)"
                ></div
              ><span class="action">Copy URL</span></a>
            </div>
            <div id="displayQRCode" ref="displayQRCode">
              <div id="qrcode"></div>
              <h2 class="text">
                Scan this QR Code
              </h2>
              <p class="text">
                to view my Business Card
              </p>
            </div>
          </div>
        </div>
        <header>
          <img
            id="logo"
            v-if="images.logo.url"
            :src="
              PreviewMode ? images.logo.url : `./logo.${images.logo.format}`
            "
            alt="Logo"
          />
          <div id="actions" :style="{ display: PreviewMode ? 'flex' : 'none' }">
            <div id="shareActions">
              <a
                id="share"
                @click.prevent.capture="sharingAlert()"
              >
                <div
                  class="icon shareAction"
                  v-html="require(`~/assets/icons/share.svg?include`)"
                ></div>
              </a>
              <a
                id="showQRCode"
                @click.prevent.capture="sharingAlert()"
                ><div
                  class="icon shareAction"
                  v-html="require(`~/assets/icons/qrcode.svg?include`)"
                ></div>
              </a>
            </div>
            <a
              v-if="pubKeyIsValid"
              id="showPubKey"
              @click.prevent.capture="showPubKey()"
              ><div
                class="icon shareAction"
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
                PreviewMode
                  ? images.photo.url
                  : `./photo.${images.photo.format}`
              "
              alt="Photo"
            />

            <div id="profileInfo">
              <p class="name text">
                {{ businessInfo.name }}
              </p>
              <p class="jobtitle text">
                {{ businessInfo.jobTitle }}
              </p>
            </div>
          </div>
          <p class="bizDescription text" v-if="businessInfo.businessDescription">{{ businessInfo.businessDescription }}
          </p>
          <div id="contactBtns">
            <div
              v-if="primaryActions.length"
              class="contactBtnContainer"
              v-for="item in primaryActions"
            >
              <div class="contactBtn">
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
                    v-html="require(`~/assets/icons/${item.name}.svg?include`)"
                  ></div>
                </a>
                <p class="text">
                  {{
                    item.name.substr(0, 1).toUpperCase() + item.name.slice(1)
                  }}
                </p>
              </div>
            </div>
            <div id="ctaContainer">
              <a
              id="downloadVcard"
              :href="PreviewMode ? '' : `${username}.vcf`"
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
              <p class="action">
                Add to Contacts
              </p>
            </a>
            </div>
          </div>
          <div id="socialBtns">
            <div class="socialBtnContainer" v-for="item in socialLinks">
              <div class="socialBtn">
                <a
                  :href="item.value"
                  target="_blank"
                  rel="noopener noreferrer"
                  :style="{ backgroundColor: item.color }"
                  :aria-label="item.name"
                >
                  <div
                    class="icon"
                    v-html="require(`~/assets/icons/${item.name}.svg?include`)"
                  ></div>
                </a>
              </div>
            </div>
          </div>
          <div id="featuredContent">
            <div class="images" v-for="(image, index) in featured.images" :style="{ backgroundColor: `${colors.cardBg.color}` }">
              <img
                v-if="image.dataURI"
                :src="
                  PreviewMode
                    ? image.dataURI
                    : `./featured/image-${index}.${image.format}`
                "
                alt="Product image"
              />
              <div class="infoControls">
                <p class="title card">
                  {{ image.title }}
                </p>
              </div>
            </div>
            <div class="music" v-for="(music, index) in featured.music" :style="{ backgroundColor: `${colors.cardBg.color}` }">
              <MediaPlayer
                ref="mediaPlayer"
                :media="music"
                type="music"
                :colors="colors"
                :index="index"
                :togglePlay="togglePlay"
                :PreviewMode="PreviewMode"
              />
            </div>
            <div class="video" v-for="(video, index) in featured.videos" :style="{ backgroundColor: `${colors.cardBg.color}` }">
              <MediaPlayer
                ref="mediaPlayer"
                :media="video"
                type="videos"
                :colors="colors"
                :index="index"
                :togglePlay="togglePlay"
                :PreviewMode="PreviewMode"
              />
            </div>
            <div
              class="document"
              v-for="(document, index) in featured.documents" :style="{ backgroundColor: `${colors.cardBg.color}` }"
            >
              <DocumentDownloader
                :media="document"
                type="documents"
                :colors="colors"
                :index="index"
                :PreviewMode="PreviewMode"
              />
            </div>
          </div>
        </main>
        <footer v-if="footerCredit" :style="{ backgroundColor: `${colors.mainBg.color}` }">
          <div class="text">
            Created with
            <a
              href="https://dbizcard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              >Digital Business Card Generator</a
            >
          </div>
        </footer>
        <script v-if="!PreviewMode" src="./qrcode.min.js"></script>
        <script v-if="!PreviewMode">
          let sC=document.getElementById("shareContainer"),cBtn=document.getElementById("closeBtn"),cURL=document.getElementById("copyURL"),cSURL=document.getElementById("copyShareURL"),dQR=document.getElementById("displayQRCode"),qrc=document.getElementById("qrcode"),s=document.getElementById("share"),sQRC=document.getElementById("showQRCode"),pKI=document.getElementById("pubKeyInfo"),sPK=document.getElementById("showPubKey");function tC(e){"2rem"==e.style.top?(e.style.visibility="visible",e.style.top="0px",e.style.opacity=1):(e.style.top="2rem",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},200))}function dN(e){e.style.display="none"}window.addEventListener("load",()=>{document.querySelector("#actions").style.display="flex",qrc.innerHTML=new QRCode({content:window.location.href,container:"svg-viewbox",join:!0,ecl:"L",padding:0}).svg()}),navigator.canShare?s.addEventListener("click",()=>{navigator.share({title:document.title,text:"You can view my Digital Business Card here:",url:window.location.href})}):s.addEventListener("click",()=>{tC(sC),cURL.style.display="flex",dN(dQR),pKI&&dN(pKI)}),sQRC.addEventListener("click",()=>{tC(sC),dQR.style.display="block",dN(cURL),pKI&&dN(pKI)}),sPK&&sPK.addEventListener("click",()=>{tC(sC),pKI&&(pKI.style.display="flex"),dN(cURL),dN(dQR)}),cBtn.addEventListener("click",()=>tC(sC)),cSURL.addEventListener("click",async()=>{let e=cSURL.querySelectorAll(".action")[1];await navigator.clipboard.writeText(window.location.href).then(t=>{e.innerText="Copied",setTimeout(()=>{e.innerText="Copy URL"},1e3)})});
        </script>
        <script
          v-if="
            !PreviewMode && (featured.music.length || featured.videos.length)
          "
        >
          let pC=document.querySelectorAll(".playerControl"),pP=document.querySelectorAll(".playPause"),srcs=document.querySelectorAll(".source");srcs.forEach(e=>{e.style.pointerEvents="none",e.removeAttribute("controls")}),pC.forEach((e,l)=>{e.style.display="flex";let r=e.querySelector(".currentTime"),s=e.querySelector(".seekBar"),t=e.querySelector(".playPause"),a=t.querySelector(".play"),o=t.querySelector(".pause");srcs[l].addEventListener("timeupdate",()=>{let e=srcs[l].currentTime,t=100/srcs[l].duration*e;s.value=t,100==t&&(s.value=0,a.style.display="block",o.style.display="none");let c=Math.floor(e/60),y=Math.floor(e%60);c.toString().length<2&&(c="0"+c),y.toString().length<2&&(y="0"+y),r.value=c+":"+y}),s.addEventListener("change",()=>{srcs[l].currentTime=srcs[l].duration*(parseInt(s.value)/100)}),t.addEventListener("click",()=>{srcs[l].paused?(srcs.forEach((e,r)=>{l!=r&&(e.paused||e.pause())}),pP.forEach((e,l)=>{let r=e.querySelector(".play"),s=e.querySelector(".pause");r.style.display="block",s.style.display="none"}),srcs[l].play(),a.style.display="none",o.style.display="block"):(srcs[l].pause(),o.style.display="none",a.style.display="block")})});
        </script>
      </body>
    </html>
  </div>
</template>

<script>
import MediaPlayer from './MediaPlayer'
import DocumentDownloader from './DocumentDownloader'
export default {
  props: [
    'username',
    'businessInfo',
    'images',
    'featured',
    'colors',
    'primaryActions',
    'socialLinks',
    'PreviewMode',
    'downloadVcard',
    'downloadKey',
    'footerCredit',
    'showAlert',
    'hasLightBG',
    'publicKey',
    'pubKeyIsValid',
  ],
  components: {
    MediaPlayer,
    DocumentDownloader,
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
  },
  methods: {
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
    showPubKey() {
      let shareContainer = this.$refs.shareContainer
      let copyURL = this.$refs.copyURL
      let displayQRCode = this.$refs.displayQRCode
      this.toggleContainer(shareContainer)
      copyURL.style.display = displayQRCode.style.display = 'none'
    },
    closePublicKey() {
      this.toggleContainer(shareContainer)
    },
    sharingAlert() {
      this.showAlert(
        'You are able to share your business card after completing the hosting process\n\nCheck out the <a class="underline hover:text-green-600 transition-colors duration-200"  href="https://dbizcard.vercel.app/demo/"  target="_blank" rel="noopener noreferrer">demo</a> to test the functionality.'
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
  mounted() {},
}
</script>
<style lang="scss">
#device-viewport {
  body {
    margin: 0 auto;
    width: 100%;
    padding: 0;
    max-width: 30rem;
    color: #000;
    font-family: sans-serif;
    position: relative;
  }
  #shareContainer {
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 0;
    transition: top 0.2s ease-out, opacity 0.1s ease-out;
    transform: translateZ(0);
  }
  #closeBtnContainer {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 1rem 0 0;
  }
  #closeBtn {
    padding: 0.75rem;
    cursor: pointer;
    line-height: 0;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  #shareContent,
  #copyURL,
  #displayQRCode,
  #pubKeyInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #copyURL,
  #pubKeyInfo {
    p {
      margin: 2rem 2em 0;
      line-height: 1.5;
      text-align: center;
    }
  }
  #copyShareURL,
  #downloadKey {
    display: inline-flex;
    align-items: center;
    border-radius: 5rem;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    span {
      margin-left: 0.5rem;
    }
  }
  #displayQRCode {
    text-align: center;
    width: 100%;
    h2,
    p {
      padding: 0 2rem;
    }
    h2 {
      font-weight: 700;
      font-size: 1.5rem;
      margin: 0;
    }
    p {
      margin-top: 0.5rem;
    }
  }
  #qrcode {
    margin: 2rem;
    padding: 2rem;
    background: #fff;
    border-radius: 1.5rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 6rem 3rem 4rem;
    box-sizing: border-box;
  }
  #logo {
    max-height: 6rem;
    text-align: center;
    color: gray;
    pointer-events: none;
    user-select: none;
  }
  #actions {
    flex-direction: row-reverse;
    justify-content: space-between;
    position: absolute;
    left: 1rem;
    right: 0;
    top: 1rem;
    a {
      padding: 0.75rem;
      cursor: pointer;
      border-radius: 100%;
      line-height: 0;
      margin-right: 1rem;
    }
  }
  #shareActions {
    display: flex;
  }
  main {
    border-radius: 1.5rem 1.5rem 0 0;
    padding: 1.5rem;
  }
  #profile {
    display: flex;
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 100%;
      margin-right: 0.75rem;
      text-align: center;
      align-self: flex-start;
      pointer-events: none;
      user-select: none;
    }
  }
  #profileInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.25;
    word-break: break-word;
  }
  .name {
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0;
  }
  .jobtitle {
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }

  .bizDescription {
    color: #212529;
    font-size: 0.875rem;
    white-space: pre-line;
    line-height: 1.5;
    margin-top: 1rem;
  }
  #contactBtns,
  #socialBtns {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .contactBtnContainer,
  .socialBtnContainer {
    width: 33.33%;
  }
  .contactBtn,
  .socialBtn {
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
a{
  text-decoration: none;
  user-select: none;
}
 a:not(#closeBtn){
    box-shadow: 0 1px 4px -1px rgba(#000, 0.2);
      &:hover,&:focus{
        box-shadow:none;
      }
  }
  #ctaContainer{
    display: flex;
    justify-content: center;
    width: 100%;

  }
  #downloadVcard {
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
  #socialBtns {
    margin-top: 1.25rem;
  }
  .socialBtn {
    padding: 1rem;
  }
  #featuredContent {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .images,
  .music,
  .video,
  .document {
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

  .music,
  .video {
    width: 100%;
  }
  .mediaPlayerContainer,
  .documentContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  video {
    width: 100%;
  }
  .infoControls {
    padding: 1rem 2rem 2rem;
    font-size: 0.75rem;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  .title {
    font-size: 1rem;
    font-weight: 700;
  }
  .artistAlbum,
  .fileSize {
    margin-top: 0.25rem;
  }
  .playerControl,
  .downloadDocument {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .downloadDocument {
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
  .downloadBtn {
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
    padding: 1.5rem 1.5rem 2rem;
    div {
      margin-top: 1rem;
      font-size: 0.75rem;
      text-align: center;
      color: #000;
      a {
        text-decoration: underline;
        color: #000;
      }
    }
  }
}
</style>
