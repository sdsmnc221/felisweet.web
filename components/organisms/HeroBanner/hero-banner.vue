<template>
  <atom-wrapper class="hero-banner">
    <hero-illus />
    <logo-felisweet />
    <atom-wrapper tag="h1" class="hero-text">
      <hero-logo-felisweet />
      <span>C'est du <b>comportementalisme</b></span>
      <br />
      <span>plein de <b>félin</b> et <b>câlin</b> !!!</span>
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
}
</script>

<style lang="scss">
.hero-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -$spacing-5xl;

  .hero-text {
    width: 100%;
    text-align: center;
    font-family: $font-family-quicksand;
    @include rem(margin-top, $spacing-s);

    span {
      display: inline-block;
      text-transform: uppercase;

      &:first-of-type,
      &:first-of-type b {
        @include rem(font-size, $font-size-body-m);
        letter-spacing: 0.5px;
      }

      &:last-of-type,
      &:last-of-type b {
        @include rem(font-size, $font-size-body-l);
        letter-spacing: 1px;
      }
    }

    b {
      font-weight: $weight-bold;
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    flex-direction: row-reverse;
    margin-top: 0;

    .hero-text {
      width: 50vw;

      span {
        &:nth-of-type(2),
        &:last-of-type {
          @include rem(margin-left, $spacing-4xl);
        }

        &:nth-of-type(2),
        &:nth-last-of-type(2) b {
          @include rem(font-size, $font-size-heading-5);
          letter-spacing: 0.1px;
        }

        &:last-of-type,
        &:last-of-type b {
          @include rem(font-size, $font-size-heading-4);
          letter-spacing: 1px;
        }
      }
    }

    & > .logo-felisweet {
      display: none;
    }
  }

  // @media #{$mq-mobile} {
  //   .logo-felisweet {
  //     width: 48vw;
  //   }

  //   .hero-text {
  //     span {
  //       &:nth-of-type(2),
  //       &:nth-last-of-type(2) b {
  //         @include rem(font-size, $font-size-heading-5);
  //         letter-spacing: 0.1px;
  //       }

  //       &:last-of-type,
  //       &:last-of-type b {
  //         @include rem(font-size, $font-size-heading-4);
  //         letter-spacing: 1px;
  //       }
  //     }
  //   }
  // }
}
</style>
