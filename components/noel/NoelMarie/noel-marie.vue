<template>
  <div ref="main" class="noel-marie">
    <img ref="marie" class="marie" src="/images/noel/noel-marie-2.gif" alt="" />
    <canvas
      ref="canvas"
      :width="$store.state.isMobile ? '320px' : '640px'"
      :height="$store.state.isMobile ? '320px' : '640px'"
    ></canvas>
    <img
      ref="instruction"
      class="instruction"
      src="/images/noel/noel-section2-instruction.png"
      alt=""
    />
  </div>
</template>

<script>
import Scratch from '../../../utils/scratch'
export default {
  name: 'NoelMarie',
  data() {
    return {
      tl: null,
    }
  },
  mounted() {
    this.tl = this.$gsap
      .timeline({ paused: true })
      .fromTo(
        this.$refs.canvas,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2.4,
          ease: 'circ.in',
          onComplete: () => {
            this.$emit('showTitle')
            Scratch(
              this.$refs.canvas,
              this.$refs.marie,
              this.$refs.instruction,
              this.$gsap
            )
          },
        },
        0
      )
      .to(
        this.$refs.marie,
        { opacity: 1, scale: 1, duration: 0.6, ease: 'circ.in' },
        '4.8'
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
        '4.8'
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
.noel-marie {
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

  .marie {
    position: absolute;
    display: block;
    height: 72%;
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    z-index: 1;
    opacity: 0;
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
}
</style>
