<template>
  <atom-wrapper tag="span" class="hero-logo-felisweet">
    <em class="b">Hello,</em>
    <br />
    <em>nous sommes</em>
    <logo-felisweet size="32vw" no-link />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'

export default {
  name: 'HeroLogoFelisweet',
  components: { AtomWrapper, LogoFelisweet },
}
</script>

<style lang="scss">
.hero-logo-felisweet {
  display: none !important;

  @media #{$mq-medium}, #{$mq-tablet} {
    display: block !important;
    text-align: center;
    transform: scale(0.8) rotate(-8deg);
    width: auto;
    top: -72px;
    left: 4vw;

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 160%;
      height: 160%;
      background-image: url('/images/bubble-logo.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    em {
      font-family: $font-family-lucida;
      color: $color-shakespear-blue;
      font-weight: $weight-regular;
      font-style: norma;
      text-transform: none;
      line-height: $font-size-heading-1;

      &:first-of-type {
        @include rem(font-size, $font-size-heading-1);
      }

      &:last-of-type {
        @include rem(font-size, $font-size-heading-2);
      }
    }
  }
}
</style>
