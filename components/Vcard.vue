<template>
  <pre v-show="false" ref="vCard">
BEGIN:VCARD
VERSION:3.0
N:{{ vCard.fn }};;;;
FN:{{ vCard.fn }}
ORG:{{ vCard.org }}
TITLE:{{ vCard.title }}
TEL;TYPE=CELL:{{ vCard.cell }}
TEL;TYPE=WORK:{{ vCard.work }}
TEL;TYPE=HOME:{{ vCard.home }}
TEL;TYPE=MSG:{{ vCard.sms }}
TEL;TYPE=SIGNAL:{{ vCard.signal }}
EMAIL;TYPE=WORK:{{ vCard.email }}
URL;TYPE=Digital Business Card:{{ vCard.hostedURL }}
URL:{{ vCard.website }}
{{ getURLs }}
KEY;TYPE=PGP;ENCODING=b:{{ vCard.key }}
NOTE:{{ vCard.note }}
UID:{{ vCard.uid }}
END:VCARD</pre
  >
</template>

<script>
export default {
  props: ['vCard'],
  computed: {
    getURLs() {
      return this.vCard.urls
        .map((e) => `URL;TYPE=${e.title}:${e.url}`)
        .join('\n')
    },
  },
}
</script>
