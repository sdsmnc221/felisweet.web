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
    <bubble-image
      :src="data.illustration.filename"
      :size="$store.state.isMobile ? 90 : 190"
      with-border
    />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import BubbleImage from '../../atoms/BubbleImage'

export default {
  name: 'ServiceBlock',
  components: { AtomWrapper, BubbleImage },
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

    .bubble-image {
      margin: 0 12vw;

      &.--with-border {
        &::after {
          display: block;
        }
      }
    }
  }

  @media #{$mq-xlarge} {
    .text-block {
      width: 40%;
    }
  }
}
</style>