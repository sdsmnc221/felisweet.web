<template>
  <atom-wrapper class="photo-banner">
    <atom-wrapper tag="figure" class="banner">
      <h1
        v-if="data.bubbleDescription.title"
        class="banner__title"
        :class="{ '--small': smallTitle }"
      >
        {{ data.bubbleDescription.title }}
      </h1>
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
    smallTitle() {
      return this.data.bubbleDescription?.title?.length >= 8
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
    width: 100vw;
    position: relative;

    @include rem(margin-bottom, $spacing-3xl);

    &__title {
      position: absolute;
      @include rem(font-size, calc($font-size-heading-1));
      font-weight: bold;
      color: $color-service-blue;
      bottom: unset;
      top: -4vh;
      left: 50%;
      transform: translateX(-50%);
      text-shadow: -2px -2px 0 $color-white, 2px -2px 0 $color-white,
        -2px 2px 0 $color-white, 2px 2px 0 $color-white;

      &.--small {
        @include rem(font-size, calc($font-size-heading-2));
        width: 100%;
        text-align: center;
      }
    }

    .bubble-description {
      overflow: visible;
      width: 80%;
      height: 40%;
      position: absolute;
      bottom: -32%;
      left: 50%;
      transform: translateX(-50%);
      background-image: var(--bubble-mobile);
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;
      justify-content: center;
      align-items: center;
      padding: 14%;

      p {
        @include rem(font-size, $font-size-body-xs);
        color: $color-white;
        text-align: center;
        font-weight: $weight-medium;
        transform: translateY(-16px);
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
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .banner {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &__title {
        @include rem(font-size, calc($font-size-heading-1 * 2.4));
        top: 24vh;
        left: 80%;
        letter-spacing: -0.64rem;

        &.--small {
          @include rem(font-size, calc($font-size-heading-1 * 2));
          @include rem(line-height, calc($font-size-heading-1 * 1.6));
          letter-spacing: -0.48rem;
          text-align: center;
          margin-left: 48px;
        }
      }

      .bubble-description {
        width: 16vw;
        max-height: 80%;
        position: absolute;
        transform: none;
        top: 12vh;
        left: 20vw;
        background-image: var(--bubble-desktop);
        background-size: 92% auto;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0.8);

        p {
          color: $color-white;
          @include rem(font-size, $font-size-body-l);
          transform: rotate(4deg);
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
