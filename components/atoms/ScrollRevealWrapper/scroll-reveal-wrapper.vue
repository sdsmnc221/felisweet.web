<template>
  <div ref="scroll-reveal" class="scroll-reveal">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollRevealWrapper',
  mounted() {
    this.scrollTrigger(this.$refs['scroll-reveal'])
  },
  methods: {
    scrollTrigger(el, options = {}) {
      //   let els = document.querySelectorAll(selector)
      //   els = Array.from(els)
      //   els.forEach((el) => {
      //     this.addObserver(el, options)
      //   })
      this.addObserver(el, options)
    },

    addObserver(el, options) {
      if (!('IntersectionObserver' in window)) {
        if (options.cb) {
          options.cb(el)
        } else {
          //   entry.target.classList.add('active')
          el.classList.add('active')
        }
        return
      }
      const observer = new IntersectionObserver((entries, observer) => {
        // this takes a callback function which receives two arguments: the elemts list and the observer instance
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (options.cb) {
              options.cb(el)
            } else {
              entry.target.classList.add('active')
            }
            observer.unobserve(entry.target)
          }
        })
      }, options)
      observer.observe(el)
    },
  },
}
</script>

<style lang="scss">
.scroll-reveal {
  opacity: 0;
  transform: translateY(24vh);
  transition: all ease 1.2s;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
