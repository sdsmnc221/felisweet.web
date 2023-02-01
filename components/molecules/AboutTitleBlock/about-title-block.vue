<template>
  <atom-wrapper class="about-title">
    <div
      v-if="data.text"
      class="text"
      :class="[data.classText]"
      v-html="data.text"
    />
    <atom-image
      v-if="data.image.filename"
      :src="data.image.filename"
      :alt="data.image.alt"
      :class="data.classImage"
    />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'AboutTitleBlock',
  components: { AtomWrapper, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.about-title {
  position: relative;
  margin: $spacing-2xl auto;
  z-index: 2;

  .text {
    position: relative;
    z-index: 1;

    * {
      font-family: $font-family-quicksand;
      font-style: normal;
      font-weight: $weight-medium;
      @include rem(font-size, $font-size-heading-3);
      line-height: 92%;
      text-align: center;
      color: $color-shakespear-blue;
      text-shadow: -1.6px -1.6px 0 $color-light-blue,
        1.6px -1.6px 0 $color-light-blue, -1.6px 1.6px 0 $color-light-blue,
        1.6px 1.6px 0 $color-light-blue;
    }

    strong {
      font-weight: $weight-bold;
    }

    em {
      font-weight: $weight-bold;
      font-style: normal;
      @include rem(font-size, 64px);
    }
  }

  .atom-image {
    &.-with-illus {
      display: block;
      width: 270px;
      height: 252px;
      margin: 0 auto;
      @include rem(margin-top, $spacing-3xl);
    }

    &.-with-little-house {
      width: 64px;
      height: 64px;
      position: absolute;
      z-index: 0;
      top: -32px;
      left: 16%;
    }

    &.-with-logo {
      display: block;
      width: 320px;
      height: 120px;
      margin: 0 auto;
      @include rem(margin-top, $spacing-xs);
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    .text {
      * {
        font-size: 72px;
      }
    }

    .atom-image {
      &.-with-little-house {
        width: 128px;
        height: 128px;
        left: 24%;
      }
      &.-with-illus {
        width: 32vw;
        height: auto;
        margin: $spacing-5xl auto;
      }
    }
  }
}
</style>
