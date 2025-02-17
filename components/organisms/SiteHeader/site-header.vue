<template>
  <scroll-reveal-wrapper class="site-header">
    <atom-wrapper ref="header" tag="header">
      <logo-felisweet
        v-if="headerLogo"
        v-bind="headerLogo"
        :hide-logo="$route.name === 'facilicat'"
      />

      <div v-if="links.length > 0" class="links">
        <div>
          <a
            v-for="(linkItem, index) in links"
            :key="`link-${index}`"
            :href="linkItem.link.field.url || `/${linkItem.link.field.uid}`"
            class="link"
            :class="{ '--new': linkItem.isnew }"
          >
            {{ linkItem.title }}
          </a>
        </div>

        <div
          v-if="
            $route.name !== 'facilicat' && announcement && !$store.state.loading
          "
          ref="announcement"
          class="announcement-bar"
          v-html="announcement"
        ></div>
      </div>

      <a class="link contact" href="/#contact"
        ><atom-image src="/images/contact-btn.svg"
      /></a>

      <div
        class="mobile-menu link"
        :class="{ '--show': showMenu }"
        @click="onMenu"
      >
        <input type="checkbox" name="" class="check" />
        <div class="ham-menu">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
      </div>

      <div
        v-if="
          $route.name !== 'facilicat' && announcement && !$store.state.loading
        "
        ref="announcementB"
        class="announcement-bar --mobile"
        v-html="announcement"
      ></div>

      <div ref="mobileMenu" class="mobile-menu-content">
        <logo-felisweet v-if="headerLogo" v-bind="headerLogo" />
        <div v-if="links.length > 0" class="links">
          <a
            v-for="(linkItem, index) in links"
            :key="`link-${index}`"
            :href="linkItem.link.field.url || `/${linkItem.link.field.uid}`"
            class="link"
            :class="{ '--new': linkItem.isnew }"
          >
            {{ linkItem.title }}
          </a>
        </div>
      </div>
    </atom-wrapper>
  </scroll-reveal-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'
import ScrollRevealWrapper from '../../atoms/ScrollRevealWrapper'
import AtomImage from '../../atoms/AtomImage'

import moduleLogoAdapter from '../../../utils/adapters/moduleLogo'

export default {
  name: 'SiteHeader',
  components: { AtomWrapper, LogoFelisweet, ScrollRevealWrapper, AtomImage },
  props: {
    showLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headerLogo: null,
      links: [],
      lastScroll: 0,
      announcement: '',
      showMenu: false,
    }
  },
  async fetch() {
    const headerData = (await this.$prismic.api.getSingle('site_header')).data

    const headerLogo = await moduleLogoAdapter(
      this.$prismic,
      this.$enhancedLinkSerializer,
      headerData.logo.id
    )
    this.headerLogo = headerLogo

    this.links = headerData.slices[0].items.map(({ link, title, isnew }) => ({
      title,
      link: this.$enhancedLinkSerializer(link),
      isnew,
    }))
    if (
      headerData?.slices &&
      headerData.slices.find((s) => s.slice_type === 'announcement_bar')
    ) {
      this.announcement = this.$prismic.asHTML(
        headerData.slices.find((s) => s.slice_type === 'announcement_bar')
          .primary.text
      )
    }
  },
  watch: {
    '$store.state.loading': {
      handler(newValue) {
        if (!newValue && this.announcement) {
          setTimeout(this.onScroll, 600)
        }
      },
      immediate: true,
    },
    announcement(newValue) {
      if (newValue && !this.$store.state.loading) {
        setTimeout(this.onScroll, 600)
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   window.addEventListener('scroll', this.onScroll)
    // })
  },
  methods: {
    onScroll() {
      let color = 'transparent'
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop // Get Current Scroll Value

      if (currentScroll > 0 && this.lastScroll <= currentScroll) {
        this.lastScroll = currentScroll
        color = 'white'
        this.$refs.announcement?.classList.add('--f-w')
      } else {
        this.lastScroll = currentScroll
        color = 'transparent'
        this.$refs.announcement?.classList.remove('--f-w')
      }

      const offsetAnnouncement =
        this.$refs.announcementB?.getBoundingClientRect().height

      if (this.$store.state.isMobile) {
        this.$gsap.set('#__nuxt', {
          marginTop: offsetAnnouncement,
        })
      }

      this.$gsap.set(this.$refs.header, {
        backgroundColor: color,
        duration: 1.2,
        ease: 'circ.in',
        top: offsetAnnouncement,
      })
    },
    onMenu() {
      this.showMenu = !this.showMenu

      this.$gsap.to(this.$refs.mobileMenu, {
        opacity: this.showMenu ? 1 : 0,
        pointerEvents: this.showMenu ? 'auto' : 'none',
        duration: 0.8,
        ease: 'circ.in',
      })
    },
  },
}
</script>

<style lang="scss">
.container:has(.embedded-page) {
  .site-header {
    header {
      top: 24px;
    }

    .link.contact {
      bottom: -84vh;
      right: 8px;
      left: unset;
      top: unset;
    }
  }
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;

  header {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
    padding: $spacing-xl;
    position: relative;

    &:has(.announcement-bar) {
      top: 72px;

      .mobile-menu-content {
        .logo-felisweet {
          top: 72px;
        }
      }
    }
  }

  .logo-felisweet {
    margin: 0;
    display: none;

    img {
      width: auto;
      height: 32px;
    }
  }

  .announcement-bar {
    margin-top: 12px;
    background-color: $color-shakespear-blue;
    padding: $spacing-s;
    border-radius: 24px;
    text-align: center;
    color: $color-white;

    transition: all ease 0.64s;

    * {
      font-size: $font-size-body-xs;
    }

    &.--mobile {
      position: fixed;
      top: 0;
      left: 0;
      opacity: 1 !important;
      width: 100vw;
      border-radius: 0;
      margin: 0;

      * {
        font-size: calc($font-size-body-xs * 0.72);
      }
    }
  }

  .mobile-menu-content {
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .logo-felisweet {
      display: block;
      position: absolute;
      bottom: 32px;
      width: 100%;
      text-align: center;
    }

    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 32px 10vh 32px;

      a {
        text-align: center;
        margin: $spacing-m 0;
        padding: 0 $spacing-s;
        font-size: calc($font-size-heading-4 * 0.64);
      }

      .link {
        &.--new {
          position: relative;

          &::after {
            background-image: url('../../../static/images/new.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 72px;
            height: 72px;
            content: '';
            position: absolute;
            left: 48px;
            top: -48px;
            background-color: transparent;

            @extend .animate-blink;
          }
        }
      }
    }
  }

  .links {
    display: none;
  }

  .contact {
    position: absolute !important;
    z-index: 99;
    top: 16px;
    left: 16px;
    img {
      width: 84px;
    }

    &:has(+ .--show) {
      top: 48px;
    }
  }

  .link:not(.mobile-menu) {
    text-decoration: none;
    color: $color-jellybean-blue;
    margin: 0 $spacing-m;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: $color-service-blue;
      transition: all ease 0.64s;
    }

    &:hover {
      color: $color-nepal-blue;

      &::after {
        width: 100%;
      }
    }

    &.--new {
      position: relative;

      &::after {
        background-image: url('../../../static/images/new.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 64px;
        height: 64px;
        content: '';
        position: absolute;
        left: 36px;
        top: -40px;
        background-color: transparent;

        @extend .animate-blink;
      }
    }
  }
  .mobile-menu {
    top: 0;
    position: relative;
    height: 3rem;
    width: 3rem;
    z-index: 999;

    &.--show {
      top: 32px;
    }

    .ham-menu {
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.5rem;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .line {
        background-color: $color-jellybean-blue;
        border-radius: 1em;
        width: 2rem;
        height: 0.12rem;

        .line1 {
          transform-origin: 0% 0%;
          transition: transform 100ms ease-in-out;
        }

        .line3 {
          transform-origin: 0% 100%;
          transition: transform 100ms ease-in-out;
        }
      }
    }

    .check {
      position: absolute;
      top: 0;
      left: 0;
      height: 3rem;
      width: 3rem;
      opacity: 0;
      z-index: 3;
    }

    .check:checked ~ .ham-menu .line1 {
      display: block;
      transform: rotate(45deg);
      top: 30%;
      position: relative;
    }

    .check:checked ~ .ham-menu .line2 {
      opacity: 0;
    }

    .check:checked ~ .ham-menu .line3 {
      display: block;
      transform: rotate(-45deg);
      top: -40%;
      position: relative;
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    height: 64px;

    header {
      justify-content: space-between;
      align-items: center;
      background-color: transparent;

      &:has(.announcement-bar) {
        top: 0px;
      }
    }

    .announcement-bar {
      font-size: 12px;

      &.--f-w {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100vw;
        border-radius: 0;
        margin-top: 0;
        padding: $spacing-s 16vw;
      }
      &.--mobile {
        display: none;
      }
    }

    .mobile-menu {
      display: none;
    }

    .links {
      display: flex;
      flex-direction: column;

      // &:not(:has(.--f-w)) {
      // margin-top: $spacing-3xl;
      // }

      div:first-child {
        flex: 1;
        background-color: $color-white;
        border-radius: 64px;
        display: flex;
        padding: $spacing-s $spacing-m;
      }

      a {
        text-align: center;
        white-space: nowrap;
      }
    }

    .contact {
      position: relative !important;
      margin-left: $spacing-xl;
      top: 0;
      left: 0;

      img {
        width: 84px;
      }
    }

    .logo-felisweet {
      display: block;
    }
  }
}

.animate-blink {
  animation: blink 1.5s infinite;
  animation-fill-mode: both;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
