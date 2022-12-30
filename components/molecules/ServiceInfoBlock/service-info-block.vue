<template>
  <atom-wrapper
    class="service-info-block"
    :class="{ '--small': smallTitle, '--reverse': rowReverse }"
  >
    <template v-if="$store.state.isMobile">
      <h2 :class="{ '--small': smallTitle }">
        {{ data.title }}
      </h2>
      <atom-wrapper class="content">
        <div class="subtitle" v-html="data.subtitles.up" />
        <div class="description" v-html="data.description" />
        <div class="subtitle" v-html="data.subtitles.down" />
      </atom-wrapper>
    </template>
    <template v-else>
      <div class="text-block">
        <h2 :class="{ '--small': smallTitle }">{{ data.title }}</h2>
        <atom-wrapper class="content">
          <div class="subtitle" v-html="data.subtitles.up" />
          <div class="description" v-html="data.description" />
          <div class="subtitle" v-html="data.subtitles.down" />
        </atom-wrapper>
      </div>
    </template>
    <div v-if="data.warning.text" class="warning-block">
      <div class="warning" v-html="data.warning.text" />
      <atom-image :src="data.warning.icon.filename" />
    </div>
    <bubble-image
      :class="{ '--has-warning': hasWarning }"
      :src="data.illustration.filename"
      :size="$store.state.isMobile ? 90 : 190"
      with-border
    />
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import AtomWrapper from '../../atoms/AtomWrapper'
import BubbleImage from '../../atoms/BubbleImage'

export default {
  name: 'ServiceBlock',
  components: { AtomWrapper, BubbleImage, AtomImage },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    smallTitle: {
      type: Boolean,
      default: false,
    },
    rowReverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasWarning() {
      return !!this.data.warning.text
    },
  },
}
</script>

<style lang="scss">
.service-info-block {
  h2 {
    @include rem(font-size, $font-size-heading-2);
    text-align: center;
    letter-spacing: -0.064em;
    font-weight: bold;

    &.--small {
      @include rem(font-size, $font-size-body-xl);
    }
  }

  &.--small .content {
    margin-top: -6px;
  }

  &:not(.--small) .content {
    margin-top: -12px;
  }

  .content {
    width: 80%;
    background-color: $color-service-blue;
    color: $color-white;
    border-radius: 32px;

    > * {
      @include rem(padding, $spacing-l $spacing-m);
      @include rem(font-size, $font-size-heading-5);
      text-align: center;
    }

    .description {
      strong {
        font-weight: $weight-bold;
      }

      em {
        @include rem(font-size, $font-size-body-s);
      }

      ul {
        text-align: left;

        @include rem(margin-left, $spacing-m);

        li {
          background: url('/images/list-style-paw.svg') no-repeat 3.2px 3.2px
            transparent;
          list-style-type: none;
          margin: 0;
          padding: 0px 0px 1px 24px;
          vertical-align: middle;
          @include rem(margin-bottom, $spacing-m);
          @include rem(margin-left, -$spacing-m);
        }
      }
    }

    .subtitle {
      background-color: $color-shakespear-blue;

      p {
        @include rem(font-size, $font-size-body-l);
        font-weight: $weight-bold;
      }

      &:first-of-type {
        border-radius: 32px 32px 0 0;
      }

      &:last-of-type {
        border-radius: 0 0 32px 32px;
      }
    }
  }

  .warning-block {
    background: #fcf9f1;
    border: 4px solid $color-jellybean-blue;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    transform: translateY(-40%);
    @include rem(padding, $spacing-m);
    width: 64%;

    p {
      @include rem(font-size, $font-size-body-xs);
      text-align: center;
    }

    .atom-image {
      position: absolute;
      width: 64px;
      height: 64px;
      right: -10%;
      bottom: -20%;
    }
  }

  .bubble-image {
    margin: 6.4vh auto;
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: $spacing-4xl 0 $spacing-3xl 0;
    overflow: visible;

    &.--reverse {
      flex-direction: row-reverse;
      .bubble-image {
        &.--has-warning {
          transform: scale(0.72);
          bottom: -16%;
          left: 40%;
          position: absolute;
        }
      }
    }

    &:not(.--reverse) {
      .bubble-image {
        &.--has-warning {
          bottom: -16%;
          left: 48%;
          position: absolute;
        }
      }
    }

    .text-block {
      width: 50%;
    }

    &.--small .content {
      margin-top: -12px;
    }

    &:not(.--small) .content {
      margin-top: -10px;
    }

    h2,
    h2.--small {
      @include rem(font-size, $font-size-heading-2);
    }

    .warning-block {
      width: 24%;
      margin: 0 12vw;
      @include rem(padding, $spacing-l);
      transform: translateY(10%);

      .atom-image {
        bottom: -30;
        right: -10%;
        width: 90px;
        height: 90px;
      }

      p {
        @include rem(font-size, $font-size-body-l);
      }
    }

    .bubble-image {
      margin: 0 12vw;

      &.--with-border {
        &::after {
          display: block;
        }
      }
    }
  }

  @media #{$mq-large} {
    .text-block {
      width: 40%;
    }

    &:not(.--reverse) {
      .bubble-image {
        &.--has-warning {
          bottom: -16%;
          left: 24%;
          position: absolute;
        }
      }
    }
  }
}
</style>
