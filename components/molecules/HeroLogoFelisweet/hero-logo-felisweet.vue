<template>
  <atom-wrapper tag="div" class="hero-logo-felisweet" :style="css">
    <div class="text" v-html="$prismic.asHTML(text)" />
    <logo-felisweet v-bind="logo" size="32vw" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'

export default {
  name: 'HeroLogoFelisweet',
  components: { AtomWrapper, LogoFelisweet },
  props: {
    logo: {
      type: Object,
      required: true,
    },
    text: {
      type: Array,
      required: true,
    },
    bubbleChat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    css() {
      console.log(this.bubbleChat)
      return {
        '--bubble-chat': `url(${this.bubbleChat.filename})`,
      }
    },
  },
}
</script>

<style lang="scss">
.hero-banner {
  .hero-logo-felisweet {
    display: none !important;

    @media #{$mq-medium}, #{$mq-tablet} {
      display: block !important;
      text-align: center;
      transform: scale(0.8) rotate(-8deg);
      width: auto;
      top: -72px;
      left: 4vw;

      .logo-felisweet {
        transform: translateX(16px);
      }

      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 200%;
        height: 196%;
        background-image: var(--bubble-chat);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .text {
        p,
        p strong {
          font-family: $font-family-lucida !important;
          color: $color-shakespear-blue;
          font-weight: $weight-regular;
          font-style: normal;
          text-transform: none;
          line-height: $font-size-heading-1;
        }

        > p:first-of-type strong {
          @include rem(font-size, $font-size-heading-1);
        }

        > p:last-of-type strong {
          @include rem(font-size, $font-size-heading-2);
          letter-spacing: 0;
        }

        > p:first-of-type {
          transform: scale(1.2) translateX(-6px);
        }

        > p:last-of-type {
          transform: scale(1.2) translateX(-6px);
        }
      }
    }

    @media #{$mq-xlarge} {
      &::after {
        width: 200%;
        height: 228%;
      }

      > p:first-of-type {
        transform: scale(1.2) translateX(-6px);
      }

      > p:last-of-type {
        transform: scale(1.4) translateX(-6px);
      }
    }
  }
}
</style>
