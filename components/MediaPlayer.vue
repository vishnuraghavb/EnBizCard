<template>
  <div class="mediaC">
    <video
      v-show="type == 'video'"
      controlsList="nodownload nofullscreen noremoteplayback"
      @timeupdate="updateSeek()"
      disablePictureInPicture
      ref="mediaSource"
      class="source"
      :style="{ pointerEvents: PreviewMode ? 'none' : 'auto' }"
      :controls="!PreviewMode"
      preload="metadata"
    >
      <source
        :src="
          PreviewMode
            ? media.dataURI + '#t=0.2'
            : `./media/${getTitle(media.title)}.${media.ext}`
        "
      />
    </video>
    <img
      v-if="type == 'music' && media.coverDataURI"
      :src="
        PreviewMode
          ? media.coverDataURI
          : `./media/${getTitle(media.title)}.${media.coverExt}`
      "
      alt="cover"
    />
    <div class="controls">
      <p class="title card">
        {{ media.title }}
      </p>
      <p class="mediaInfo card" v-if="media.artist">
        <span>{{ media.artist }}</span>
        <span v-if="media.album"> - {{ media.album }}</span>
      </p>
      <div
        class="pCtrl"
        ref="pCtrl"
        :style="{ display: PreviewMode ? 'flex' : 'none' }"
      >
        <output class="currentTime card" ref="bubble">00:00</output>
        <input
          class="seekBar"
          @change="setProgress($event)"
          ref="seekbar"
          type="range"
          value="0"
        />
        <a
          class="playPause"
          :style="{
            backgroundColor: `${colors.buttonBg.color}`,
          }"
          @click="togglePlay($refs.mediaSource)"
        >
          <div
            class="icon play action"
            ref="play"
            v-html="require(`~/assets/icons/play.svg?include`)"
          ></div>
          <div
            class="icon pause action"
            ref="pause"
            v-html="require(`~/assets/icons/stop.svg?include`)"
          ></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['media', 'type', 'colors', 'PreviewMode', 'togglePlay'],
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
    setProgress(e) {
      let mediaSource = this.$refs.mediaSource
      let time = mediaSource.duration * (e.target.value / 100)
      mediaSource.currentTime = time
    },
    updateSeek() {
      let mediaSource = this.$refs.mediaSource
      let timenow = mediaSource.currentTime
      let seekbar = this.$refs.seekbar
      let bubble = this.$refs.bubble
      let value = (100 / mediaSource.duration) * timenow
      seekbar.value = value

      let m = Math.floor(timenow / 60)
      let s = Math.floor(timenow % 60)
      if (m.toString().length < 2) {
        m = '0' + m
      }
      if (s.toString().length < 2) {
        s = '0' + s
      }
      bubble.value = m + ':' + s

      if (value == 100) {
        this.isPlaying = false
        seekbar.value = 0
        this.$refs.play.style.display = 'block'
        this.$refs.pause.style.display = 'none'
      }
    },
  },
  mounted() {
    this.$refs.pCtrl.style.display = 'flex'
  },
}
</script>
