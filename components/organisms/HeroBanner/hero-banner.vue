<template>
  <atom-wrapper ref="container" class="hero-banner">
    <hero-illus
      :illustration="illustration"
      :illustration-alt="illustrationAlt"
    />
    <logo-felisweet v-bind="logo" />
    <atom-wrapper ref="smallContainer" tag="h1" class="hero-text">
      <hero-logo-felisweet :logo="illustrationLogo" :text="illustrationText" />
      <div v-html="$prismic.asHTML(text)" />
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
  },
  mounted() {
    this.$gsap.to(
      [...this.$refs.container.children, ...this.$refs.smallContainer.children],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'sine.in',
        stagger: 0.2,
      }
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
        &:first-of-type,
        &:first-of-type strong {
          @include rem(font-size, $font-size-body-m);
          letter-spacing: 0.5px;
        }

        &:last-of-type,
        &:last-of-type strong {
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
          &:nth-last-of-type(2) strong {
            @include rem(font-size, $font-size-heading-5);
            letter-spacing: 0.1px;
          }

          &:last-of-type,
          &:last-of-type strong {
            @include rem(font-size, $font-size-heading-4);
            letter-spacing: 1px;
          }
        }
      }
    }

    & > .logo-felisweet {
      display: none;
    }
  }
}
</style>
