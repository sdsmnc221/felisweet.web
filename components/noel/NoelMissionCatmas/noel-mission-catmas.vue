<template>
  <div ref="main" class="noel-mission-catmas">
    <img
      ref="title"
      class="title"
      src="/images/noel-section4-title.png"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'NoelMissionCatmas',
  data() {
    return {
      tl: null,
    }
  },
  mounted() {
    this.tl = this.$gsap
      .timeline({ paused: true })
      .to(
        this.$refs.title,
        {
          scale: 0.84,
          top: '-18%',
          left: '50%',
          xPercent: -50,
          yPercent: 0,
          x: 0,
          y: 0,
          duration: 3.6,
          ease: 'circ.in',
        },
        0
      )
      .fromTo(
        this.$refs.iframe,
        { opacity: 0, scale: 0, pointerEvents: 'none' },
        {
          opacity: 1,
          scale: 1,
          duration: 2.4,
          ease: 'circ.in',
          pointerEvents: 'auto',
        },
        '>'
      )
  },
  methods: {
    startTL() {
      if (this.tl) this.tl.play()
    },
    resetTL() {
      if (this.tl) this.tl.reverse()
    },
  },
}
</script>

<style lang="scss">
.noel-mission-catmas {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    pointer-events: none;
    position: absolute;
    height: auto;
    width: 28%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}
</style>
