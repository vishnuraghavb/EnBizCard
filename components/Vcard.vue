<template>
<pre v-show="false" ref="vCard">
BEGIN:VCARD
VERSION:3.0
N:{{ vCard.FN }};;;;
FN:{{ vCard.FN }}
ORG:{{ vCard.ORG }}
TITLE:{{ vCard.TITLE }}
TEL;TYPE=work,pref:{{ vCard.TEL1 }}
TEL;TYPE=work:{{ vCard.TEL2 }}
EMAIL;TYPE=work:{{ vCard.EMAIL }}
URL:{{ vCard.URL }}
KEY:OPENPGP4FPR:{{ vCard.KEY }}
UID:{{ vCard.UID }}
END:VCARD</pre>
</template>

<script>
export default {
  props: [ 'vCard' ],
}
</script>
