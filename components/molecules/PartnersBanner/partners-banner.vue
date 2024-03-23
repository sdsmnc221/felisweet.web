<template>
  <atom-wrapper tag="section" class="partners-banner">
    <div class="top-content">
      <atom-image :src="data.filename" alt="Banner Partners" />
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'
export default {
  name: 'PartnersBanner',
  components: { AtomWrapper, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.top-content {
  position: relative;
  top: -72px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 160%;
  }
}
</style>
