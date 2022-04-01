<template>
  <button class="button-arrow" :style="cssProps" @click="onClick">
    <atom-image
      src="/images/arrow.svg"
      :width="24"
      :height="24"
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

  .atom-image {
    &.--down {
    }
  }
}
</style>
