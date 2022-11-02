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
  width: 64vw;
  height: 48vh;
  transform: translate(-50%, -50%);
  background-color: $color-link-water;
  border-radius: 48px;
  overflow: visible;
  @include rem(padding, $spacing-m);

  .bubble-image.close-btn {
    position: absolute;
    top: -72px;
    right: -72px;
    @include rem(padding, $spacing-m);
    background-color: rgba($color-link-water, 64%);
    border-radius: $radius-full;

    &:hover {
      &::after {
        border: 4px dashed $color-link-water;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &::after {
      z-index: -1;
      display: block !important;
      background-image: none;
      border: 4px dashed transparent;
      border-radius: $radius-full;
      transform: translate(-50%, -50%) scale(0);
      transition: all ease 0.64s;
    }
  }

  .popup-content {
    width: 100%;
    height: 100%;
    overflow: scroll;

    iframe {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
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
}
</style>
