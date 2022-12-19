<template>
  <div class="rotate-screen">
    <img src="/images/noel/noel-rotate-screen.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: 'NoelRotateScreen',
}
</script>

<style lang="scss">
.rotate-screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-nepal-blue;

  img {
    width: 150%;
    height: auto;
  }
}
</style>
