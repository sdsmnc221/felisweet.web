<template>
  <div @scroll.passive="handleScroll">
    <site-header v-bind="header" />
    <nuxt-child
      :open-popup="openPopup"
      :popup-content-planning="popupContentHTML.planning"
    />
    <Transition name="fade" mode="out-in">
      <pop-up v-if="displayPopup" :open="openPopup" :close="closePopup">
        <template #content>
          <div class="popup-content" v-html="popupContent" />
        </template>
      </pop-up>
    </Transition>
    <site-footer
      :open-popup="openPopup"
      :popup-content-credits="popupContentHTML.credits"
      :popup-content-mentions="popupContentHTML.mentions"
    />
  </div>
</template>

<script>
import SiteFooter from '../components/organisms/SiteFooter'
import SiteHeader from '../components/organisms/SiteHeader'
import PopUp from '../components/molecules/PopUp'

export default {
  components: { SiteFooter, SiteHeader, PopUp },
  data() {
    return {
      header: {
        showLogo: false,
      },
      displayPopup: false,
      popupContent: '',
      popupContentHTML: {
        credits: `<h2>Crédits</h2>`,
        mentions: `<h2>Mentions légales</h2>`,
        planning: `<iframe src="https://calendar.google.com/calendar/embed?src=mb.siruguet%40felisweet.com&ctz=Europe%2FParis" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>`,
      },
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      // console.log(e)
    },
    openPopup(content) {
      this.displayPopup = true
      this.popupContent = content
    },
    closePopup() {
      this.displayPopup = false
      this.popupContent = ''
    },
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.64s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
