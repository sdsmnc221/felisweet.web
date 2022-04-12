<template>
  <button class="button-arrow" :style="cssProps" @click="onClick">
    <atom-image
      src="/images/arrow.svg"
      :width="arrowSize"
      :height="arrowSize"
      :fluid="false"
      :class="`--${direction}`"
    />
  </button>
</template>

<script>
import AtomImage from '../AtomImage'
export default {
  name: 'ButtonArrow',
  components: { AtomImage },
  props: {
    direction: {
      type: String,
      default: 'down',
    },
    size: {
      type: Number,
      default: 46,
    },
    arrowSize: {
      type: Number,
      default: 24,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    cssProps() {
      return {
        '--size': this.size + 'px',
      }
    },
  },
}
</script>

<style lang="scss">
.button-arrow {
  outline: none;
  border: none;
  background-color: $color-link-water;
  border-radius: $radius-full;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--size);
  height: var(--size);
  border: 6px solid transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: var(--size);
    height: var(--size);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.64s ease;
    border-radius: $radius-full;
    border: 2px dashed transparent;
  }

  &:hover {
    &::after {
      opacity: 1;
      border: 2px dashed $color-link-water;
      transform: translate(-50%, -50%) scale(2);
    }
  }

  .atom-image {
    &.--down {
    }
    &.--left {
      transform: rotate(90deg);
    }
    &.--right {
      transform: rotate(-90deg);
    }
  }
}
</style>
