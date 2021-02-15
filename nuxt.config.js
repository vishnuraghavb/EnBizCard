export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
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
    ogTitle: 'EnBizCard - An Open-Source Digital Business Card Generator',
    ogDescription:
      'EnBizCard helps you create beautiful, responsive HTML-based digital business cards that can be hosted on your website.',
    ogSiteName: 'EnBizCard - An Open-Source Digital Business Card Generator',
    theme_color: '#111827',
    author: 'Vishnu Raghav',
    lang: 'en',
    name: 'EnBizCard - An Open-Source Digital Business Card Generator',
  },
  head: {
    title: 'EnBizCard - An Open-Source Digital Business Card Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'EnBizCard helps you create beautiful, responsive HTML-based digital business cards that can be hosted on your website.',
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        property: 'msapplication-TileColor',
        content: '#111827',
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
        href: '/favicon.ico?v=2',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        color: '#111827',
        href: '/safari-pinned-tab.svg',
      },
    ],
    script: [{ src: '/qrcode.min.js' }],
  },
  manifest: {
    name: 'EnBizCard - An Open-Source Digital Business Card Generator',
    short_name: 'EnBizCard',
    start_url: '/',
    display: 'standalone',
    theme_color: '#111827',
    background_color: '#111827',
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
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.min.css|\.min.js$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
        exclude: /(node_modules)/,
      })
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        html5: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortClassName: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
  },
  generate: {
    dir: 'public',
    fallback: true,
  },
  robots: {
    UserAgent: '*',
  },
}
