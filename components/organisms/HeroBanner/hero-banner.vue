<template>
  <atom-wrapper ref="container" class="hero-banner">
    <hero-illus
      ref="heroIllus"
      :illustration="illustration"
      :illustration-alt="illustrationAlt"
    />
    <logo-felisweet ref="logo" v-bind="logo" />
    <atom-wrapper ref="smallContainer" tag="h1" class="hero-text">
      <hero-logo-felisweet
        ref="heroLogo"
        :logo="illustrationLogo"
        :text="illustrationText"
        :bubble-chat="bubbleChat"
      />
      <div
        ref="heroText"
        class="hero-baseline font-childlike"
        v-html="$prismic.asHTML(text)"
      />
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'
import HeroIllus from '../../molecules/HeroIllus'
import HeroLogoFelisweet from '../../molecules/HeroLogoFelisweet'

export default {
  name: 'HeroBanner',
  components: { AtomWrapper, HeroIllus, LogoFelisweet, HeroLogoFelisweet },
  props: {
    illustration: {
      type: Object,
      required: true,
    },
    illustrationAlt: {
      type: String,
      required: true,
    },
    illustrationText: {
      type: Array,
      required: true,
    },
    illustrationLogo: {
      type: Object,
      required: true,
    },
    text: {
      type: Array,
      required: true,
    },
    logo: {
      type: Object,
      required: true,
    },
    bubbleChat: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$gsap.set([...this.$refs.heroText.querySelectorAll('p')], {
      opacity: 0,
      y: 240,
    })

    this.$gsap
      .timeline()
      .addLabel('start', 0)
      .to(this.$refs.heroIllus.$el, {
        opacity: 1,
        y: 0,
        duration: 2.4,
        ease: 'circ.in',
      })
      .to(
        this.$refs.logo.$el,
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'circ.in',
        },
        '>+=1.6'
      )
      .to(
        this.$refs.smallContainer,
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'circ.in',
        },
        'start+=4'
      )
      .to(
        this.$refs.heroLogo.$el,
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'circ.in',
        },
        '>+=1.2'
      )
      .to(
        [...this.$refs.heroText.querySelectorAll('p')],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'circ.in',
          stagger: 0.8,
        },
        '<-=1'
      )
  },
}
</script>

<style lang="scss">
.hero-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -$spacing-5xl;

  > * {
    opacity: 0;
    transform: translateY(240px);

    span:not(:first-of-type) {
      opacity: 0;
      transform: translateY(240px);
      display: inline-block;
    }
  }

  .hero-text {
    width: 100%;
    text-align: center;
    font-family: $font-family-quicksand;
    text-transform: uppercase;
    @include rem(margin-top, $spacing-s);

    div {
      text-transform: uppercase;

      p {
        &:first-of-type {
          @include rem(font-size, $font-size-body-m);
          letter-spacing: 0.5px;
        }

        &:last-of-type,
        strong {
          @include rem(font-size, $font-size-body-l);
          letter-spacing: 1px;
        }
      }
    }

    strong {
      font-weight: $weight-bold;
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    flex-direction: row-reverse;
    margin-top: 0;

    .hero-text {
      width: 50vw;

      div {
        p {
          &:nth-of-type(1),
          &:last-of-type {
            @include rem(margin-left, $spacing-4xl);
          }

          &:nth-of-type(1),
          strong {
            @include rem(font-size, $font-size-heading-4);
            letter-spacing: 0.1px;
          }

          &:last-of-type {
            @include rem(font-size, $font-size-heading-3);
            letter-spacing: 2px;
          }
        }
      }

      .hero-baseline {
        p:first-of-type {
          @include rem(margin-top, $spacing-xl);
        }
      }
    }

    & > .logo-felisweet {
      display: none;
    }
  }

  @media #{$mq-xlarge} {
    .hero-text {
      .logo-felisweet {
        @include rem(margin-bottom, $spacing-l);
      }

      div {
        p {
          &:nth-of-type(1),
          &:nth-last-of-type(2) {
            @include rem(font-size, $font-size-heading-3);
            letter-spacing: 0.1px;
          }

          &:last-of-type,
          strong {
            @include rem(font-size, $font-size-heading-2);
            letter-spacing: 2px;
          }
        }
      }

      .hero-baseline {
        p:first-of-type {
          @include rem(margin-top, $spacing-5xl);
        }
      }
    }
  }
}
</style>
