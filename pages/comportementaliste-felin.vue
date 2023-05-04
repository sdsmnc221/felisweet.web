<template>
  <atom-wrapper tag="main">
    <template v-if="$store.state.isMobile">
      <scroll-reveal-wrapper
        v-for="(slice, index) in mobileSlices"
        :key="`slice-mobile-service-info${index}`"
        :top="200"
        :class="{
          '--is-first-section': index === 0,
          '--is-last-section': index === mobileSlices.length - 1,
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
    </template>

    <template v-else>
      <horizontal-slider-blocks :data="desktopSlice" />
    </template>

    <paws-pattern :paws-per-section="4" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'
import ServiceInfoBlock from '../components/molecules/ServiceInfoBlock'
import PawsPattern from '../components/organisms/Paws-Pattern'
import HorizontalSliderBlocks from '../components/organisms/HorizontalSliderBlocks'

import serviceInfoBlockAdapter from '../utils/adapters/serviceInfoBlock'
import horizontalSliderBlocksAdapter from '../utils/adapters/horizontalSliderBlocks'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    PawsPattern,
    ScrollRevealWrapper,
    ServiceInfoBlock,
    HorizontalSliderBlocks,
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

    const desktopSlice = slices?.find(
      ({ slice_type: sliceType }) => sliceType === 'horizontal_slider_blocks'
    )

    if (data) {
      return {
        mobileSlices: mobileSlices.map((slice) =>
          serviceInfoBlockAdapter({ $prismic, data: slice })
        ),
        desktopSlice: horizontalSliderBlocksAdapter({
          $prismic,
          data: desktopSlice,
        }),
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
