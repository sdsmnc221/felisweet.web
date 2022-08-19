export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      'Felisweet Marie-Bénédicte Siruguet - Comportementaliste et Cat-sitter autour de Sainte-Geneviève-des-Bois',
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
          'FeliSweet, Comportementaliste, Félin, Cat-sitting, Cat sitting, Sainte-Geneviève-des-Bois, Sainte Geneviève des Bois, Ile de France, Chat, Chats, Marie Bénédicte Siruguet, Comportementalisme',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['styles/global.scss'],

  styleResources: {
    scss: ['styles/variables.scss', 'styles/mixins.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/gsap.js'],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "gsap"
    ]
  },
}
