// pages/about.vue - Optimized version with multiple scroll reveals
<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      tag="section"
      v-for="(slice, index) in slices"
      :key="`slice-about${index}`"
    >
      <component
        :is="getComponent(slice.type)"
        :data="slice.data"
        :ref="`component-${index}`"
      />
    </atom-wrapper>

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
  data() {
    return {
      slices: [],
      scrollRevealInstances: [], // Track instances for cleanup
      intersectionObserver: null,
    }
  },
  mounted() {
    this.$gsap.set([...document.querySelectorAll('section')], {
      autoAlpha: 0,
      y: 50,
    })

    this.setupPerformanceOptimizations()
  },
  beforeDestroy() {
    this.cleanup()
  },
  async asyncData({ $prismic, $enhancedLinkSerializer, error }) {
    try {
      const document = await $prismic.api.getSingle('about_page')
      const data = document?.data

      if (!data) {
        error({ statusCode: 404, message: 'Page not found' })
        return
      }

      // Optimize adapter processing with lazy loading for non-critical slices
      const slices = data.slices.map((slice, index) => {
        const { slice_type: type } = slice
        let adaptedData = {}

        // Use object lookup instead of switch for better performance
        const adapters = {
          about_title_block: () => aboutTitleAdapter($prismic, slice),
          rect_text_block: () => rectTextAdapter($prismic, slice),
          round_text_block: () => roundTextAdapter($prismic, slice),
          formation: () => sliderFormationAdapter($prismic, slice),
          about_contact: () =>
            aboutContactAdapter($prismic, $enhancedLinkSerializer, slice),
        }

        if (adapters[type]) {
          adaptedData = adapters[type]()
        }

        return {
          type,
          data: adaptedData,
          index,
          priority: index < 3 ? 'high' : 'low', // First 3 sections are high priority
        }
      })

      return { slices }
    } catch (err) {
      console.error('Error loading about page:', err)
      error({ statusCode: 500, message: 'Server error' })
    }
  },
  methods: {
    getComponent(sliceType) {
      // Use object lookup for better performance
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
      // Setup intersection observer to track visible sections
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const section = entry.target
            const isVisible = entry.isIntersecting

            // Only animate when coming into view, not when going out of view
            if (isVisible) {
              this.$gsap.to(section, {
                autoAlpha: 1,
                y: 0,
                ease: 'sine.out',
                duration: 0.8,
              })
              this.$gsap.fromTo(
                [...section.querySelectorAll('.atom-wrapper')],
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

              // Once animated in, stop observing this section to prevent fade-out
              this.intersectionObserver.unobserve(section)
            }
            // Remove the else clause that was causing fade-out behavior
          })
        },
        {
          threshold: 0.1,
          rootMargin: '100px', // Start animations slightly before element comes into view
        }
      )

      // Observe all sections after next tick
      this.$nextTick(() => {
        const sections = this.$el.querySelectorAll('section')
        sections.forEach((section) => {
          this.intersectionObserver.observe(section)
        })
      })

      // Memory cleanup interval
      this.memoryCleanupInterval = setInterval(() => {
        this.performMemoryCleanup()
      }, 60000) // Every minute
    },

    performMemoryCleanup() {
      // Check memory usage if available
      if (performance.memory) {
        const usedMB = performance.memory.usedJSHeapSize / 1024 / 1024
        console.log(`Memory usage: ${usedMB.toFixed(2)}MB`)

        // If memory usage is high, cleanup non-visible animations
        if (usedMB > 150) {
          // 150MB threshold
          this.cleanupNonVisibleAnimations()
        }
      }
    },

    cleanupNonVisibleAnimations() {
      // const sections = this.$el.querySelectorAll('section')
      // sections.forEach((section) => {
      //   const rect = section.getBoundingClientRect()
      //   const isVisible =
      //     rect.top < window.innerHeight + 200 && rect.bottom > -200
      //   if (!isVisible) {
      //     // Kill animations for non-visible sections
      //     const elements = section.querySelectorAll('*')
      //     elements.forEach((element) => {
      //       const tweens = this.$gsap.getTweensOf(element)
      //       tweens.forEach((tween) => tween.kill())
      //     })
      //   }
      // })
    },

    cleanup() {
      // Disconnect intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }

      // // Clear memory cleanup interval
      // if (this.memoryCleanupInterval) {
      //   clearInterval(this.memoryCleanupInterval)
      //   this.memoryCleanupInterval = null
      // }

      // // Cleanup all GSAP animations
      // this.$gsap.killTweensOf('*')

      // if (this.$gsap.ScrollTrigger) {
      //   this.$gsap.ScrollTrigger.killAll()
      // }
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
    img.-with-border {
      top: $spacing-2xl;
    }
  }

  @media #{$mq-xlarge} {
  }
}
</style>
