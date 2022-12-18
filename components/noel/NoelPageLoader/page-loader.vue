<template>
  <div class="page-loader">
    <img src="/images/noel-title.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'NoelPageLoader',
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
}
</style>
