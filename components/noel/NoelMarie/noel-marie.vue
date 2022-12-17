<template>
  <div ref="main" class="noel-marie">
    <img ref="marie" class="marie" src="/images/noel-marie-2.png" alt="" />
    <canvas
      ref="canvas"
      :width="$store.state.isMobile ? '320px' : '640px'"
      :height="$store.state.isMobile ? '320px' : '640px'"
    ></canvas>
  </div>
</template>

<script>
import Scratch from '../../../utils/scratch'
export default {
  name: 'NoelMarie',
  mounted() {
    Scratch(this.$refs.canvas, this.$refs.marie, this.$gsap)
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
    transform: translate(-50%, -50%);
    z-index: 0;
  }
}
</style>
