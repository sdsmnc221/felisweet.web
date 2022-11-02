import moduleLogoAdapter from '../utils/adapters/moduleLogo'

export const state = () => ({
  footer: null,
  header: {
    showLogo: false,
  },
  page: {
    displayPopup: false,
    popupContent: '',
  },
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
  OPEN_POPUP(state, popupContent) {
    state.page.displayPopup = true
    state.page.popupContent = popupContent
  },
  CLOSE_POPUP(state) {
    state.page.displayPopup = false
    state.page.popupContent = ''
  },
  SET_ERROR(state, error) {
    state.footer = error
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
  openPopup({ commit }, popupContent) {
    commit('OPEN_POPUP', popupContent)
  },
  closePopup({ commit }) {
    commit('CLOSE_POPUP')
  },
}
