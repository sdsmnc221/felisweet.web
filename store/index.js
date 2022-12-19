import moduleLogoAdapter from '../utils/adapters/moduleLogo'

export const state = () => ({
  footer: null,
  header: {
    showLogo: false,
  },
  page: {
    displayPopup: false,
    popupContent: '',
    popupType: '',
  },
  isMobile: false,
  isTablet: false,
  isLandscape: false,
  loading: true,
  percentLoaded: 0,
  resources: [],
})

export const getters = {
  getFooter(state) {
    return state.footer
  },
  getHeader(state) {
    return state.header
  },
  getLayout(state) {
    return state.page
  },
}

export const mutations = {
  SET_FOOTER(state, footer) {
    state.footer = footer
  },
  SET_FOOTER_LOGO(state, footerLogo) {
    state.footer.logo = footerLogo
  },
  OPEN_POPUP(state, { popupContent, popupType }) {
    state.page.displayPopup = true
    state.page.popupContent = popupContent
    state.page.popupType = popupType
  },
  CLOSE_POPUP(state) {
    state.page.displayPopup = false
    state.page.popupContent = ''
    state.page.popupType = ''
  },
  SET_ERROR(state, error) {
    state.footer = error
  },
  DETECT_MOBILE(state, { isMobile, isTablet }) {
    state.isMobile = isMobile
    state.isTablet = isTablet
  },
  DETECT_ORIENTATION(state, { isLandscape }) {
    state.isLandscape = isLandscape
  },
  SET_LOADING(state, { loading }) {
    state.loading = loading
  },
  PERCENT_LOADED(state, { percent }) {
    state.percentLoaded = percent
  },
  SET_RESOURCES(state, { resources }) {
    state.resources = [...state.resources, ...resources]
  },
  PLAY_SOUND(state, { name }) {
    state.resources.find((resource) => resource.name === name)?.play()
  },
  STOP_SOUND(state, { name }) {
    state.resources.find((resource) => resource.name === name)?.stop()
  },
}

export const actions = {
  async fetchFooter({ commit }, $prismic) {
    const footerData = (await $prismic.api.getSingle('site_footer')).data
    const footer = {
      labels: {
        credits: footerData.credits_cta_label,
        mentions: footerData.legal_mention_cta_label,
      },
      popupContentHTML: {
        credits: $prismic.asHTML(footerData.credits_content),
        mentions: $prismic.asHTML(footerData.legal_mention_content),
        planning: footerData.planning_iframe,
      },
      copyright: $prismic.asHTML(footerData.copyright_content),
      logo: footerData.module_logo,
    }

    commit('SET_FOOTER', footer)
  },
  async fetchFooterLogo({ commit }, logo, $prismic, $enhancedLinkSerializer) {
    const footerLogo = await moduleLogoAdapter(
      $prismic,
      $enhancedLinkSerializer,
      logo.id
    )

    commit('SET_FOOTER_LOGO', footerLogo)
  },
  openPopup({ commit }, { popupContent, popupType }) {
    commit('OPEN_POPUP', { popupContent, popupType })
  },
  closePopup({ commit }) {
    commit('CLOSE_POPUP')
  },
  detectMobile({ commit }, { navigator }) {
    commit('DETECT_MOBILE', {
      isMobile:
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
      isTablet:
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
          navigator.userAgent.toLowerCase()
        ),
    })
  },
  detectOrientation({ commit }, { innerWidth, innerHeight }) {
    commit('DETECT_ORIENTATION', {
      isLandscape: innerWidth > innerHeight,
    })
  },
  setLoading({ commit }, { loading }) {
    commit('SET_LOADING', { loading })
  },
  setPercentLoaded({ commit }, { percent }) {
    commit('PERCENT_LOADED', { percent })
  },
  setResources({ commit }, { resources }) {
    commit('SET_RESOURCES', { resources })
  },
  playSound({ commit }, { name }) {
    commit('PLAY_SOUND', { name })
  },
  stopSound({ commit }, { name }) {
    commit('STOP_SOUND', { name })
  },
}
