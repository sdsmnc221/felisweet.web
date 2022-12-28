<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      ref="hero"
      tag="section"
      flex
      flex-center
      class="section-hero"
    >
      <photo-banner :data="banner" />
    </atom-wrapper>

    <scroll-reveal-wrapper
      v-for="(slice, index) in slices"
      :key="`slice-service-info${index}`"
    >
      <atom-wrapper tag="section">
        <service-info-block :data="slice" :small-title="index === 0" />
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

  .section-hero {
    .button-arrow {
      position: absolute;
      @include rem(bottom, $spacing-5xl);
      left: 50%;
      transform: translateX(-50%) scale(0);
      opacity: 0;
    }
  }

  .section-problematics {
    .problematics-paw {
      position: absolute;
      width: 245px;
      bottom: 5%;
      left: -10%;
    }
  }

  .section-services {
    &.--flex {
      justify-content: flex-start;
    }

    h2 {
      @include rem(padding, 0 $spacing-2xl);
      @include rem(margin, $spacing-2xl 0 calc($spacing-2xl/2) 0);

      position: relative;

      p {
        @include rem(font-size, $font-size-body-xl);
        text-align: center;
      }

      strong {
        @include rem(font-size, $font-size-body-xl);
        font-weight: $weight-bold;
      }

      .bubble-image {
        position: absolute;
        bottom: -50%;
        left: -4%;
      }
    }

    & > .bubble-image {
      margin: 0 auto;
      margin-top: -32px;
    }
  }

  .section-reviews {
    // @include rem(margin-bottom, $spacing-l);

    &.--flex {
      justify-content: flex-start;
    }

    h2 {
      @include rem(padding, 0 $spacing-2xl);
      @include rem(margin, $spacing-2xl 0 calc($spacing-2xl/2) 0);

      p {
        @include rem(font-size, $font-size-body-xl);
        text-align: center;
      }

      strong {
        @include rem(font-size, $font-size-body-xl);
        font-weight: $weight-bold;
      }
    }

    .reviews-more {
      position: absolute;
      bottom: -10vh;
      right: 20%;

      a {
        color: $color-shakespear-blue;
      }
    }
  }

  .section-contact {
    @include rem(margin-top, $spacing-4xl);
    &.--flex {
      justify-content: flex-start;
    }
  }

  @media #{$mq-medium} {
    .section-hero {
      height: 100vh;
      overflow: hidden;

      .button-arrow {
        @include rem(bottom, $spacing-3xl);
        width: 64px;
        height: 64px;

        .atom-image {
          transform: scale(1.2);
        }
      }
    }

    .section-services {
      h2 {
        top: -10vh;
        left: -16vw;

        p {
          @include rem(font-size, $font-size-heading-3);
        }

        strong {
          @include rem(font-size, $font-size-heading-3);
        }

        .bubble-image {
          width: 240px;
          left: 48vw;
          top: 32vh;
        }
      }

      & > .bubble-image {
        width: 320px;
        position: absolute;
        top: 50%;
        left: 8%;
      }
    }

    .section-reviews {
      h2,
      h2 p,
      h2 p strong {
        @include rem(font-size, $font-size-heading-2);
        @include rem(margin-bottom, $spacing-xl);
      }
    }
  }

  @media #{$mq-xlarge} {
    .section-services {
      h2 {
        margin-bottom: $spacing-4xl;

        p {
          @include rem(font-size, $font-size-heading-2);
        }

        strong {
          @include rem(font-size, $font-size-heading-2);
        }
      }
    }
  }
}
</style>
