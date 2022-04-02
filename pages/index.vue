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
      <button-arrow
        direction="down"
        :size="46"
        :arrow-size="24"
        :on-click="scrollDown"
      />
    </atom-wrapper>
    <atom-wrapper
      ref="sectionProblematics"
      tag="section"
      full-height
      flex
      flex-center
      flex-col
      class="section-problematics"
    >
      <slider-questions />
      <problematics-illus />
    </atom-wrapper>
    <atom-wrapper
      tag="section"
      full-height
      flex
      flex-center
      class="section-services"
    >
      <h2>
        On vous propose <br />
        <b>nos services</b> :
      </h2>
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Contact
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import ButtonArrow from '../components/atoms/ButtonArrow'
import ProblematicsIllus from '../components/molecules/ProblematicsIllus'
import SliderQuestions from '../components/molecules/SliderQuestions'
import HeroBanner from '../components/organisms/HeroBanner'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    HeroBanner,
    ButtonArrow,
    SliderQuestions,
    ProblematicsIllus,
  },
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

  .section-problematics {
  }

  .section-services {
    h2 {
      @include rem(font-size, $font-size-body-xl);
      @include rem(padding, 0 $spacing-2xl);
      text-align: center;

      b {
        @include rem(font-size, $font-size-body-xl);
        font-weight: $weight-bold;
      }
    }
  }
}
</style>
