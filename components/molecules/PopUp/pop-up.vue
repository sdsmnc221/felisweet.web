<template>
  <atom-wrapper class="pop-up">
    <slot name="content"></slot>
    <bubble-image
      class="close-btn link"
      src="/images/close.svg"
      with-border
      :on-click="close"
    />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import BubbleImage from '../../atoms/BubbleImage'

export default {
  name: 'PopUp',
  components: { AtomWrapper, BubbleImage },
  props: {
    open: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.pop-up {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 80vh;
  transform: translate(-50%, -50%);
  background-color: $color-link-water;
  border-radius: 48px;
  overflow: visible;
  @include rem(padding, $spacing-m);
  z-index: 999;

  .bubble-image.close-btn {
    position: absolute;
    top: -72px;
    right: -36px;
    @include rem(padding, $spacing-m);
    transform: scale(0.64);
    background-color: transparentize($color-service-blue, 0.8);
    border-radius: $radius-full;

    &:hover {
      &::after {
        border: 4px dashed $color-shakespear-blue;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &::after {
      z-index: -1;
      display: block !important;
      background-image: none;
      border: 4px dashed $color-link-water;
      border-radius: $radius-full;
      transform: translate(-50%, -50%) scale(0);
      transition: all ease 0.64s;
    }
  }

  .popup-content {
    width: 100%;
    height: 100%;
    overflow: scroll;

    * {
      @include rem(font-size, $font-size-body-l);
    }

    a {
      color: $color-shakespear-blue;
    }

    iframe {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
    }

    &.credits {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      h2,
      h3 {
        margin-bottom: 32px;
      }
    }

    &.legals {
      padding: 32px;
      strong {
        font-weight: 700;
      }

      h3,
      h3 strong {
        text-align: center;
        @include rem(font-size, $font-size-heading-4);
        font-weight: 700;
        margin-bottom: 32px;
      }
    }
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px dashed $color-service-blue;
    background-color: rgba($color-link-water, 64%);
    border-radius: 48px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    z-index: -1;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -100vw;
    left: -100vh;
    width: 400vw;
    height: 400vh;
    overflow: hidden;
    backdrop-filter: blur(12px);
    background-color: transparentize($color-shakespear-blue, 0.8);
    z-index: -1;
  }

  @media #{$mq-large} {
    width: 64vw;
    height: 64vh;

    .bubble-image.close-btn {
      transform: scale(1);
      right: -72px;
    }
  }
}
</style>
