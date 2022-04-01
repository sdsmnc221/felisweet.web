<template>
  <atom-wrapper tag="main">
    <hero-banner />
    <atom-wrapper tag="section" full-height flex flex-center>
      Problematiques
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Services
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Contact
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import HeroBanner from '../components/organisms/HeroBanner'

export default {
  name: 'IndexPage',
  components: { AtomWrapper, HeroBanner },
}
</script>
