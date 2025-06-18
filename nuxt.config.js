export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Server configuration for better Vercel compatibility
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `Comportementaliste & Cat-sitter à Sainte-Geneviève-des-Bois : %s`,
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Amoureuse des Félins, titulaire de l'ACACED et du certificat de comportementaliste félin en méthode positive, je serai heureuse de pouvoir m'occuper de vos loulous pendant votre absence. Jouer, manger, câlinés, bichonnés. SIREN 903 844 868",
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'FeliSweet, Comportementaliste, Félin, Cat-sitting, Cat sitting, Sainte-Geneviève-des-Bois, Sainte Geneviève des Bois, Ile de France, Chat, Chats, chats craintifs, Comportementalisme, Essone',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-NK1FV281C6',
        async: true,
      },
      {
        type: 'text/javascript',
        innerHTML:
          "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-NK1FV281C6');",
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['styles/global.scss'],

  styleResources: {
    scss: ['styles/variables.scss', 'styles/mixins.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/node-fetch-polyfill.js', mode: 'server' },
    '~/plugins/gsap.js',
    '~/plugins/inlinesvg.js',
    '~/plugins/prismic/enhanced-link-serializer',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@nuxtjs/prismic',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources'],

  // Prismic @nuxtjs/prismic configuration: https://prismic.nuxtjs.org/configuration
  prismic: {
    endpoint: `https://${process.env.PRISMIC_REPOSITORY}.prismic.io/api/v2`,
    preview: false,
    modern: true,
    apiOptions: {
      routes: [
        // Resolves the Homepage document to "/"
        {
          type: 'home_page',
          path: '/',
        },
      ],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap', '@prismicio/vue'],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },

  // Environment variables, prefered over env property: https://nuxtjs.org/tutorials/moving-from-nuxtjs-dotenv-to-runtime-config/#introducing-the-nuxtjs-runtime-config
  publicRuntimeConfig: {
    prismicRepository: process.env.PRISMIC_REPOSITORY,
    chachouBiblePassword: process.env.CHACHOU_BIBLE_PASSWORD,
    chachouBibleEmbed: process.env.CHACHOU_BIBLE_EMBED,
    projectLaPuce: process.env.PROJECT_LAPUCE,
  },
}
