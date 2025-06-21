<template>
  <atom-wrapper tag="main">
    <h1 class="banner__title">{{ pageTitle }}</h1>

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
        <div
          v-for="(chunk, chunkIndex) of chunkOfPartners"
          :key="`chunk-partners-${chunkIndex}`"
        >
          <rect-picto
            v-for="(partner, index) in chunk"
            :key="`patternaire-${index}`"
            :variant="
              chunkIndex % 2 === 0
                ? index % 2 === 0
                  ? 'blue'
                  : 'white'
                : index % 2 !== 0
                ? 'blue'
                : 'white'
            "
            :logo="partner.logo"
            :link="partner.link"
            :text="partner.name"
          ></rect-picto>
        </div>
      </atom-wrapper>
    </scroll-reveal-wrapper>

    <paws-pattern :paws-per-section="4" deep />
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

import { chunk } from '../utils/chunk'

export default {
  name: 'PartnerPage',
  components: {
    ScrollRevealWrapper,
    PawsPattern,
    AtomWrapper,
    PartnersBanner,
    RectPicto,
  },

  async asyncData({ $prismic, $enhancedLinkSerializer, error }) {
    const document = await $prismic.api.getSingle('partnerspage')

    const data = document?.data

    const pageTitle = data?.page_title || 'Nos partenaires'

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
        pageTitle,
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    chunkOfPartners() {
      return chunk(this.slices[2].data, 3)
    },
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
}
</script>

<style lang="scss">
main {
  overflow: hidden;
  background: linear-gradient(180deg, #eef9ff 0%, #87bccf 100%);

  position: relative;

  .scroll-reveal:first-of-type {
    @include rem(margin-top, $spacing-5xl);
  }

  .banner {
    width: 100vw;
    position: relative;

    @include rem(margin-bottom, $spacing-3xl);

    &__title {
      z-index: 10;
      position: absolute;
      @include rem(font-size, calc($font-size-heading-2));
      width: 100%;
      text-align: center;
      font-weight: bold;
      color: $color-service-blue;
      bottom: unset;
      top: 38vh;
      left: 50%;
      transform: translateX(-50%);
      text-shadow: -2px -2px 0 $color-white, 2px -2px 0 $color-white,
        -2px 2px 0 $color-white, 2px 2px 0 $color-white;
    }
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

      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media #{$mq-medium} {
    .scroll-reveal:first-of-type {
      background-image: url('/images/photo-banner-pattern.svg');
    }
    .partners {
      &-banner {
        width: 50%;
      }
      &-description {
        z-index: 4;
        padding: 64px;
        border-radius: 72px;
        width: 64%;
        margin: 0 auto;
        margin-top: -32px;

        * {
          font-size: $font-size-body-xl;
        }
      }
      &-partners {
        flex-wrap: wrap;
        flex-direction: column;
        gap: 32px;
        margin-top: 2vh;
        margin-bottom: 24vh;

        div {
          display: flex;
          flex-direction: row;
          gap: 32px;

          .rect-picto {
            width: 240px;
          }
        }
      }
    }

    .banner {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &__title {
        @include rem(font-size, calc($font-size-heading-1 * 1.2));
        @include rem(line-height, calc($font-size-heading-1 * 1.6));
        letter-spacing: -0.24rem;
        text-align: center;
        margin-left: 48px;
        top: 56vh;
        left: 50%;
      }

      .bubble-description {
        width: 16vw;
        max-height: 80%;
        position: absolute;
        transform: none;
        top: 12vh;
        left: 20vw;
        background-image: var(--bubble-desktop);
        background-size: 92% auto;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.8);

        p {
          color: $color-white;
          @include rem(font-size, $font-size-body-l);
          transform: rotate(4deg);
        }
      }
    }
  }

  @media #{$mq-xlarge} {
    .banner {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &__title {
        @include rem(font-size, calc($font-size-heading-1 * 2.2));
        top: 52vh;
        left: 50%;
        letter-spacing: -0.64rem;
      }
    }
  }
}
</style>
