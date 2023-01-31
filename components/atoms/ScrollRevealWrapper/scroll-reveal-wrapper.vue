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
  },
  mounted() {
    ;[...this.$refs['scroll-reveal'].querySelectorAll('section > *')].forEach(
      (e) => this.$gsap.set(e, { autoAlpha: 0, y: 200 })
    )
    this.scrollTrigger(this.$refs['scroll-reveal'])
  },
  methods: {
    scrollTrigger(el, options = { rootMargin: this.rootMargin }) {
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: this.top !== 0 ? `top bottom-=${this.top}px` : 'top center',
        },
      })

      ;[...el.querySelectorAll('section > *')].forEach((e) => {
        tl.to(
          e,
          {
            autoAlpha: 1,
            y: 0,
            ease: 'sine.out',
          },
          '>'
        )
      })
    },
  },
}
</script>
