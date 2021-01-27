<template>
  <div class="documentContainer">
    <div class="documentPreview">
      <img :src="PreviewMode?media.coverDataURI:`./featured/document-${index}.jpeg`" :alt="media.title" />
    </div>
    <div class="infoControls">
      <p class="title card">
        {{ media.title }}
      </p>
      <p class="fileSize card">
        PDF - {{ media.filesize }}
      </p>
      <div class="downloadDocument">
        <a
          class="downloadBtn"
          @click.prevent="downloadDocument()"
          :style="{
            backgroundColor: `${colors.buttonBg.color}`,
          }"
          :href="PreviewMode ? '' : `./featured/${media.title}.pdf`"
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
  props: ['media', 'type', 'index', 'colors', 'PreviewMode'],
  methods: {
    downloadDocument() {
      saveAs(
        window.URL.createObjectURL(this.media.file),
        `${this.media.title}.pdf`
      )
    },
  },
}
</script>
