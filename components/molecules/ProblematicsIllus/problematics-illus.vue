<template>
  <atom-wrapper class="problematics-illus">
    <atom-wrapper class="problematics-wrapper">
      <atom-image :src="illustration" />
      <p>Alors on est là pour vous !</p>
      <h2>
        <b>FeliSweet</b> vous donne des <b>solutions</b> à (presque)
        <b>tous vos problèmes félins</b> !
      </h2>
    </atom-wrapper>
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
  props: {
    illustration: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.problematics-illus {
  overflow: hidden;
  padding-top: 60px;

  .problematics-wrapper {
    width: 112%;
    position: relative;
    @include rem(top, -$spacing-3xl);
    @include rem(left, $spacing-l);
  }

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
    text-align: center;
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
    position: relative;
    width: 108px;
    float: right;
    top: -48px;
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    overflow: visible;

    .problematics-wrapper {
      width: 50%;
    }

    p {
      @include rem(font-size, $font-size-body-s);
    }

    h2,
    b {
      @include rem(font-size, $font-size-body-m);
      right: 40%;
      top: 60%;
    }

    .problematics-cat {
      position: absolute;
      width: 120px;
      float: right;
      top: 98%;
      right: 24vw;
    }
  }

  @media #{$mq-medium} {
    p {
      @include rem(font-size, $font-size-body-l);
      transform: translateY(12px);
    }

    h2,
    b {
      @include rem(font-size, $font-size-body-l);
    }
  }
}
</style>
