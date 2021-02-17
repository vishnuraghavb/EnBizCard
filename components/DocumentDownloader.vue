<template>
  <div class="mediaC">
    <div>
      <img
        :src="
          PreviewMode
            ? media.coverDataURI
            : `./media/${getTitle(media.title)}.${media.coverExt}`
        "
        :alt="media.title"
      />
    </div>
    <div class="controls">
      <p class="title card">
        {{ media.title }}
      </p>
      <p class="mediaInfo card">PDF - {{ media.filesize }}</p>
      <div class="docDl">
        <a
          class="dlBtn"
          @click.prevent="downloadDocument()"
          :style="{
            backgroundColor: `${colors.buttonBg.color}`,
          }"
          :href="
            PreviewMode ? '' : `./media/${getTitle(media.title)}.${media.ext}`
          "
          download
          target="_blank"
        >
          <div
            class="icon action"
            v-html="require(`~/assets/icons/download.svg?include`)"
          ></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
export default {
  props: ['media', 'type', 'colors', 'PreviewMode'],
  methods: {
    getTitle(e) {
      return e.toLowerCase().split(' ').join('_')
    },
    downloadDocument() {
      saveAs(
        window.URL.createObjectURL(this.media.file),
        `${this.media.title}.pdf`
      )
    },
  },
}
</script>
