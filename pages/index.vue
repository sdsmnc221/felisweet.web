<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      ref="hero"
      tag="section"
      full-height
      flex
      flex-center
      class="section-hero"
    >
      <hero-banner v-bind="heroBanner" />
      <button-arrow
        ref="scrollDown"
        direction="down"
        :size="46"
        :arrow-size="24"
        :on-click="scrollDown"
      />
    </atom-wrapper>

    <scroll-reveal-wrapper>
      <atom-wrapper
        ref="sectionProblematics"
        tag="section"
        full-height
        flex
        flex-center
        flex-col
        class="section-problematics"
      >
        <slider-questions :questions="problematics.block" />
        <problematics-illus
          :illustration="problematics.illustration"
          :content="[problematics.text1, problematics.text2]"
        />
        <atom-image class="problematics-paw" src="/images/paw.svg" />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
      <atom-wrapper
        tag="section"
        flex
        flex-center
        flex-col
        class="section-services"
      >
        <h2>
          <div v-html="services.title" />
          <bubble-image :src="services.image" />
        </h2>
        <service-block
          v-for="(service, index) in services.block"
          :key="'servive' + index"
          :title="service.title"
          :description="service.description"
          :image-pos="service.imagePos"
          :image-src="service.imageSrc"
        />
        <bubble-image src="images/illus-services-bowl.svg" :size="148" />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
      <atom-wrapper
        tag="section"
        flex
        flex-center
        flex-col
        class="section-reviews"
      >
        <h2 v-html="reviews.title" />
        <slider-reviews
          :reviews="reviews.block"
          :reviews-label="reviews.detailLabel"
          :reviews-link="reviews.link"
        />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
      <atom-wrapper
        id="contact"
        tag="section"
        flex
        flex-center
        class="section-contact"
      >
        <contact-banner
          ref="contact"
          :data="contactBanner"
          :open-planning="openPlanning"
        />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <paws-pattern :paws-per-section="6" />
  </atom-wrapper>
</template>

<script>
import { nextTick } from 'vue'

import AtomWrapper from '../components/atoms/AtomWrapper'
import AtomImage from '../components/atoms/AtomImage'
import BubbleImage from '../components/atoms/BubbleImage'
import ButtonArrow from '../components/atoms/ButtonArrow'
import ProblematicsIllus from '../components/molecules/ProblematicsIllus'
import ServiceBlock from '../components/molecules/ServiceBlock'
import SliderQuestions from '../components/molecules/SliderQuestions'
import ContactBanner from '../components/organisms/ContactBanner'
import HeroBanner from '../components/organisms/HeroBanner'
import PawsPattern from '../components/organisms/Paws-Pattern'
import SliderReviews from '../components/organisms/SliderReviews'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'

import imageAdapter from '../utils/adapters/imageAdapter'
import moduleHeroBannerAdapter from '../utils/adapters/heroBanner'
import moduleServiceAdapter from '../utils/adapters/moduleService'
import moduleReviewAdapter from '../utils/adapters/moduleReview'
import moduleContactBannerAdapter from '../utils/adapters/contactBanner'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    AtomImage,
    HeroBanner,
    ButtonArrow,
    SliderQuestions,
    ProblematicsIllus,
    BubbleImage,
    ServiceBlock,
    SliderReviews,
    ContactBanner,
    PawsPattern,
    ScrollRevealWrapper,
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
    const document = await $prismic.api.getSingle('home_page')

    const moduleHeroBanner = await $prismic.api.getByID(
      document?.data?.module_hero_banner?.id
    )
    const moduleLogoIllustration = await $prismic.api.getByID(
      moduleHeroBanner?.data?.illustration_logo?.id
    )
    const moduleLogo = await $prismic.api.getByID(
      moduleHeroBanner?.data?.module_logo?.id
    )

    const problematicsBlock = Object.entries(document?.data?.slices).find(
      (slice) => slice[1].slice_type === 'problematics_block'
    )[1]
    const moduleProblematics = problematicsBlock?.items
    const problematics = {
      block: moduleProblematics.map(({ question }) => question),
      text1: $prismic.asHTML(problematicsBlock?.primary?.text_1),
      text2: $prismic.asHTML(problematicsBlock?.primary?.text_2),
      illustration: imageAdapter(problematicsBlock?.primary?.illustration)
        .filename,
    }

    const servicesBlock = Object.entries(document?.data?.slices).find(
      (slice) => slice[1].slice_type === 'services_block'
    )[1]
    const moduleServices = servicesBlock?.items
    const services = {
      block: [],
      title: $prismic.asHTML(servicesBlock?.primary?.title),
      image: imageAdapter(servicesBlock?.primary?.image)?.filename,
    }
    for (const service of moduleServices) {
      const moduleService = await moduleServiceAdapter(
        $prismic,
        service?.module_service?.id
      )
      if (moduleService) services.block.push(moduleService)
    }

    const reviewsBlock = Object.entries(document?.data?.slices).find(
      (slice) => slice[1].slice_type === 'reviews_block'
    )[1]
    const moduleReviews = reviewsBlock?.items
    const reviews = {
      block: moduleReviews.map((review) =>
        moduleReviewAdapter($prismic, review)
      ),
      title: $prismic.asHTML(reviewsBlock?.primary?.title),
      detailLabel: reviewsBlock?.primary?.detail_label,
      link: $enhancedLinkSerializer(reviewsBlock?.primary?.link),
    }

    const socialMediaBlock = Object.entries(document?.data?.slices).find(
      (slice) => slice[1].slice_type === 'social_media_block'
    )[1]
    const moduleSocialMedia = []
    if (socialMediaBlock) {
      for (const item of socialMediaBlock.items) {
        const socialMedia = await $prismic.api.getByID(
          item.module_social_media.id
        )
        moduleSocialMedia.push(socialMedia)
      }
    }

    const moduleContactBanner = await $prismic.api.getByID(
      document?.data?.module_contact_banner?.id
    )

    console.log(
      document,
      await $prismic.api.getByID(document?.data?.module_contact_banner?.id),
      moduleContactBanner
    )

    const moduleCatus = document?.data?.catus

    if (document) {
      const data = moduleHeroBanner?.data
      return {
        ...(data
          ? {
              heroBanner: await moduleHeroBannerAdapter({
                $prismic,
                $enhancedLinkSerializer,
                data,
                moduleLogo,
                moduleLogoIllustration,
              }),
              problematics,
              services,
              reviews,
              contactBanner: moduleContactBannerAdapter(
                $prismic,
                moduleContactBanner,
                moduleSocialMedia,
                moduleCatus
              ),
            }
          : {}),
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted() {
    if (this.$route.hash.includes('#contact')) {
      nextTick(() => {
        setTimeout(() => {
          this.$refs.contact.$el.scrollIntoView(false)

          setTimeout(() => {
            window.scroll({
              top: window.scrollY + window.innerHeight * 0.72,
              left: 0,
              behavior: 'smooth',
            })

            this.$gsap.to([this.$refs.scrollDown.$el], {
              opacity: 1,
              scale: 1,
              duration: 2.4,
              ease: 'circ.in',
              delay: 6.4,
            })
          }, 600)
        }, 1200)
      })
    }
  },
  methods: {
    scrollDown() {
      this.$refs.sectionProblematics.scrollIntoView()
    },
    openPlanning() {
      this.openPopup(this.popupContentPlanning)
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
