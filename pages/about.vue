// pages/about.vue - Enhanced version with debugging and error handling
<template>
  <atom-wrapper tag="main">
    <!-- Loading indicator for debugging -->
    <div v-if="isLoading" class="debug-loader">
      <p>Loading about page... {{ loadingStep }}</p>
    </div>

    <atom-wrapper
      tag="section"
      v-for="(slice, index) in slices"
      :key="`slice-about${index}`"
      v-show="!isLoading"
    >
      <component
        :is="getComponent(slice.type)"
        :data="slice.data"
        :ref="`component-${index}`"
      />
    </atom-wrapper>

    <paws-pattern :paws-per-section="4" v-show="!isLoading" />
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
import SliderFormation from '../components/organisms/SliderFormation'

import aboutTitleAdapter from '../utils/adapters/aboutTitle'
import rectTextAdapter from '../utils/adapters/rectText'
import roundTextAdapter from '../utils/adapters/roundText'
import sliderFormationAdapter from '../utils/adapters/sliderFormation'
import aboutContactAdapter from '../utils/adapters/aboutContact'

export default {
  name: 'AboutPage',
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
    const startTime = Date.now()
    console.log('About page asyncData started')

    try {
      const document = await $prismic.api.getSingle('about_page')

      const data = document?.data

      console.log('About page data loaded in', Date.now() - startTime, 'ms')

      if (!data) {
        console.error('No data found for about page')
        error({ statusCode: 404, message: 'Page not found' })
        return
      }

      // Process slices with error handling for each adapter
      const slices = []

      for (let i = 0; i < data.slices.length; i++) {
        const slice = data.slices[i]
        const { slice_type: type } = slice

        try {
          let adaptedData = {}

          const adapters = {
            about_title_block: () => aboutTitleAdapter($prismic, slice),
            rect_text_block: () => rectTextAdapter($prismic, slice),
            round_text_block: () => roundTextAdapter($prismic, slice),
            formation: () => sliderFormationAdapter($prismic, slice),
            about_contact: () =>
              aboutContactAdapter($prismic, $enhancedLinkSerializer, slice),
          }

          if (adapters[type]) {
            adaptedData = await adapters[type]()
          } else {
            console.warn(`Unknown slice type: ${type}`)
          }

          slices.push({
            type,
            data: adaptedData,
            index: i,
            priority: i < 3 ? 'high' : 'low',
          })
        } catch (adapterError) {
          console.error(`Error processing slice ${i} (${type}):`, adapterError)
          // Continue with other slices instead of failing completely
        }
      }

      console.log(
        'About page asyncData completed in',
        Date.now() - startTime,
        'ms'
      )
      return { slices }
    } catch (err) {
      console.error('Error loading about page:', err)

      // Provide fallback data instead of hard error
      if (err.message === 'API call timeout') {
        error({
          statusCode: 408,
          message: 'Request timeout - please try again',
        })
      } else {
        error({ statusCode: 500, message: 'Server error' })
      }
    }
  },
  data() {
    return {
      slices: [],
      scrollRevealInstances: [],
      intersectionObserver: null,
      isLoading: true,
      loadingStep: 'Initializing...',
      loadingTimeout: null,
    }
  },
  mounted() {
    console.log('About page mounted')
    this.loadingStep = 'Setting up animations...'

    // Use a more appropriate timing mechanism for mounted hook
    this.loadingTimeout = this.createSafetyTimeout()

    this.$nextTick(() => {
      this.setupInitialAnimations()
      this.setupPerformanceOptimizations()
      this.loadingStep = 'Ready'
      this.isLoading = false

      // Clear timeout since we completed successfully
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout)
        this.loadingTimeout = null
      }
    })
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    createSafetyTimeout() {
      // Create safety timeout in a separate method to avoid timing issues
      return setTimeout(() => {
        console.error('About page loading timeout - forcing completion')
        this.forceLoadingComplete()
      }, 10000) // 10 second timeout
    },

    forceLoadingComplete() {
      this.isLoading = false
      this.loadingStep = 'Completed (forced)'

      // Ensure animations are set up even if there was an error
      this.$nextTick(() => {
        this.setupInitialAnimations()
        this.setupPerformanceOptimizations()
      })
    },

    setupInitialAnimations() {
      try {
        // Only set up animations if GSAP is available and elements exist
        if (this.$gsap && this.$el) {
          const sections = this.$el.querySelectorAll('section')
          if (sections.length > 0) {
            this.$gsap.set(sections, {
              autoAlpha: 0,
              y: 50,
            })
          }
        }
      } catch (animationError) {
        console.error('Error setting up initial animations:', animationError)
      }
    },

    getComponent(sliceType) {
      const components = {
        about_title_block: AboutTitleBlock,
        rect_text_block: RectTextBlock,
        round_text_block: RoundTextBlock,
        formation: SliderFormation,
        about_contact: AboutContact,
      }

      return components[sliceType] || null
    },

    setupPerformanceOptimizations() {
      try {
        // Check if IntersectionObserver is supported
        if (typeof IntersectionObserver === 'undefined') {
          console.warn(
            'IntersectionObserver not supported, skipping scroll animations'
          )
          return
        }

        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const section = entry.target
              const isVisible = entry.isIntersecting

              if (isVisible && this.$gsap) {
                this.$gsap.to(section, {
                  autoAlpha: 1,
                  y: 0,
                  ease: 'sine.out',
                  duration: 0.8,
                })

                const wrappers = section.querySelectorAll('.atom-wrapper')
                if (wrappers.length > 0) {
                  this.$gsap.fromTo(
                    wrappers,
                    {
                      autoAlpha: 0,
                      y: 50,
                    },
                    {
                      autoAlpha: 1,
                      y: 0,
                      ease: 'sine.out',
                      duration: 0.8,
                      delay: 0.4,
                    }
                  )
                }

                this.intersectionObserver.unobserve(section)
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '100px',
          }
        )

        this.$nextTick(() => {
          if (this.$el) {
            const sections = this.$el.querySelectorAll('section')
            sections.forEach((section) => {
              this.intersectionObserver.observe(section)
            })
          }
        })
      } catch (observerError) {
        console.error(
          'Error setting up performance optimizations:',
          observerError
        )
      }
    },

    cleanup() {
      console.log('About page cleanup started')

      // Clear loading timeout
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout)
        this.loadingTimeout = null
      }

      // Disconnect intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }

      // Cleanup GSAP animations more carefully
      try {
        if (this.$gsap && this.$el) {
          const elements = this.$el.querySelectorAll('*')
          elements.forEach((element) => {
            this.$gsap.killTweensOf(element)
          })
        }
      } catch (cleanupError) {
        console.error('Error during cleanup:', cleanupError)
      }

      console.log('About page cleanup completed')
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

  .debug-loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;

    p {
      margin: 0;
      font-size: 14px;
      color: #333;
    }
  }

  @media #{$mq-medium} {
    img.-with-border {
      top: $spacing-2xl;
    }
  }
}
</style>
