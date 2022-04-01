<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      tag="section"
      full-height
      flex
      flex-center
      class="section-hero"
    >
      <hero-banner />
      <button-arrow direction="down" :size="46" :on-click="scrollDown" />
    </atom-wrapper>
    <atom-wrapper
      ref="sectionProblematics"
      tag="section"
      full-height
      flex
      flex-center
    >
      Problematiques
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Services
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Contact
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import ButtonArrow from '../components/atoms/ButtonArrow'
import HeroBanner from '../components/organisms/HeroBanner'

export default {
  name: 'IndexPage',
  components: { AtomWrapper, HeroBanner, ButtonArrow },
  methods: {
    scrollDown() {
      this.$refs.sectionProblematics.scrollIntoView()
    },
  },
}
</script>

<style lang="scss">
main {
  .section-hero {
    .button-arrow {
      position: absolute;
      @include rem(bottom, $spacing-2xl);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
