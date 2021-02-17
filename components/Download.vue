<template>
  <div id="downloadSection" class="mt-16">
    <h2 class="font-extrabold text-2xl">Download</h2>
    <div class="stepC mt-6">
      <p>Please complete the checklist to proceed,</p>
      <Check
        v-for="(item, index) in downloadCheckList"
        :downloadCheckList="downloadCheckList"
        :item="item"
        :key="index"
        :index="index"
      />
      <button
        ref="downloadPackage"
        @click="downloadPackage"
        class="inline-block bg-gray-700 leading-none text-2xl tracking-wide border-2 border-transparent font-extrabold p-6 rounded mt-12 select-none transition-colors duration-200 focus:outline-none"
        :title="
          downloadChecked
            ? ''
            : 'Complete the checklist to download the package'
        "
        :class="
          downloadChecked
            ? 'bg-green-600 cursor-pointer text-white focus:bg-green-500 hover:bg-green-500'
            : 'cursor-not-allowed text-black'
        "
      >
        Download as ZIP
      </button>
      <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
        Extract the downloaded ZIP file and follow the
        <NuxtLink
          to="/hosting-guide"
          class="cursor-pointer underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
          >Hosting&nbsp;Guide</NuxtLink
        >
        to get your digital business card online.
        <br /><br />
        If you find this service valuable to you or your business, please
        consider donating.
        <br /><a
          class="inline-block font-extrabold tracking-wide leading-none flex-shrink-0 p-3 text-white bg-gray-700 rounded hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 mt-4"
          href="https://www.vishnuraghav.com/donate/"
          rel="noreferrer"
          target="_blank"
          >Donate</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import Check from '@/components/Check'
export default {
  props: ['downloadCheckList', 'downloadChecked', 'downloadPackage'],
  components: {
    Check,
  },
}
</script>