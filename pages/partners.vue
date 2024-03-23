<template>
  <atom-wrapper tag="main">
    <scroll-reveal-wrapper :top="200">
      <partners-banner :data="slices[0].data"></partners-banner>
    </scroll-reveal-wrapper>

    <scroll-reveal-wrapper :top="200">
      <atom-wrapper tag="section" class="partners-description">
        <p v-html="slices[1].data.text"></p>
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <scroll-reveal-wrapper :top="200">
      <atom-wrapper tag="section" class="partners-partners">
        <rect-picto
          v-for="(partner, index) in slices[2].data"
          :key="`patternaire-${index}`"
          :variant="index % 2 === 0 ? 'blue' : 'white'"
          :logo="partner.logo"
          :link="partner.link"
          :text="partner.name"
        ></rect-picto>
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <paws-pattern :paws-per-section="4" />
  </atom-wrapper>
</template>

<script>
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'
import PawsPattern from '../components/organisms/Paws-Pattern'
import AtomWrapper from '../components/atoms/AtomWrapper'
import PartnersBanner from '../components/molecules/PartnersBanner'
import RectPicto from '../components/molecules/RectPicto/rect-picto.vue'

import imageAdapter from '../utils/adapters/imageAdapter'
import partnersDescription from '../utils/adapters/partnersDescription'
import parnersUsers from '../utils/adapters/parnersUsers'

export default {
  name: 'PartnerPage',
  components: {
    ScrollRevealWrapper,
    PawsPattern,
    AtomWrapper,
    PartnersBanner,
    RectPicto,
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
    const document = await $prismic.api.getSingle('partnerspage')

    const data = document?.data
    delete data.page_title

    const getAdapter = (key, slice) => {
      let data = {}

      switch (key) {
        case 'banner':
          data = imageAdapter(slice)
          break
        case 'description':
          data = partnersDescription($prismic, slice)
          break
        case 'partners':
          data = parnersUsers($prismic, $enhancedLinkSerializer, slice)
          break
        default:
          break
      }

      return { data }
    }

    if (data) {
      return {
        slices: Object.entries(data).map((entry) => {
          const [key, slice] = entry
          return {
            type: `partners_${key}`,
            ...getAdapter(key, slice),
          }
        }),
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    getComponent(sliceType) {
      switch (sliceType) {
        case 'partners_banner':
          return PartnersBanner
        default:
          return AtomWrapper
      }
    },
  },
  mounted() {
    setTimeout(() => {
      console.log(this.slices)
    }, 2000)
  },
}
</script>

<style lang="scss">
main {
  overflow: hidden;
  background: linear-gradient(180deg, #eef9ff 0%, #87bccf 100%);

  .scroll-reveal:first-of-type {
    @include rem(margin-top, $spacing-5xl);
  }

  .partners {
    &-banner {
      z-index: 3;
    }
    &-description {
      position: relative;
      z-index: 1;
      top: -24vh;

      width: calc(100% - 64px);
      background-color: $color-white;
      padding: 32px;
      padding-top: 14vh;
      padding-bottom: 48px;
      margin: 0 32px;
      border-radius: 48px;

      * {
        margin: 0;
        padding: 0;
        color: $color-service-blue;
        font-family: $font-family-quicksand;
        font-size: $font-size-heading-5;
        text-align: center;
        font-weight: $weight-bold;
      }

      strong {
        font-weight: $weight-medium !important;
        color: $color-jellybean-blue;
      }
    }
    &-partners {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
      justify-content: center;
      align-items: center;
      margin-bottom: 64px;
      margin-top: -64px;
    }
  }

  @media #{$mq-medium} {
  }

  @media #{$mq-xlarge} {
  }
}
</style>
