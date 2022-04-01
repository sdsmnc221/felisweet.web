<template>
  <atom-wrapper tag="main">
    <atom-wrapper tag="section" full-height flex flex-center>
      <hero-illus />
    </atom-wrapper>
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
import HeroIllus from '../components/molecules/HeroIllus'

export default {
  name: 'IndexPage',
  components: { AtomWrapper, HeroIllus },
}
</script>
