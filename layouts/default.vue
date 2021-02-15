<template>
  <div class="bg-gray-900">
    <Nuxt />
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Nunito';
  src: url('~static/nunito.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
@font-face {
  font-family: 'Nunito';
  src: url('~static/nunito-extrabold.woff2') format('woff2');
  font-display: swap;
  font-weight: 800;
}
html {
  font-family: 'Nunito', sans-serif;
  background: #2d3748;
  font-weight: 400;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.drop-enter-active,
.drop-leave-active {
  transition: transform 0.2s ease;
}

.drop-enter,
.drop-leave-to {
  transform: translateY(-100%);
}
.fade-enter-active,
.fade-leave-active {
  backface-visibility: hidden;
  transition: transform 0.4s ease, opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
