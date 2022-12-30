<template>
  <atom-wrapper tag="main">
    <scroll-reveal-wrapper>
      <atom-wrapper
        ref="hero"
        tag="section"
        flex
        flex-center
        class="section-banner"
      >
        <photo-banner :data="banner" />
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <scroll-reveal-wrapper
      v-for="(slice, index) in slices"
      :key="`slice-service-info${index}`"
    >
      <atom-wrapper tag="section">
        <service-info-block
          :data="slice"
          :small-title="index === 0"
          :row-reverse="index % 2 !== 0"
        />
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <paws-pattern :paws-per-section="6" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'
import ServiceInfoBlock from '../components/molecules/ServiceInfoBlock'
import PawsPattern from '../components/organisms/Paws-Pattern'
import PhotoBanner from '../components/organisms/PhotoBanner'

import photoBannerAdapter from '../utils/adapters/photoBanner'
import serviceInfoBlockAdapter from '../utils/adapters/serviceInfoBlock'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    PawsPattern,
    PhotoBanner,
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
    const document = await $prismic.api.getByUID('info_page', 'services', {
      fetchLinks: [
        'module_photo_banner.image',
        'module_photo_banner.description',
        'module_photo_banner.bubble_desktop',
        'module_photo_banner.bubble_mobile',
        'module_photo_banner.bubble_image',
      ],
    })

    const data = document?.data

    const moduleBanner = data?.module_banner

    const slices = data?.slices

    if (data) {
      return {
        banner: photoBannerAdapter({ $prismic, data: moduleBanner.data }),
        slices: slices.map((slice) =>
          serviceInfoBlockAdapter({ $prismic, data: slice })
        ),
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted() {},
  methods: {
    scrollDown() {
      this.$refs.sectionProblematics.scrollIntoView()
    },
  },
}
</script>

<style lang="scss">
main {
  overflow: hidden;

  @media #{$mq-medium} {
    .section-banner {
      overflow: visible;
    }
  }

  @media #{$mq-xlarge} {
  }
}
</style>
