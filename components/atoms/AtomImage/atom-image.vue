<template>
  <nuxt-img
    :src="src"
    :sizes="sizes"
    :width="width"
    :height="height"
    :alt="alt"
    class="atom-image fluid-img"
  />
</template>

<script>
export default {
  name: 'AtomImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    sizes: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      required: true,
      default: '',
    },
    height: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style lang="scss">
img.fluid-img {
  display: inline-block;
  width: 100%;
  height: auto;
}
</style>
