<template>
  <div class="page-loader">
    <img v-if="!$store.state.isMobiile || ($store.state.isMobile && $store.state.isLandscape)" class="img" src="/images/noel/noel-sound-ok.gif" alt="" @click="() => click(false)" />
    <img src="/images/noel/noel-title.gif" alt="" />
    <img v-if="!$store.state.isMobiile || ($store.state.isMobile && $store.state.isLandscape)" class="img" src="/images/noel/noel-sound-ko.gif" alt="" @click="() => click(true)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoelPageLoader',
  methods: {
    click(soundOn) {
      this.$store.dispatch('setMute', {mute: soundOn})
      this.$store.dispatch('setLoading', { loading: false })
    }
  },
}
</script>

<style lang="scss">
.page-loader {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-nepal-blue;

  img {
    display: block;
    width: auto;
    height: 50%;
  }
    .img {
      display: block;
      width: auto;
      height: 120px;
    }
}
</style>
