<template>
  <div class="documentContainer">
    <div class="documentPreview">
      <img
        :src="
          PreviewMode
            ? media.coverDataURI
            : `./featured/${getTitle(media.title)}.${media.coverFormat}`
        "
        :alt="media.title"
      />
    </div>
    <div class="infoControls">
      <p class="title card">
        {{ media.title }}
      </p>
      <p class="fileSize card">PDF - {{ media.filesize }}</p>
      <div class="downloadDocument">
        <a
          class="downloadBtn"
          @click.prevent="downloadDocument()"
          :style="{
            backgroundColor: `${colors.buttonBg.color}`,
          }"
          :href="
            PreviewMode
              ? ''
              : `./featured/${getTitle(media.title)}.${media.format}`
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
