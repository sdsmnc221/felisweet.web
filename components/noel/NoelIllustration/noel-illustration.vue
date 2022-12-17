<template>
  <div ref="main" class="noel-illustration">
    <img class="quote" src="/images/noel-quote.png" alt="" />
    <img class="illustration" src="/images/noel-illustration.svg" alt="" />
    <img class="gift-right" src="/images/noel-gift-r.png" alt="" />
    <img class="gift-left" src="/images/noel-gift-l.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'NoelIllustration',
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(1.2px);
    mix-blend-mode: multiply;
  }
}
</style>
