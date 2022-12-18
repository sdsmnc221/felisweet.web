<template>
  <div ref="main" class="noel-indication">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'NoelIndication',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$gsap.set(this.$refs.main, {
      height: this.$refs.main.parentNode.getBoundingClientRect().height + 'px',
    })
  },
}
</script>

<style lang="scss">
.noel-indication {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0 24%;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparentize($color: #000000, $amount: 0.32);
  z-index: 99;

  p {
    font-size: 1.6rem;
    text-align: center;
    font-family: 'Caveat', cursive;
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
      0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    color: #fff6a9;
  }
}
</style>
