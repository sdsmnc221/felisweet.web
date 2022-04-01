<template>
  <atom-wrapper tag="figure" class="hero-illus">
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
  width: 90vw;
}
</style>
