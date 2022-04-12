<template>
  <scroll-reveal-wrapper class="site-header">
    <atom-wrapper tag="header" flex flex-center>
      <logo-felisweet v-if="showLogo" />
    </atom-wrapper>
  </scroll-reveal-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'
import ScrollRevealWrapper from '../../atoms/ScrollRevealWrapper'

export default {
  name: 'SiteFooter',
  components: { AtomWrapper, LogoFelisweet, ScrollRevealWrapper },
  props: {
    showLogo: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 999;
  display: none;
}
</style>
