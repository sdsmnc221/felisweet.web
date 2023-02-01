<template>
  <atom-wrapper class="rect-text">
    <div v-if="data.images.up.length > 0" class="images-up">
      <span
        v-for="(item, index) in data.images.up"
        :key="`text-image-${index}`"
        :class="{ '-with-scratch': item.class === '-sick-cat' }"
      >
        <atom-image
          :src="item.image.filename"
          :alt="item.image.alt"
          :class="[item.class, { '-with-border': item.withBorder }]"
        />
      </span>
    </div>
    <div v-if="data.text" :class="data.textClass">
      <div
        class="text"
        :class="{ '-big-text': data.bigText, '-with-border': data.withBorder }"
        v-html="data.text"
      />
    </div>
    <div v-if="data.images.down.length > 0" class="images-down">
      <span
        v-for="(item, index) in data.images.down"
        :key="`rect-text-image-${index}`"
        :class="{ '-with-scratch': item.class === '-sick-cat' }"
      >
        <atom-image
          :src="item.image.filename"
          :alt="item.image.alt"
          :class="[item.class, { '-with-border': item.withBorder }]"
        />
      </span>
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'RectTextBlock',
  components: { AtomWrapper, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.rect-text {
  position: relative;
  margin: 0 auto;
  margin-bottom: $spacing-4xl;
  width: 72%;

  .-expanded {
    transform: translateY(-132px);
    margin-bottom: calc($spacing-5xl * 3.2);

    .text {
      padding: calc($spacing-3xl * 1.4) $spacing-m;
      position: absolute;
      * {
        line-height: 120% !important;
      }
    }
  }

  .text {
    position: relative;
    margin: $spacing-l auto;
    @include rem(padding, $spacing-m);

    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background-color: $color-light-blue;
      opacity: 0.64;
      backdrop-filter: blur(3.2px);
    }

    &.-big-text * {
      @include rem(font-size, $font-size-body-l);
      line-height: 100%;
    }

    &.-with-border {
      &::after {
        content: '';
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 24px);
        height: calc(100% + 24px);
        background: none;
        border: 3.2px solid $color-service-blue;
        border-radius: 16px;
        mix-blend-mode: multiply;
      }
    }

    * {
      font-family: $font-family-inconsolata;
      font-weight: 500;
      @include rem(font-size, $font-size-root);
      text-align: center;
      color: $color-shakespear-blue;
      position: relative;
      z-index: 1;
    }

    strong {
      font-weight: 800;
    }
  }

  span {
    position: relative;
    overflow: visible;

    &.-with-scratch {
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 240px;
        height: 480px;
        background-image: url('/images/scratch.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        z-index: 0;
        mix-blend-mode: multiply;
      }
    }
  }

  .atom-image {
    position: relative;
    z-index: 1;
    display: block;

    &.-with-border {
      display: block;
      border: 6.4px solid $color-light-blue;
      filter: drop-shadow(0px 4px 4px $color-shakespear-blue);
      border-radius: 16px;
      transform: rotate(11.58deg) translateY(-24%) translateX(8%);
    }

    &.-sick-cat {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: block;
    }

    &.-arrow {
      width: 65px;
      height: 114px;
      position: absolute;
      top: -64px;
      left: -24px;
    }

    &.-foyer-1 {
      transform: rotate(-18.58deg) translateY(12%) translateX(35%);
    }

    &.-foyer-2 {
      transform: rotate(11.58deg) translateY(0) translateX(8%);
    }

    &.-foyer-4 {
      transform: rotate(-11.58deg) translateY(-24%) translateX(8%);
    }

    &.-illus {
      transform: scale(0.84);
    }

    &.-avatar {
      transform: translateY(-10%) translateX(8%);
      width: 240px;
      height: 240px;
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    width: 50%;

    .text {
      padding: 32px 48px;

      * {
        font-size: 24px;
      }

      &.-big-text * {
        font-size: 28px;
        line-height: 100%;
      }
    }

    .atom-image {
      max-width: 32vw;

      &.-sick-cat {
        width: 240px;
        height: 240px;
      }

      &.-with-border {
        transform: rotate(11.58deg) translateY(-32%) translateX(32%);
      }

      &:not(.-with-border) {
        margin: 0 auto;
      }

      &.-arrow {
        width: 120px;
        height: 160px;
        top: -112px;
        left: -72px;
      }

      &.-foyer-1 {
        transform: rotate(-18.58deg) translateY(-17%) translateX(-35%);
      }

      &.-foyer-2 {
        position: absolute;
        width: 24vw;
        height: auto;
        transform: rotate(11.58deg) translateY(-72%) translateX(100%);
      }

      &.-illus {
        top: 72px;
      }

      &.-avatar {
        transform: rotate(12deg);
        position: absolute;
        left: 38vw;
        top: -18vh;
      }

      &.-foyer-3 {
        transform: rotate(-11.58deg) translateY(-24%) translateX(-32%);
      }

      &.-foyer-4 {
        position: absolute;
        width: 32vw;
        height: auto;
        top: -36vh;
        left: 12vw;
      }
    }
  }
}
</style>
