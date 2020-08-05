export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  meta: {
    ogType: 'website',
    ogImage: '/maskable_512.png',
    // ogUrl: false,
    ogTitle: 'Digital Business Card Generator - Free & Open-Source',
    ogDescription:
      'Quickly generate an interactive and responsive HTML-based digital business card, that can be hosted with your website.',
    ogSiteName: 'Digital Business Card Generator - Free & Open-Source',
    theme_color: '#38A169',
    author: 'Vishnu Raghav',
    lang: 'en',
    name: 'Digital Business Card Generator - Free & Open-Source',
  },
  head: {
    title: 'Digital Business Card Generator - Free & Open-Source',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Quickly generate an interactive and responsive HTML-based digital business card, that can be hosted with your website.',
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        property: 'msapplication-TileColor',
        content: '#38A169',
      },
      {
        hid: 'msapplication-TileImage',
        name: 'msapplication-TileImage',
        property: 'msapplication-TileImage',
        content: '/mstile-150x150.png',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        color: '#38A169',
        href: '/safari-pinned-tab.svg',
      },
    ],
    script: [{src:'/qrcode.min.js'}],
  },
  manifest: {
    name: 'Digital Business Card Generator - Free & Open-Source',
    short_name: 'Digital Business Card Generator',
    start_url: '/',
    display: 'standalone',
    theme_color: '#38A169',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/icon_64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/maskable_64.png',
        sizes: '64x64',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: '/maskable_120.png',
        sizes: '120x120',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/maskable_144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/maskable_152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/maskable_192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/maskable_384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/maskable_512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
  loading: false,
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@aceforth/nuxt-optimized-images',
  ],
  optimizedImages: {
    inlineImageLimit: 1000,
    imagesName: ({ isDev }) =>
      isDev
        ? '[path][name][hash:optimized].[ext]'
        : 'img/[contenthash:7].[ext]',
    responsiveImagesName: ({ isDev }) =>
      isDev
        ? '[path][name]--[width][hash:optimized].[ext]'
        : 'img/[contenthash:7]-[width].[ext]',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: true,
    defaultImageLoader: 'img-loader',
    svgo: {
      // enable/disable svgo plugins here
    },
  },
  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/pwa', { icon: false }], '@nuxtjs/robots'],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: {
    dir: 'public',
    fallback: true,
  },
  robots: {
    UserAgent: '*',
  },
  // router: {
  //   base: '/digital-business-card-generator/',
  // },
}
