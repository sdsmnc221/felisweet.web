<template>
  <atom-wrapper tag="figure" class="hero-illus">
    <div class="circle" />
    <atom-image src="/images/illus-hero.svg" alt="Hero's Illustration" />
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import AtomWrapper from '../../atoms/AtomWrapper'

export default {
  name: 'HeroIllus',
  components: { AtomWrapper, AtomImage },
}
</script>

<style lang="scss">
.hero-illus {
  position: relative;
  width: 100vw;
  @include rem(padding, $spacing-xl);
  @include rem(padding-bottom, $spacing-s);

  .circle {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    background-color: $color-shakespear-blue;
    opacity: 0.15;
    width: 80vw;
    height: 80vw;
    border-radius: $radius-full;
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    width: 48vw;
    @include rem(margin-right, $spacing-4xl);

    .circle {
      width: 40vw;
      height: 40vw;
      transform: translate(-50%, -55%);
    }
  }

  @media #{$mq-tablet} {
    margin: 0 auto;
  }
}
</style>
