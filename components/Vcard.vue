<template>
  <pre v-show="false" ref="vCard">
BEGIN:VCARD
VERSION:3.0
N:{{ vCard.FN }};;;;
FN:{{ vCard.FN }}
ORG:{{ vCard.ORG }}
TITLE:{{ vCard.TITLE }}
TEL;TYPE=CELL:{{ vCard.CELL }}
TEL;TYPE=WORK:{{ vCard.WORK }}
TEL;TYPE=HOME:{{ vCard.HOME }}
EMAIL;TYPE=WORK:{{ vCard.EMAIL }}
URL:{{ vCard.URL }}
KEY;TYPE=PGP;ENCODING=b:{{ vCard.KEY }}
PHOTO;TYPE={{ vCard.PHOTO.type }};ENCODING=b:{{ vCard.PHOTO.data }}
UID:{{ vCard.UID }}
END:VCARD</pre
  >
</template>

<script>
export default {
  props: ['vCard'],
}
</script>
