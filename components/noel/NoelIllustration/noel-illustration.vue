<template>
  <div ref="main" class="noel-illustration">
    <img ref="quote" class="quote" src="/images/noel/noel-quote.png" alt="" />
    <img
      ref="illustration"
      class="illustration"
      src="/images/noel/noel-illustration.svg"
      alt=""
      @click="approach"
    />
    <img
      ref="giftL"
      class="gift-right"
      src="/images/noel/noel-gift-r.png"
      alt=""
    />
    <img
      ref="giftR"
      class="gift-left"
      src="/images/noel/noel-gift-l.png"
      alt=""
    />
    <img
      ref="instruction"
      class="instruction"
      src="/images/noel/noel-section3-instruction.png"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'NoelIllustration',
  data() {
    return {
      tl: null,
    }
  },
  mounted() {
    this.tl = this.$gsap
      .timeline({ paused: true })
      .fromTo(
        [
          this.$refs.giftL,
          this.$refs.giftR,
          this.$refs.illustration,
          this.$refs.quote,
        ],
        {
          opacity: 0,
          scale: 0.64,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          stagger: 0.48,
          ease: 'circ.in',
          onComplete: () => this.$emit('showTitle'),
        }
      )
      .fromTo(
        this.$refs.instruction,
        {
          opacity: 0,
          scale: 0.64,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'circ.in',
        },
        '7.2'
      )
  },
  methods: {
    approach() {
      const gifts = [this.$refs.giftL, this.$refs.giftR]
      const illus = this.$refs.illustration
      const quote = this.$refs.quote
      const instruction = this.$refs.instruction

      this.$refs.illustration.style.animation = 'none'

      this.$gsap
        .timeline()
        .to(
          instruction,
          {
            opacity: 0,
            scale: 0,
            ease: 'circ.in',
            duration: 1.2,
          },
          0
        )
        .to(
          gifts,
          {
            scale: 0.64,
            yPercent: -32,
            zIndex: 0,
            duration: 2.4,
            ease: 'circ.in',
            filter: 'blur(1.6px)',
          },
          0
        )
        .to(
          quote,
          {
            scale: 1.2,
            zIndex: 3,
            filter: 'blur(0)',
            duration: 3.6,
            ease: 'circ.in',
            mixBlendMode: 'normal',
            onStart: () =>
              this.$store.dispatch('playSound', { name: 'swoosh' }),
            onComplete: () =>
              this.$store.dispatch('playSound', { name: 'magic' }),
          },
          0
        )
        .to(
          illus,
          {
            scale: 0.72,
            yPercent: -32,
            xPercent: -50,
            duration: 2.4,
            ease: 'circ.in',
            filter: 'blur(1.2px)',
          },
          0
        )
    },
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
.noel-illustration {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    pointer-events: none;
  }
  canvas {
    position: relative;
    z-index: 1;
  }

  .illustration {
    position: absolute;
    display: block;
    height: 50%;
    width: auto;
    bottom: 18%;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: auto;
    filter: blur(0.64px);
    animation: tilt-shaking 1.2s linear infinite;

    &:hover {
      filter: blur(0) brightness(112%);
    }
  }
  .gift-left {
    position: absolute;
    display: block;
    height: 32%;
    width: auto;
    bottom: 16%;
    left: 24%;
  }
  .gift-right {
    position: absolute;
    display: block;
    height: 32%;
    width: auto;
    bottom: 16%;
    right: 24%;
  }
  .quote {
    position: absolute;
    display: block;
    height: 50%;
    width: auto;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    filter: blur(1.2px);
    mix-blend-mode: multiply;
  }

  .instruction {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    height: 32%;
    width: auto;
    animation: tilt-shaking 0.6s linear infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes tilt-shaking {
    0% {
      transform: translateX(-50%) rotate(0deg);
    }
    25% {
      transform: translateX(-50%) rotate(5deg);
    }
    50% {
      transform: translateX(-50%) rotate(0eg);
    }
    75% {
      transform: translateX(-50%) rotate(-5deg);
    }
    100% {
      transform: translateX(-50%) rotate(0deg);
    }
  }

  @media #{$mq-mobile-tablet} and (orientation:landscape) {
    .gift-left {
      left: 32%;
    }
    .gift-right {
      right: 32%;
    }
  }
}
</style>
