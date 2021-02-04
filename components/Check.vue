<template>
  <div class="checklistItem mt-6 flex items-center">
    <div class="relative" style="line-height: 0">
      <input
        v-model="downloadCheckList[index].checked"
        class="checkbox cursor-pointer appearance-none h-12 w-12 border-gray-500 rounded shadow hover:border-green-600 border-4 transition-colors duration-200"
        type="checkbox"
        :id="'check' + index"
      />
      <img
        v-if="item.checked"
        src="~/assets/icons/check.svg"
        class="absolute top-0 left-0 m-3 z-10 pointer-events-none select-none"
      />
    </div>
    <label class="ml-3" :for="'check' + index">{{ item.label }}</label>
  </div>
</template>

<script>
export default {
  props: ['downloadCheckList', 'item', 'index'],
}
</script>
