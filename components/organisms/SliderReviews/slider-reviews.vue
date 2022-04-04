<template>
  <atom-wrapper class="slider-reviews" flex flex-center flex-row>
    <button-arrow
      direction="left"
      :size="26"
      :arrow-size="13"
      :on-click="prevQuestion"
    />
    <atom-wrapper class="reviews">
      <ul :style="styleObject">
        <li
          v-for="(review, index) in reviews"
          :key="'review' + index"
          :class="{
            '--hidden': index !== activeIndex,
            '--visible': index === activeIndex,
          }"
        >
          {{ review.text }}
          <atom-image src="/images/illus-temoins.svg" class="reviews-cat" />
        </li>
      </ul>
    </atom-wrapper>

    <button-arrow
      direction="right"
      :size="26"
      :arrow-size="13"
      :on-click="nextQuestion"
    />
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import AtomWrapper from '../../atoms/AtomWrapper'
import ButtonArrow from '../../atoms/ButtonArrow'

export default {
  name: 'SliderReviews',
  components: { AtomWrapper, ButtonArrow, AtomImage },
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    styleObject() {
      return {
        transform: `translate(calc(${-this.activeIndex}*calc(100% / ${
          this.reviews.length
        })), -50%)`,
      }
    },
  },
  methods: {
    prevQuestion() {
      this.activeIndex =
        this.activeIndex > 0 ? this.activeIndex - 1 : this.reviews.length - 1
    },
    nextQuestion() {
      this.activeIndex =
        this.activeIndex < this.reviews.length - 1 ? this.activeIndex + 1 : 0
    },
  },
}
</script>

<style lang="scss">
.slider-reviews {
  width: 100vw;
  top: 32px;

  .reviews {
    position: relative;
    width: 64vw;
    height: 40vh;
    @include rem(margin, 0 $spacing-l);

    ul {
      list-style-type: none;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      transition: all ease 0.64s;
    }

    li {
      min-width: 64vw;
      width: calc(100% - calc($spacing-l * 2));
      font-family: $font-family-lucida;
      @include rem(font-size, $font-size-body-xs);
      @include rem(line-height, calc($font-size-body-xs * 1.2));
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      @include rem(padding, $spacing-l);
      transition: all ease 1.2s;
      position: relative;
      border-radius: 24px;
      border: 8px solid $color-link-water;
      background-color: $color-white;

      &.--hidden {
        opacity: 0;
        transform: scale(0);
      }

      &.--visible {
        opacity: 1;
        transform: scale(1);
      }

      .reviews-cat {
        width: 50vw;
        position: absolute;
        top: -42px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
