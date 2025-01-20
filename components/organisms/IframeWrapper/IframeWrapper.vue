<template>
  <div class="iframe-container">
    <iframe
      :src="iframeUrl"
      :title="title"
      frameborder="0"
      class="embedded-frame"
      :style="{ height: height + 'px' }"
      @load="handleIframeLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'IframeWrapper',
  props: {
    iframeUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 800,
    },
  },
  methods: {
    handleIframeLoad() {
      // Handle iframe loading completion
      this.$emit('iframe-loaded')
    },
  },
}
</script>

<style scoped>
.iframe-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.embedded-frame {
  width: 100%;
  min-height: 100vh;
  border: none;
}
</style>
