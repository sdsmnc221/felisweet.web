<template>
  <div>
    <transition v-if="!loading">
      <div @scroll.passive="handleScroll">
        <site-header v-bind="$store.state.header" />
        <nuxt-child
          :open-popup="openPopup"
          :popup-content-planning="
            $store.state.footer.popupContentHTML.planning
          "
        />
        <Transition name="fade" mode="out-in">
          <pop-up
            v-if="$store.state.page.displayPopup"
            :open="openPopup"
            :close="closePopup"
          >
            <template #content>
              <div
                class="popup-content"
                v-html="$store.state.page.popupContent"
              />
            </template>
          </pop-up>
        </Transition>
        <site-footer />
        <dot-cursor />
      </div>
    </transition>
    <transition name="fade">
      <page-loader v-if="loading" />
    </transition>
  </div>
</template>

<script>
import SiteFooter from '../components/organisms/SiteFooter'
import SiteHeader from '../components/organisms/SiteHeader'
import PopUp from '../components/molecules/PopUp'
import DotCursor from '../components/molecules/DotCursor'
import PageLoader from '../components/organisms/PageLoader/page-loader.vue'

export default {
  components: { SiteFooter, SiteHeader, PopUp, DotCursor, PageLoader },
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchFooter', $prismic)
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => (this.loading = false), 1200)
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      // console.log(e)
    },
    openPopup() {
      this.$store.dispatch(
        'openPopup',
        this.$store.state.footer.popupContentHTML.planning
      )
    },
    closePopup() {
      this.$store.dispatch('closePopup')
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
