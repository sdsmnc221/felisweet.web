<script>
export default {
  name: 'AtomWrapper',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
    flex: {
      type: Boolean,
      default: false,
    },
    flexCenter: {
      type: Boolean,
      default: false,
    },
    flexRow: {
      type: Boolean,
      default: false,
    },
    flexCol: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, context) {
    const data = {
      ...context.data,
      class: {
        ...context.data.class,
        'atom-wrapper': true,
        '--full-height': context.props.fullHeight,
        '--flex': context.props.flex,
        '--flex-center': context.props.flexCenter,
        '--flex-row': context.props.flexRow,
        '--flex-col': context.props.flexCol,
      },
    }

    // Transparently pass any attributes, event listeners, children, etc.
    return createElement(context.props.tag, data, context.children)
  },
}
</script>

<style lang="scss">
.atom-wrapper {
  margin: 0 auto;
  max-width: 100vw;
  width: 100vw;
  position: relative;
  display: block;

  &.--full-height {
    min-height: 100vh;
  }

  &.--flex {
    display: flex;
  }

  &.--flex-center {
    justify-content: center;
    align-items: center;
  }

  &.--flex-row {
    flex-direction: row;
  }

  &.--flex-col {
    flex-direction: column;
  }
}
</style>
