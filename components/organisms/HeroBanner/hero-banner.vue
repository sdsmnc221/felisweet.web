<template>
  <atom-wrapper class="hero-banner">
    <hero-illus />
    <logo-felisweet />
    <atom-wrapper tag="h1" class="hero-text">
      <span>C'est du <b>comportementalisme</b></span>
      <span>plein de <b>félin</b> et <b>câlin</b> !!!</span>
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'
import HeroIllus from '../../molecules/HeroIllus'

export default {
  name: 'HeroBanner',
  components: { AtomWrapper, HeroIllus, LogoFelisweet },
}
</script>

<style lang="scss">
.hero-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
        @include rem(font-size, 12px);
        letter-spacing: 0.5px;
      }

      &:last-of-type,
      &:last-of-type b {
        @include rem(font-size, $font-size-root);
        letter-spacing: 1px;
      }
    }

    b {
      font-weight: $weight-bold;
    }
  }
}
</style>
