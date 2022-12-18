<template>
  <div class="rotate-screen">
    <img src="/images/noel-rotate-screen.gif" alt="" />
  </div>
</template>

<script>
export default {
  name: 'NoelRotateScreen',
}
</script>

<style lang="scss">
.rotate-screen {
  flex: 1;
  width: 100vw;
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
