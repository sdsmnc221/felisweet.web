<template>
  <figure :class="`rect-picto --${variant}`">
    <a :href="link.href" target="_blank" :title="text">
      <atom-image :src="logo.filename" :alt="text" />
    </a>
  </figure>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'RectPicto',
  components: { AtomImage },
  props: {
    variant: {
      type: String,
      default: 'white',
    },
    logo: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    link: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.rect-picto {
  aspect-ratio: 1/1;
  border-radius: 48px;
  padding: 32px;
  max-width: 64%;

  &.--blue {
    background-color: $color-service-blue;
  }

  &.--white {
    background-color: $color-white;
  }

  img {
    object-fit: contain;
    aspect-ratio: 1/1;
    width: 100%;
    height: auto;
  }
}
</style>
