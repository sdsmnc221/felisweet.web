<template>
  <div ref="main" class="noel-ebook">
    <iframe
      ref="iframe"
      allowfullscreen="allowfullscreen"
      scrolling="no"
      src="https://heyzine.com/flip-book/017363908b.html"
    />
    <img
      ref="title"
      class="title"
      src="/images/noel-section5-title.gif"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'NoelEbook',
  data() {
    return {
      tl: null,
    }
  },
  mounted() {
    const svgFrame = this.$refs.main.parentNode.querySelector('svg')
    const { height } = svgFrame.getBoundingClientRect()

    if (!this.$store.state.isMobile)
      this.$gsap.set(this.$refs.iframe, {
        width: 'auto',
        height: (height * 72) / 100 + 'px',
      })

    this.tl = this.$gsap
      .timeline({ paused: true })
      .to(
        this.$refs.title,
        {
          scale: this.$store.state.isMobile ? 1.2 : 1,
          bottom: '-2%',
          left: this.$store.state.isMobile ? '2%' : '-4%',
          xPercent: 0,
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
.noel-ebook {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    pointer-events: none;
    position: absolute;
    width: auto;
    height: 60%;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%) scale(1.2);
    z-index: 1;
  }
  iframe {
    position: relative;
    z-index: 0;
    flex: 1;
    height: 100%;
    border: none;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
