<template>
  <atom-wrapper tag="footer" flex flex-center flex-col class="site-footer">
    <logo-felisweet v-if="footerLogo" v-bind="footerLogo" />
    <p class="links">
      <button class="link" @click="openCredits">
        {{ $store.state.footer.labels.credits }}
      </button>
      <span>-</span>
      <button class="link" @click="openMentions">
        {{ $store.state.footer.labels.mentions }}
      </button>
    </p>
    <div class="copyright" v-html="$store.state.footer.copyright" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'

import moduleLogoAdapter from '../../../utils/adapters/moduleLogo'

export default {
  name: 'SiteFooter',
  components: { AtomWrapper, LogoFelisweet },
  data() {
    return {
      footerLogo: null,
    }
  },
  async fetch() {
    const footerData = (await this.$prismic.api.getSingle('site_footer')).data

    const footerLogo = await moduleLogoAdapter(
      this.$prismic,
      this.$enhancedLinkSerializer,
      footerData.module_logo.id
    )
    this.footerLogo = footerLogo
  },
  methods: {
    openCredits() {
      this.$store.dispatch(
        'openPopup',
        this.$store.state.footer.popupContentHTML.credits
      )
    },
    openMentions() {
      this.$store.dispatch(
        'openPopup',
        this.$store.state.footer.popupContentHTML.mentions
      )
    },
  },
}
</script>

<style lang="scss">
.site-footer {
  @include rem(padding, $spacing-2xl 0);
  border-top: 0.5px solid $color-service-blue;
  background-color: $color-white;

  .logo-felisweet {
    width: 208px;
  }

  p,
  button {
    color: $color-nepal-blue;
    @include rem(font-size, $font-size-body-xs);
    @include rem(line-height, $font-size-body-m);
  }

  button {
    background: none;
    outline: none;
    border: none;
    text-decoration: underline;
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    @include rem(padding, $spacing-l);

    .logo-felisweet {
      width: 185px;
    }

    p,
    button,
    span {
      @include rem(font-size, $font-size-body-s);
      @include rem(line-height, $font-size-body-m);
    }

    .links {
      position: absolute;
      top: 50%;
      right: 4vw;
      transform: translateY(-50%);
      width: 150px;
      text-align: right;

      span {
        display: none;
      }

      button {
        display: block;
      }
    }

    .copyright {
      position: absolute;
      top: 50%;
      left: 4vw;
      transform: translateY(-50%);
      width: 150px;
      text-align: center;

      span {
        display: block;
      }
    }
  }
}
</style>
