<template>
  <div>
    <transition v-if="!$store.state.loading">
      <div class="container">
        <site-header
          v-if="$route.name !== 'noel2022' && $route.name !== 'chachou-bible'"
          v-bind="$store.state.header"
        />
        <nuxt-child
          :open-popup="openPopup"
          :popup-content-planning="
            $store.state.footer.popupContentHTML.planning
          "
        />
        <Transition name="slide" mode="out-in">
          <div v-if="$store.state.page.displayPopup" class="popup-container">
            <pop-up :open="openPopup" :close="closePopup">
              <template #content>
                <div
                  :class="`popup-content ${$store.state.page.popupType}`"
                  v-html="$store.state.page.popupContent"
                />
              </template>
            </pop-up>
          </div>
        </Transition>
        <site-footer v-if="$route.name !== 'chachou-bible'" />
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
import PageLoader from '../components/organisms/PageLoader'
import NoelPageLoader from '../components/noel/NoelPageLoader'
import NoelSnow from '../components/noel/NoelSnow'
import NoelRotateScreen from '../components/noel/NoelRotateScreen'

export default {
  components: {
    SiteFooter,
    SiteHeader,
    PopUp,
    PageLoader,
    NoelPageLoader,
    NoelSnow,
    NoelRotateScreen,
  },
  data() {
    return {
      pageLoadTimeout: null,
      maxLoadingTime: 30000, // 30 seconds max loading time
    }
  },
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchFooter', $prismic)
  },
  head() {
    const head = {}

    switch (this.$route.name) {
      case 'noel2022':
        head.title = `Fêtez la fin de l'année 2022`
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
        head.title = `À propos`
        head.meta = [
          {
            hid: 'description-about',
            name: 'description',
            content:
              'Présentation de FeliSweet et de moi-même, Marie-Bénédicte SIRUGUET. Découvrez mon parcours et mes compétences.',
          },
        ]
        break
      case 'comportementaliste-felin':
        head.title = `Comportements félins`
        head.meta = [
          {
            hid: 'description-comportementaliste_felin',
            name: 'description',
            content:
              "Les commportements félins - Quelles sont les missions d'un.e comportementaliste félin.e chez FeliSweet ?",
          },
        ]
        break
      case 'services':
        head.title = `Cat-sitting`
        head.meta = [
          {
            hid: 'description-services',
            name: 'description',
            content: 'Le service de Cat-sitting, chez FeliSweet',
          },
        ]
        break
      case 'tarifs':
        head.title = `Tarifs`
        head.meta = [
          {
            hid: 'description-tarifs',
            name: 'description',
            content:
              'Les tarifs proposés par FeliSweet : Comportements du chat et Cat-sitting',
          },
        ]
        break
      case 'partners':
        head.title = `Patte'naires`
        head.meta = [
          {
            hid: 'description-partners',
            name: 'description',
            content:
              'Pour valoriser nos partenaires aux services des quatre pattes !',
          },
        ]
        break
      case 'facilicat':
        head.title = "Facili'Cat - Un nouveau service"
        head.meta = [
          {
            hid: 'description-facilicat',
            name: 'description',
            content:
              "Nous aidons les personnes en situation de handicap, ou ayant des difficultés à s'occuper pleinement",
          },
        ]
        break
      default:
        head.title = 'Bienvenue !'
        break
    }

    return head
  },
  watch: {
    $route() {
      // Reset loading state when route changes
      this.handleRouteChange()
    },
  },
  mounted() {
    console.log('Layout mounted for route:', this.$route.name)
    this.handleRouteChange()

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
  beforeDestroy() {
    if (this.pageLoadTimeout) {
      clearTimeout(this.pageLoadTimeout)
    }
  },
  methods: {
    handleRouteChange() {
      // Clear any existing timeout
      if (this.pageLoadTimeout) {
        clearTimeout(this.pageLoadTimeout)
        this.pageLoadTimeout = null
      }

      // Set loading state
      this.$store.dispatch('setLoading', { loading: true })

      // Different handling for different routes
      if (this.$route.name === 'noel2022') {
        // Special handling for noel2022 page
        return
      }

      // For about page and other heavy pages, use longer timeout
      const loadingTimeout = this.$route.name === 'about' ? 5000 : 1200

      // Set up timeout to force loading completion
      this.pageLoadTimeout = setTimeout(() => {
        console.warn('Page loading timeout reached, forcing completion')
        this.$store.dispatch('setLoading', { loading: false })
      }, loadingTimeout)

      // Set up a safety timeout for really stuck pages
      const safetyTimeout = setTimeout(() => {
        console.error('Safety timeout reached - page may be stuck')
        this.$store.dispatch('setLoading', { loading: false })

        // Optionally show an error message or reload
        if (this.$route.name === 'about') {
          console.log('About page appears to be stuck, consider reloading')
        }
      }, this.maxLoadingTime)

      // Listen for page load completion
      this.$nextTick(() => {
        // Check if the route component has finished loading
        const checkComponentReady = () => {
          const routeComponent = this.$children.find(
            (child) => child.$options.name === 'AboutPage'
          )

          if (routeComponent && !routeComponent.isLoading) {
            // Component is ready, clear timeouts and set loading to false
            clearTimeout(this.pageLoadTimeout)
            clearTimeout(safetyTimeout)
            this.$store.dispatch('setLoading', { loading: false })
          } else if (this.$route.name === 'about') {
            // For about page, check again in a bit
            setTimeout(checkComponentReady, 100)
          } else {
            // For other pages, use the original timeout
            // This is already handled by the timeout above
          }
        }

        // Start checking after a short delay
        setTimeout(checkComponentReady, 100)
      })
    },

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

.popup-container {
  position: fixed;
  bottom: -10vh;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  backdrop-filter: blur(12px);
  background-color: transparentize($color-shakespear-blue, 0.8);

  .pop-up {
    animation: fadein 1.2s;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1.2s ease, transform 0.64s ease-out;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(-7.2vh);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(7.2vh);
}
</style>
