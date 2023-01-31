<template>
  <scroll-reveal-wrapper class="site-header">
    <atom-wrapper ref="header" tag="header">
      <logo-felisweet v-if="headerLogo" v-bind="headerLogo" />
      <div v-if="links.length > 0" class="links">
        <a
          v-for="(linkItem, index) in links"
          :key="`link-${index}`"
          :href="linkItem.link.field.url || `/${linkItem.link.field.uid}`"
          class="link"
        >
          {{ linkItem.title }}
        </a>
      </div>

      <a class="link contact" href="/#contact"
        ><atom-image src="/images/contact-btn.svg"
      /></a>

      <div ref="ham" class="mobile-menu link">
        <input type="checkbox" name="" class="check" />
        <div class="ham-menu">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
      </div>

      <div ref="mobileMenu" class="mobile-menu-content">
        <logo-felisweet v-if="headerLogo" v-bind="headerLogo" />
        <div v-if="links.length > 0" class="links">
          <a
            v-for="(linkItem, index) in links"
            :key="`link-${index}`"
            :href="linkItem.link.field.url || `/${linkItem.link.field.uid}`"
            class="link"
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
    this.links = headerData.slices[0].items.map(({ link, title }) => ({
      title,
      link: this.$enhancedLinkSerializer(link),
    }))
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let color = 'transparent'
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop // Get Current Scroll Value

      if (currentScroll > 0 && this.lastScroll <= currentScroll) {
        this.lastScroll = currentScroll
        color = 'white'
      } else {
        this.lastScroll = currentScroll
        color = 'transparent'
      }

      this.$gsap.set(this.$refs.header, {
        backgroundColor: color,
        duration: 1.2,
        ease: 'circ.in',
      })
    })

    this.$refs.ham.addEventListener('click', () => {
      this.showMenu = !this.showMenu

      this.$gsap.to(this.$refs.mobileMenu, {
        opacity: this.showMenu ? 1 : 0,
        pointerEvents: this.showMenu ? 'auto' : 'none',
        duration: 0.8,
        ease: 'circ.in',
      })
    })
  },
}
</script>

<style lang="scss">
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
  }

  .logo-felisweet {
    margin: 0;
    display: none;

    img {
      width: auto;
      height: 32px;
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
      top: 32px;
      width: 100%;
      text-align: center;
    }

    .links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      a {
        margin: $spacing-xl 0;
        font-size: $font-size-heading-2;
      }
    }
  }

  .links {
    display: none;
  }

  .contact {
    position: absolute !important;
    top: 16px;
    left: 16px;
    img {
      width: 84px;
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
  }
  .mobile-menu {
    top: 0;
    position: relative;
    height: 3rem;
    width: 3rem;

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
    }

    .mobile-menu {
      display: none;
    }

    .links {
      display: flex;
      background-color: $color-white;
      padding: $spacing-s $spacing-m;
      border-radius: 64px;
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
</style>
