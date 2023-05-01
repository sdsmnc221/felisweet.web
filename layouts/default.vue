<template>
  <div>
    <transition v-if="!$store.state.loading">
      <div class="container">
        <site-header
          v-if="$route.name !== 'noel2022'"
          v-bind="$store.state.header"
        />
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
                :class="`popup-content ${$store.state.page.popupType}`"
                v-html="$store.state.page.popupContent"
              />
            </template>
          </pop-up>
        </Transition>
        <site-footer />
        <dot-cursor v-if="$route.name !== 'noel2022'" />
      </div>
    </transition>
    <transition name="fade">
      <page-loader v-if="$store.state.loading && $route.name !== 'noel2022'" />
    </transition>
    <transition name="fade">
      <noel-page-loader
        v-if="
          $store.state.loading &&
          $route.name === 'noel2022' &&
          $store.state.isLandscape
        "
      />
    </transition>
    <transition name="fade">
      <noel-snow v-if="$route.name === 'noel2022'" />
    </transition>
    <transition name="fade">
      <noel-rotate-screen
        v-if="
          $route.name === 'noel2022' &&
          $store.state.isMobile &&
          !$store.state.isLandscape
        "
      />
    </transition>
  </div>
</template>

<script>
import SiteFooter from '../components/organisms/SiteFooter'
import SiteHeader from '../components/organisms/SiteHeader'
import PopUp from '../components/molecules/PopUp'
import DotCursor from '../components/molecules/DotCursor'
import PageLoader from '../components/organisms/PageLoader'
import NoelPageLoader from '../components/noel/NoelPageLoader'
import NoelSnow from '../components/noel/NoelSnow'
import NoelRotateScreen from '../components/noel/NoelRotateScreen'

export default {
  components: {
    SiteFooter,
    SiteHeader,
    PopUp,
    DotCursor,
    PageLoader,
    NoelPageLoader,
    NoelSnow,
    NoelRotateScreen,
  },
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchFooter', $prismic)
  },
  head() {
    const head = {}

    switch (this.$route.name) {
      case 'noel2022':
        head.title = `Fêtez la fin de l'année 2022 avec FeliSweet`
        head.meta = [
          {
            hid: 'description-noel2022',
            name: 'description',
            content:
              "Carte interactive des fêtes de fin de l'année 2022 de FeliSweet",
          },
        ]
        break
      case 'about':
        head.title = `À propos de FeliSweet`
        head.meta = [
          {
            hid: 'description-about',
            name: 'description',
            content: 'Présentation de FeliSweet et de Marie',
          },
        ]
        break
      case 'services':
        head.title = `Découvrez nos Services`
        head.meta = [
          {
            hid: 'description-services',
            name: 'description',
            content:
              'Les services proposés par FeliSweet : Comportements du chat et Cat-sitting',
          },
        ]
        break
      case 'tarifs':
        head.title = `Découvrez nos Tarifs`
        head.meta = [
          {
            hid: 'description-tarifs',
            name: 'description',
            content:
              'Les tarifs proposés par FeliSweet : Comportements du chat et Cat-sitting',
          },
        ]
        break
      default:
        break
    }

    return head
  },
  mounted() {
    if (this.$route.name !== 'noel2022') {
      setTimeout(
        () => this.$store.dispatch('setLoading', { loading: false }),
        1200
      )
    }

    this.$store.dispatch('detectMobile', { navigator: window.navigator })
    this.$store.dispatch('detectOrientation', {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
    window.addEventListener('resize', () => {
      this.$store.dispatch('detectMobile', { navigator: window.navigator })
      this.$store.dispatch('detectOrientation', {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      })
    })
  },
  methods: {
    openPopup() {
      this.$store.dispatch('openPopup', {
        popupContent: this.$store.state.footer.popupContentHTML.planning,
        popupType: 'planning',
      })
    },
    closePopup() {
      this.$store.dispatch('closePopup')
    },
  },
}
</script>

<style lang="scss">
*,
*::after,
*::before {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  user-select: none;
}

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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
