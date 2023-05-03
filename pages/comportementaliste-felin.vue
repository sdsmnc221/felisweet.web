<template>
  <atom-wrapper tag="main">
    <scroll-reveal-wrapper
      v-for="(slice, index) in slices"
      :key="`slice-mobile-service-info${index}`"
      :top="200"
      :class="{
        '--is-first-section': index === 0,
        '--is-last-section': index === slices.length - 1,
      }"
    >
      <atom-wrapper tag="section">
        <service-info-block
          :data="slice"
          :small-title="index === 0"
          :row-reverse="index % 2 !== 0"
        />
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <paws-pattern :paws-per-section="4" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'
import ServiceInfoBlock from '../components/molecules/ServiceInfoBlock'
import PawsPattern from '../components/organisms/Paws-Pattern'

import serviceInfoBlockAdapter from '../utils/adapters/serviceInfoBlock'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    PawsPattern,
    ScrollRevealWrapper,
    ServiceInfoBlock,
  },
  props: {
    openPopup: {
      type: Function,
      default: null,
    },
    popupContentPlanning: {
      type: String,
      default: null,
    },
  },
  async asyncData({ $prismic, $enhancedLinkSerializer, error }) {
    const document = await $prismic.api.getSingle('comportementaliste_page')

    const data = document?.data

    const slices = data?.slices

    const mobileSlices = slices?.filter(
      ({ slice_type: sliceType }) => sliceType === 'service_info_block'
    )

    console.log(mobileSlices)

    if (data) {
      return {
        slices: mobileSlices.map((slice) =>
          serviceInfoBlockAdapter({ $prismic, data: slice })
        ),
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
main {
  overflow: hidden;
  padding-top: 7.2vh;

  .--is-first-section {
    .service-info-block {
      .content {
        &.--has-margin-top {
          margin-top: -32%;
        }
      }
    }
  }

  .--is-last-section {
    margin-bottom: 7.2vh;
  }

  .footer {
    position: relative;

    .atom-image {
      position: absolute;
      z-index: -1;
      bottom: 0;
      left: -12px;
      width: 104vw;
      min-height: 22vh;
      max-height: 100vh;
    }
  }

  @media #{$mq-medium} {
    .--is-last-section {
      margin-bottom: 36vh;
    }

    .footer {
      position: relative;

      .atom-image {
        left: -24px;
        width: 102vw;
        min-height: 496px;
      }
    }

    .section-banner {
      overflow: visible;
    }
  }

  @media #{$mq-xlarge} {
  }
}
</style>
