<template>
  <atom-wrapper tag="picture" class="logo-felisweet">
    <nuxt-link to="/">
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
}
</script>

<style lang="scss">
.logo-felisweet {
  width: 64vw;
}
</style>
