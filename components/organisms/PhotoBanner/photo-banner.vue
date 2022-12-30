<template>
  <atom-wrapper class="photo-banner">
    <atom-wrapper tag="figure" class="banner">
      <atom-image :src="data.image.filename" />
      <atom-wrapper
        class="bubble-description"
        :style="cssBubble"
        v-html="data.bubbleDescription.text"
      />
    </atom-wrapper>
    <bubble-image
      :src="data.bubbleImage.filename"
      :size="$store.state.isMobile ? 90 : 190"
    />
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import BubbleImage from '../../atoms/BubbleImage'
import AtomWrapper from '../../atoms/AtomWrapper'

export default {
  name: 'ContactBanner',
  components: { AtomWrapper, AtomImage, BubbleImage },
  props: {
    openPlanning: {
      type: Function,
      default: () => {},
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cssBubble() {
      return {
        '--bubble-desktop': `url(${this.data.bubbleDescription.desktop.filename})`,
        '--bubble-mobile': `url(${this.data.bubbleDescription.mobile.filename})`,
      }
    },
  },
}
</script>

<style lang="scss">
.photo-banner {
  margin-top: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .banner {
    width: 72%;
    position: relative;

    img {
      transform: translateX(6%);
    }

    .bubble-description {
      overflow: visible;
      width: 132%;
      position: absolute;
      bottom: -16%;
      left: 50%;
      transform: translateX(-50%);
      background-image: var(--bubble-mobile);
      background-size: 100% auto;
      background-position: center;
      background-repeat: no-repeat;

      p {
        @include rem(font-size, $font-size-body-xs);
        padding: 5% 20% 10% 20%;
        text-align: center;
        font-weight: $weight-medium;
      }
    }
  }

  .bubble-image {
    margin: 6.4vh 0;
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    overflow-y: visible;
    width: 100vw;
    height: 100vh;
    background-image: url('/images/photo-banner-pattern.svg');
    background-repeat: repeat;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .banner {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        transform: translateX(20%);
        width: 32%;
      }

      .bubble-description {
        width: 32%;
        min-height: 80%;
        position: relative;
        transform: none;
        bottom: 0;
        left: 0;
        background-image: var(--bubble-desktop);
        background-size: 100% auto;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.8);

        p {
          color: $color-white;
          @include rem(font-size, $font-size-body-l);
          transform: rotate(-3.2deg);
        }
      }
    }

    .bubble-image {
      position: absolute;
      bottom: -20%;
      right: 20%;
    }
  }

  @media #{$mq-large} {
  }

  @media #{$mq-xlarge} {
  }
}
</style>
