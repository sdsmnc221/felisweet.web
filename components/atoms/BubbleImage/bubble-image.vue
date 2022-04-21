<template>
  <atom-wrapper
    tag="figure"
    :style="cssProps"
    class="bubble-image"
    :class="{ '--with-border': withBorder }"
    @click="onClick"
  >
    <atom-image :src="src" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../AtomWrapper'
import AtomImage from '../AtomImage'

export default {
  name: 'BubbleImage',
  components: { AtomWrapper, AtomImage },
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 64,
    },
    withBorder: {
      type: Boolean,
      default: false,
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
.bubble-image {
  width: var(--size);
  height: var(--size);

  &.--with-border {
    @include rem(padding, $spacing-s);

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + $spacing-xs);
      height: calc(100% + $spacing-xs);
      border-radius: $radius-full;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%237FBBDDFF' stroke-width='6' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    &.--with-border {
      &::after {
        display: none;
      }
    }
  }
}
</style>
