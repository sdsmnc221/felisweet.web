// components/atoms/ScrollRevealWrapper/scroll-reveal-wrapper.vue
<template>
  <div ref="scroll-reveal" class="scroll-reveal">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollRevealWrapper',
  props: {
    top: {
      type: Number,
      default: 0,
    },
    delay: {
      type: Number,
      default: 0,
    },
    cleanupOnExit: {
      type: Boolean,
      default: false,
    },
    stagger: {
      type: Number,
      default: 0.1,
    },
  },
  data() {
    return {
      timeline: null,
      scrollTriggerInstance: null,
      intersectionObserver: null,
      isVisible: false,
      hasAnimated: false,
    }
  },
  mounted() {
    this.initAnimations()
    if (this.cleanupOnExit) {
      this.setupVisibilityTracking()
    }
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    initAnimations() {
      const elements = [
        ...this.$refs['scroll-reveal'].querySelectorAll('section > *'),
      ]

      if (elements.length === 0) return

      // Set initial state with slight delay to prevent flash
      this.$nextTick(() => {
        elements.forEach((e) => this.$gsap.set(e, { autoAlpha: 0, y: 200 }))
      })

      // Create timeline with performance optimizations
      this.timeline = this.$gsap.timeline({
        delay: this.delay / 1000, // Convert ms to seconds
        scrollTrigger: {
          trigger: this.$refs['scroll-reveal'],
          start: this.top !== 0 ? `top bottom-=${this.top}px` : 'top center',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            this.isVisible = true
            this.hasAnimated = true
          },
          onLeave: () => {
            this.isVisible = false
          },
          onEnterBack: () => {
            this.isVisible = true
          },
          onLeaveBack: () => {
            this.isVisible = false
          },
          // Optimize performance
          refreshPriority: -1,
          fastScrollEnd: true,
        },
      })

      // Store reference to ScrollTrigger instance
      this.scrollTriggerInstance = this.timeline.scrollTrigger

      // Animate elements with stagger
      elements.forEach((e, index) => {
        this.timeline.to(
          e,
          {
            autoAlpha: 1,
            y: 0,
            ease: 'sine.out',
            duration: 0.8,
          },
          index * this.stagger
        )
      })
    },

    setupVisibilityTracking() {
      // Additional intersection observer for cleanup on exit
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && this.hasAnimated) {
              // Element has left viewport after being animated
              this.cleanupIfNecessary()
            }
          })
        },
        {
          threshold: -0.1,
          rootMargin: '-100% 0px -100% 0px', // Only trigger when completely out of view
        }
      )

      this.intersectionObserver.observe(this.$refs['scroll-reveal'])
    },

    cleanupIfNecessary() {
      // Only cleanup if memory usage is high
      if (performance.memory) {
        const usedMB = performance.memory.usedJSHeapSize / 1024 / 1024
        if (usedMB > 100) {
          // 100MB threshold
          this.performCleanup()
        }
      }
    },

    performCleanup() {
      if (this.timeline && !this.isVisible) {
        // Pause timeline to save resources
        this.timeline.pause()

        // Clear element transforms to free memory
        const elements = [
          ...this.$refs['scroll-reveal'].querySelectorAll('section > *'),
        ]
        elements.forEach((e) => {
          // Only clear if element is not visible
          const rect = e.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            this.$gsap.set(e, { clearProps: 'transform,opacity' })
          }
        })
      }
    },

    cleanup() {
      // Kill timeline and ScrollTrigger
      if (this.timeline) {
        this.timeline.kill()
        this.timeline = null
      }

      if (this.scrollTriggerInstance) {
        this.scrollTriggerInstance.kill()
        this.scrollTriggerInstance = null
      }

      // Disconnect intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }

      // Reset elements to prevent memory retention
      const elements = [
        ...this.$refs['scroll-reveal'].querySelectorAll('section > *'),
      ]
      elements.forEach((e) => this.$gsap.set(e, { clearProps: 'all' }))
    },
  },
}
</script>
