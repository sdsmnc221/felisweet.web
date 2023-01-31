<template>
  <atom-wrapper tag="main">
    <scroll-reveal-wrapper
      v-for="(slice, index) in slices"
      :key="`slice-about${index}`"
      :top="200"
    >
      <atom-wrapper tag="section">
        <component :is="getComponent(slice.type)" :data="slice.data" />
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <paws-pattern :paws-per-section="4" />
  </atom-wrapper>
</template>

<script>
import PawsPattern from '../components/organisms/Paws-Pattern'
import AtomWrapper from '../components/atoms/AtomWrapper'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'
import AboutTitleBlock from '../components/molecules/AboutTitleBlock'
import RectTextBlock from '../components/molecules/RectTextBlock'
import RoundTextBlock from '../components/molecules/RoundTextBlock'
import AboutContact from '../components/molecules/AboutContact'

import aboutTitleAdapter from '../utils/adapters/aboutTitle'
import rectTextAdapter from '../utils/adapters/rectText'
import roundTextAdapter from '../utils/adapters/roundText'

export default {
  name: 'IndexPage',
  components: {
    PawsPattern,
    AtomWrapper,
    ScrollRevealWrapper,
    AboutTitleBlock,
    RectTextBlock,
    RoundTextBlock,
    AboutContact,
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
    const document = await $prismic.api.getSingle('about_page')

    const data = document?.data

    const getAdapter = (slice) => {
      const { slice_type: type } = slice
      let data = {}

      switch (type) {
        case 'about_title_block':
          data = aboutTitleAdapter($prismic, slice)
          break
        case 'rect_text_block':
          data = rectTextAdapter($prismic, slice)
          break
        case 'round_text_block':
          data = roundTextAdapter($prismic, slice)
          break
        // case 'about_contact':
        //   return AboutContact
        default:
          break
      }

      return { type, data }
    }

    console.log(data.slices)

    if (data) {
      return {
        slices: data.slices.map((slice) => ({
          type: slice.slice_type,
          ...getAdapter(slice),
        })),
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    getComponent(sliceType) {
      switch (sliceType) {
        case 'about_title_block':
          return AboutTitleBlock
        case 'rect_text_block':
          return RectTextBlock
        case 'round_text_block':
          return RoundTextBlock
        case 'about_contact':
          return AboutContact
        default:
          return null
      }
    },
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

  @media #{$mq-medium} {
  }

  @media #{$mq-xlarge} {
  }
}
</style>
