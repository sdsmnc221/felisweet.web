<template>
  <nuxt-img
    :src="src"
    :sizes="sizes"
    :width="width"
    :height="height"
    :alt="alt"
    class="atom-image"
    :class="{ '--fluid': fluid }"
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
    fluid: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.atom-image {
  &.--fluid {
    display: inline-block;
    width: 100%;
    height: auto;
  }
}
</style>
