<template>
  <div style="background-color: #2d3748;">
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
</style>
