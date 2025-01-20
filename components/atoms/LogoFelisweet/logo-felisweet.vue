<template>
  <atom-wrapper tag="picture" class="logo-felisweet" :style="cssProps">
    <div v-if="hideLogo" class="logo-placeholder"></div>
    <nuxt-link
      v-else-if="!noLink && link"
      :to="link.href || link.field.url"
      class="link"
    >
      <atom-image :src="image.filename" :alt="image.alt" />
    </nuxt-link>
    <atom-image v-else :src="image.filename" :alt="image.alt" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../AtomWrapper'
import AtomImage from '../AtomImage'

export default {
  name: 'LogoFelisweet',
  components: { AtomWrapper, AtomImage },
  props: {
    hideLogo: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Object,
      required: true,
    },
    link: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: '64vw',
    },
    noLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cssProps() {
      return {
        '--size': this.size,
      }
    },
  },
}
</script>

<style lang="scss">
.logo-felisweet {
  width: var(--size);

  .logo-placeholder {
    width: 100%;
    padding-top: 100%;
  }
}
</style>
