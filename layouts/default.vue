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
              'Les commportements félins - Quelles sont les missions d’un.e comportementaliste félin.e chez FeliSweet ?',
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

.slide-enter-from,  /* Note: changed from fade-enter to fade-enter-from */
.slide-leave-to {
  opacity: 0;
  transform: translateY(7.2vh); /* This makes it slide up from 20px below */
}
</style>
