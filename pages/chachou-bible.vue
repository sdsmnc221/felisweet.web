<template>
  <atom-wrapper tag="main">
    <div class="iframe-wrapper">
      <iframe
        ref="iframe"
        loading="lazy"
        src=""
        allowfullscreen="allowfullscreen"
        allow="fullscreen"
      >
      </iframe>
    </div>
    <!-- <div class="password-protection" v-if="!canEnter">
      <label for="password">Mot de passe</label>
      <input
        id="password"
        type="password"
        @input="onInput"
        @keyup.enter="checkPassword"
      />
    </div> -->
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
export default {
  name: 'ChachouBible',
  components: { AtomWrapper },
  props: {},
  data() {
    return {
      password: '',
      canEnter: true,
    }
  },
  mounted() {
    this.$refs.iframe.src = this.$config.chachouBibleEmbed
  },
  methods: {
    onInput(e) {
      this.password = e.target.value
    },
    checkPassword() {
      if (this.password === this.$config.chachouBiblePassword) {
        this.$refs.iframe.src = this.$config.chachouBibleEmbed
        this.canEnter = true
      }
    },
  },
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

  .password-protection {
    position: fixed;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;

    input {
      text-align: center;
      padding: 4px 8px;
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
