<template>
  <div class="bg-gray-900">
    <Nuxt />
  </div>
</template>
<script>
export default {
  transition: 'page',
}
</script>

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

.stepC {
  margin-left: 0;
  margin-right: 0;
}
#device {
  border-radius: 1rem;
  width: 100%;
}
.max-hd {
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-height: 100vh;
}
.max-hd::-webkit-scrollbar {
  display: none;
}
.theme-one {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.theme-one::-webkit-scrollbar {
  display: none;
}
.footer {
  display: flex;
}
.stepC.actions {
  display: grid;
  grid-gap: 1.5rem;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(3rem, auto));
}
.ghost {
  opacity: 0.5;
}
.toggle-switch {
  left: 0;
  transition: left 0.2s ease;
  &:checked {
    left: calc(100% - 3rem);
  }
}

// Responsive
@media (min-width: 640px) {
  .stepC {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
@media (min-width: 768px) {
  .max-hd {
    max-height: 38rem;
  }
}

// Transitions
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
.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s ease;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.list-enter-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.list-enter {
  transform: translateY(0.5rem);
  opacity: 0;
}
</style>
