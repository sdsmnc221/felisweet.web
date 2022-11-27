<template>
  <atom-wrapper class="service-block">
    <h3>{{ title }}</h3>
    <p v-html="description" />
    <bubble-image
      :class="`--${imagePos}`"
      :src="imageSrc"
      with-border
      :size="101"
    />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import BubbleImage from '../../atoms/BubbleImage'

export default {
  name: 'ServiceBlock',
  components: { AtomWrapper, BubbleImage },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePos: {
      type: String,
      default: 'top',
    },
    imageSrc: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.service-block {
  @include rem(padding, $spacing-xl);

  &:first-of-type {
    h3 {
      text-align: left;
      @include rem(margin-left, $spacing-xl);
    }
  }

  &:last-of-type {
    h3 {
      text-align: right;
      @include rem(margin-right, $spacing-xl);
    }
  }

  h3 {
    color: $color-shakespear-blue;
    font-weight: $weight-bold;
    letter-spacing: 0.2px;
    @include rem(font-size, $font-size-body-l);
  }

  p {
    background-color: $color-service-blue;
    color: $color-white;
    @include rem(padding, $spacing-l);
    border-radius: 48px;
    text-align: justify;
    position: relative;
    top: -6px;
    z-index: -1;

    strong {
      font-weight: $weight-bold;
    }
  }

  .bubble-image {
    position: absolute;
    img {
      animation: rotating 16s linear infinite;
      transform-origin: center;
    }

    &.--top {
      top: -24px;
      left: 20%;
    }

    &.--bottom {
      bottom: -24px;
      right: 20%;
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    width: 40vw;

    &:first-of-type {
      top: -12vh;
      left: -16vw;
    }

    &:last-of-type {
      left: 16vw;
    }

    h3 {
      @include rem(font-size, $font-size-heading-4);
    }

    .bubble-image.--top {
      width: 160px;
      left: -10vw;
      top: 10vh;
    }

    .bubble-image.--bottom {
      width: 160px;
      left: -36vw;
      top: 10vh;
    }
  }

  @media #{$mq-tablet} {
    &:first-of-type {
      top: 0;
      left: -16vw;
    }

    h3 {
      @include rem(font-size, $font-size-body-l);
    }
  }

  @media #{$mq-xlarge} {
    h3,
    h3 p {
      @include rem(font-size, $font-size-heading-3);
    }

    p {
      @include rem(padding, $font-size-heading-4);
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
