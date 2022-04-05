<template>
  <div
    ref="scroll-reveal"
    class="scroll-reveal"
    :class="{
      '--top': top,
      '--bottom': bottom,
      '--left': left,
      '--right': right,
      '--scale': scale,
    }"
  >
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'ScrollRevealWrapper',
  props: {
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scrollTrigger(this.$refs['scroll-reveal'])
  },
  methods: {
    scrollTrigger(el, options = { rootMargin: '-160px' }) {
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
  position: relative;
  opacity: 0;
  transition: all $ease-out-sine 1.2s;

  &.--top {
    top: 20vh;
  }

  &.--bottom {
    top: -80vh;
  }

  &.--left {
    left: 20vw;
  }

  &.--right {
    right: 20vw;
  }

  &.--scale {
    transform: scale(0);
  }

  &.active {
    opacity: 1;
    transform: scale(1);
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
