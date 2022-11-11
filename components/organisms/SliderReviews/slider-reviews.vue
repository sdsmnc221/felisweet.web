<template>
  <atom-wrapper class="slider-reviews" flex flex-center flex-row>
    <button-arrow
      direction="left"
      :size="32"
      :arrow-size="16"
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
          <atom-image src="/images/double-quote.svg" class="reviews-quote" />
          <atom-image src="/images/double-quote.svg" class="reviews-quote" />
          <div v-html="review.text" />
          <span class="reviews-author">- {{ review.author }} - </span>
          <p v-if="reviewsLabel && reviewsLink" class="reviews-more">
            <a class="link" target="_blank" :href="reviewsLink.href">{{
              reviewsLabel
            }}</a>
          </p>
          <atom-image src="/images/illus-temoins.svg" class="reviews-cat" />
        </li>
      </ul>
    </atom-wrapper>

    <button-arrow
      direction="right"
      :size="32"
      :arrow-size="16"
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
    reviewsLabel: {
      type: String,
      default: null,
    },
    reviewsLink: {
      type: Object,
      default: null,
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
    min-height: 40vh;
    @include rem(margin, $spacing-l);
    @include rem(margin-bottom, $spacing-5xl * 2);

    ul {
      list-style-type: none;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      transition: all ease 0.64s;
      align-items: center;
      @include rem(margin, $spacing-5xl 0);
    }

    li {
      min-width: 64vw;
      width: calc(100% - calc($spacing-l * 2));
      @include rem(padding, $spacing-2xl $spacing-l);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: justify;
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

      div {
        max-height: 40vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      p,
      span {
        font-family: $font-family-lucida;
        word-break: break-word;
        white-space: pre-line;
      }

      .reviews-quote {
        width: 20%;
        position: absolute;
        top: -20%;
        left: 12%;

        &:nth-of-type(2) {
          transform: scale(-1);
          bottom: 0;
          right: 0;
          top: auto;
          left: auto;
        }
      }

      span {
        display: block;

        @include rem(font-size, $font-size-body-xs);
        @include rem(line-height, calc($font-size-body-xs * 1.2));
      }

      .reviews-author {
        position: absolute;
        bottom: 0;
        left: $spacing-2xl;
      }

      .reviews-more {
        position: absolute;
        bottom: -16px;
        right: 30px;
        @include rem(padding, $spacing-s/2 $spacing-xl);
        background-color: transparentize($color-light-blue, 0.16);
        border-radius: 32px;

        &::after {
          content: '';
          position: absolute;
          display: block;
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.64s ease;
          border-radius: 32px;
          border: 2px dashed transparent;
          pointer-events: none;
        }

        &:hover {
          a {
            color: $color-link-water;
          }
          background-color: $color-shakespear-blue;

          &::after {
            opacity: 1;
            border: 2px dashed $color-link-water;
            transform: translate(-50%, -50%);
          }
        }
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

  @media #{$mq-medium} {
    .reviews {
      li {
        @include rem(padding, $spacing-2xl);

        div {
          overflow: visible;
          @include rem(margin, $spacing-3xl 0 $spacing-4xl 0);
        }

        p {
          &:first-child {
            @include rem(margin-top, $spacing-2xl);
          }

          @include rem(margin-top, $spacing-l);
        }

        p,
        span {
          @include rem(font-size, $font-size-body-m);
        }

        .reviews-author {
          @include rem(font-size, $font-size-heading-2);
        }

        .reviews-quote {
          top: -12%;
          left: 4%;

          &:nth-of-type(2) {
            bottom: -12%;
            right: 4%;
          }
        }

        .reviews-cat {
          width: 32vw;
          top: -80px;
        }
      }
    }
  }
}
</style>
