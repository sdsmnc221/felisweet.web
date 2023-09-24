<template>
  <atom-wrapper tag="main">
    <div class="iframe-wrapper">
      <iframe
        ref="iframe"
        loading="lazy"
        src="https://www.canva.com/design/DAFvX8wacAs/6QOIEk_m2YhEuQJ1ixs4cQ/view?embed"
        allowfullscreen="allowfullscreen"
        allow="fullscreen"
      >
      </iframe>
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
export default {
  name: 'ChachouBible',
  components: { AtomWrapper },
  props: {},
  methods: {
    iframeRef(frameRef) {
      return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
main {
  overflow: hidden;
  background: linear-gradient(180deg, #eef9ff 0%, #87bccf 100%);

  .iframe-wrapper {
    position: relative;
    width: auto;
    height: 100vh;
    padding: 0;
    margin: 0;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      margin: 0;
    }
  }

  .scroll-reveal:first-of-type {
    @include rem(margin-top, $spacing-5xl);
  }

  @media #{$mq-medium} {
  }

  @media #{$mq-xlarge} {
  }
}
</style>
