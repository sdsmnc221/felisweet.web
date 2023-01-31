<template>
  <atom-wrapper class="round-text">
    <div
      v-if="data.text"
      class="text"
      :class="[data.textClass]"
      v-html="data.text"
    />
    <div v-if="data.images.length > 0">
      <atom-image
        v-for="(item, index) in data.images"
        :key="`round-text-image-${index}`"
        :src="item.image.filename"
        :alt="item.image.alt"
        :class="item.imageClass"
      />
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'RoundTextBlock',
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
.round-text {
  position: relative;
  margin: 0 auto;
  margin-bottom: $spacing-4xl;
  width: 90%;

  .text {
    position: relative;
    margin: $spacing-4xl auto;
    @include rem(padding, $spacing-2xl);

    &.-formation-text {
      @include rem(padding, calc($spacing-2xl * 1.2));
      transform: translateX(16%) rotate(8deg);

      p {
        margin-top: $spacing-m;
      }
    }

    &.-invitation {
      width: 70%;
      padding: 3.2rem;
      * {
        font-size: 20px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: $color-light-blue;
      opacity: 0.64;
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 64px);
      height: calc(100% + 64px);
      background: none;
      border: 6.4px solid #4289b3;
      border-radius: 100%;
      mix-blend-mode: multiply;
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

  .atom-image {
    &.-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 166px;
      height: 136px;
    }

    &.-book {
      position: absolute;
      top: -72px;
      left: 16px;
      width: 320px;
      height: 242px;
    }
  }
}
</style>
