<template>
  <atom-wrapper
    class="service-info-block"
    :class="{
      '--small': smallTitle,
      '--reverse': rowReverse || warningPositionReverse,
      '--variation-white': data.variation === 'isWhite',
      '--variation-default': data.variation === 'default',
      '--attached-top': data.attachedTop,
      '--has-outer-border': data.hasOuterBorder,
    }"
  >
    <template v-if="$store.state.isMobile">
      <h2 :class="{ '--small': smallTitle }">
        {{ data.title }}
      </h2>

      <atom-image
        v-if="
          data.illustrations &&
          data.illustrations.top &&
          data.illustrations.top.filename
        "
        :src="data.illustrations.top.filename"
      />

      <atom-wrapper
        class="content"
        :class="{
          '--has-margin-bottom':
            data.illustrations &&
            data.illustrations.bottom &&
            !data.illustrations.bottom.filename,
          '--has-margin-top':
            data.illustrations &&
            data.illustrations.top &&
            data.illustrations.top.filename,
        }"
      >
        <div
          v-if="data.subtitles.up"
          class="subtitle"
          v-html="data.subtitles.up"
        />
        <div class="description" v-html="data.description" />
        <div
          v-if="data.subtitles.down"
          class="subtitle"
          v-html="data.subtitles.down"
        />
      </atom-wrapper>

      <bubble-image
        v-if="
          data.illustrations &&
          data.illustrations.bottom &&
          data.illustrations.bottom.filename
        "
        :src="data.illustrations.bottom.filename"
        :size="90"
        with-border
      />
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
      v-if="data.illustration.filename"
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
    warningPositionReverse() {
      return this.data.warning?.position === 'left'
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
      @include rem(font-size, $font-size-heading-2);
      @include rem(line-height, $font-size-heading-2);
    }
  }

  a {
    color: $color-white;
    font-weight: $weight-medium;
  }

  &.--small .content {
    margin-top: -6px;
  }

  &:not(.--small) .content {
    margin-top: -12px;
  }

  &.--variation-white {
    &.--attached-top {
      margin-top: -54px;
    }

    .content {
      background-color: $color-white;
      color: $color-service-blue;

      .subtitle {
        display: none;
      }
    }
  }

  &.--has-outer-border {
    padding: $spacing-l;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
      height: calc(100% + 16px);
      border-radius: 48px;
      border: 5px dashed $color-service-blue;
    }
  }

  .content {
    width: 80%;
    background-color: $color-service-blue;
    color: $color-white;
    border-radius: 32px;

    p {
      margin-bottom: $spacing-m;
    }

    > * {
      @include rem(padding, $spacing-l $spacing-m);
      @include rem(font-size, $font-size-heading-5);
      text-align: center;
    }

    &.--has-margin-bottom {
      margin-bottom: 6.4vh;
    }

    &.--has-margin-top {
      margin-top: -12%;
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

        em,
        strong {
          @include rem(font-size, $font-size-body-l);
          font-weight: $weight-medium;
          text-decoration: underline;
          font-style: normal;
        }
      }

      h2,
      h3 {
        @include rem(font-size, $font-size-heading-2);
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
    transform: translateY(-20%);
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
      @include rem(font-size, $font-size-heading-1);
      @include rem(line-height, $font-size-heading-1);
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
