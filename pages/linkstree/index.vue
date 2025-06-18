<template>
  <atom-wrapper tag="main">{{ data }} </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../components/atoms/AtomWrapper/atom-wrapper.vue'

export default {
  name: 'LinksPage',
  components: {
    AtomWrapper,
  },
  layout: 'linkstree',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  async asyncData({ $prismic, error, route }) {
    const document = await $prismic.api.getByUID(
      'linkstreepage',
      route.params.id
    )

    const data = document?.data

    // eslint-disable-next-line no-console
    console.log(data)

    // const getAdapter = (slice) => {
    //   const { slice_type: type } = slice
    //   let data = {}

    //   switch (type) {
    //     case 'about_title_block':
    //       data = aboutTitleAdapter($prismic, slice)
    //       break
    //     case 'rect_text_block':
    //       data = rectTextAdapter($prismic, slice)
    //       break
    //     case 'round_text_block':
    //       data = roundTextAdapter($prismic, slice)
    //       break
    //     case 'formation':
    //       data = sliderFormationAdapter($prismic, slice)
    //       break
    //     case 'about_contact':
    //       data = aboutContactAdapter($prismic, $enhancedLinkSerializer, slice)
    //       break
    //     default:
    //       break
    //   }

    //   return { type, data }
    // }

    if (data) {
      return data
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  onBeforeMount() {
    this.$nuxt.setLayout('linkstree')
  },
  mounted() {
    console.log(this.layout)
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
