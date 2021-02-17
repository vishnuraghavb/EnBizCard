<template>
  <div class="checklistItem mt-6 mx-2 flex items-center">
    <div class="relative" style="line-height: 0">
      <input
        v-model="downloadCheckList[index].checked"
        class="checkbox cursor-pointer appearance-none h-12 w-12 border-gray-700 rounded border-4 transition-colors duration-200 checked:bg-green-600 checked:border-green-600 focus:outline-none"
        :class="
          downloadCheckList[index].checked
            ? 'hover:border-transparent focus:border-transparent hover:bg-green-500 focus:bg-green-500'
            : 'hover:border-gray-600 focus:border-gray-600'
        "
        type="checkbox"
        :id="'check' + index"
        aria-label="checkbox"
      />
      <img
        alt="checkmark"
        src="~/assets/icons/check.svg"
        class="absolute top-0 left-0 m-3 z-10 pointer-events-none select-none transition-opacity duration-200"
        :class="item.checked ? 'opacity-100' : 'opacity-20'"
      />
    </div>
    <p class="ml-3">{{ item.label }}</p>
  </div>
</template>

<script>
export default {
  props: ['downloadCheckList', 'item', 'index'],
}
</script>
