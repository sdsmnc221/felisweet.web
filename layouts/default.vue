<template>
  <div @scroll.passive="handleScroll">
    <site-header v-bind="header" />
    <Nuxt />
    <site-footer />
  </div>
</template>

<script>
import SiteFooter from '../components/organisms/SiteFooter'
import SiteHeader from '../components/organisms/SiteHeader'

export default {
  components: { SiteFooter, SiteHeader },
  data() {
    return {
      header: {
        showLogo: false,
      },
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(e) {
      // console.log(e)
    },
  },
}
</script>
