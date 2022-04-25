<template>
  <atom-wrapper tag="picture" class="logo-felisweet" :style="cssProps">
    <nuxt-link to="/" class="link">
      <atom-image src="/images/logo.svg" alt="FeliSweet's Logo" />
    </nuxt-link>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../AtomWrapper'
import AtomImage from '../AtomImage'

export default {
  name: 'LogoFelisweet',
  components: { AtomWrapper, AtomImage },
  props: {
    size: {
      type: String,
      default: '64vw',
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
}
</style>
