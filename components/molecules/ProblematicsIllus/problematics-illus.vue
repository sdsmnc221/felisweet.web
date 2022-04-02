<template>
  <atom-wrapper class="problematics-illus">
    <atom-image src="/images/illus-problematics.svg" />
    <p>Alors on est là pour vous !</p>
    <h2>
      <b>FeliSweet</b> vous donne des <b>solutions</b> à (presque)
      <b>tous vos problèmes félins</b> !
    </h2>
    <atom-image
      src="/images/illus-problematics-cat.svg"
      class="problematics-cat"
    />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'ProblematicsIllus',
  components: { AtomWrapper, AtomImage },
}
</script>

<style lang="scss">
.problematics-illus {
  width: 112%;
  position: relative;
  @include rem(top, -$spacing-3xl);
  @include rem(left, $spacing-l);
  @include rem(margin-bottom, $spacing-5xl * 1.6);

  p,
  h2 {
    position: absolute;
    color: $color-white;
  }

  p {
    width: 24%;
    top: 46%;
    left: 16%;
    transform: rotate(-3.2deg);
    text-transform: uppercase;
    @include rem(font-size, $font-size-body-xs);
  }

  h2 {
    width: 26%;
    top: 58%;
    right: 39%;
    text-align: center;
    transform: rotate(-20deg);

    b {
      font-weight: $weight-bold;
    }
  }

  .problematics-cat {
    position: absolute;
    width: 108px;
    bottom: -22%;
    right: 5%;
  }
}
</style>
