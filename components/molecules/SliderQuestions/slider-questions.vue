<template>
  <atom-wrapper class="slider-questions" flex flex-center flex-row>
    <button-arrow
      direction="left"
      :size="26"
      :arrow-size="13"
      :on-click="prevQuestion"
    />
    <atom-wrapper class="questions">
      <ul :style="styleObject">
        <li
          v-for="(question, index) in questions"
          :key="'question' + index"
          :class="{
            '--hidden': index !== activeIndex,
            '--visible': index === activeIndex,
            '--bg-img-1': index == 0,
            '--bg-img-2': index == 1,
            '--bg-img-3': index == 2,
            'font-childlike': true,
          }"
        >
          {{ question }}
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
import AtomWrapper from '../../atoms/AtomWrapper'
import ButtonArrow from '../../atoms/ButtonArrow'

export default {
  name: 'SliderQuestions',
  components: { AtomWrapper, ButtonArrow },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
      gap: ['8px', '6px', '-20px'],
    }
  },
  computed: {
    styleObject() {
      return {
        transform: `translate(calc(${-this.activeIndex}*180px + ${
          this.gap[this.activeIndex]
        }), -50%)`,
      }
    },
  },
  methods: {
    prevQuestion() {
      this.activeIndex =
        this.activeIndex > 0 ? this.activeIndex - 1 : this.questions.length - 1
    },
    nextQuestion() {
      this.activeIndex =
        this.activeIndex < this.questions.length - 1 ? this.activeIndex + 1 : 0
    },
  },
}
</script>

<style lang="scss">
.slider-questions {
  width: 100vw;
  top: 32px;

  .questions {
    width: 50vw;
    height: 32vh;
    @include rem(margin, 0 $spacing-l);
    // overflow: hidden;

    ul {
      list-style-type: none;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      transition: all ease 0.64s;
      width: 300%;
    }

    li {
      font-family: $font-family-lucida;
      @include rem(font-size, $font-size-body-xs);
      @include rem(line-height, calc($font-size-body-xs * 1.2));
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      @include rem(padding, 0 calc($spacing-xl * 1.2));
      transition: all ease 1.2s;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 220%;
        height: 220%;
        z-index: -1;
      }

      &.--bg-img-1::after {
        background-image: url('/images/bubble-1.svg');
        transform: translate(-50%, -50%) scaleX(-1);
      }

      &.--bg-img-2::after {
        background-image: url('/images/bubble-2.svg');
      }

      &.--bg-img-3::after {
        background-image: url('/images/bubble-3.svg');
      }

      &.--hidden {
        opacity: 0;
        transform: scale(0);
      }

      &.--visible {
        opacity: 1;
        transform: scale(1);

        &.--bg-img-3 {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  @media screen and (max-width: 350px) {
    .--visible {
      opacity: 1;
      transform: scale(1);

      &.--bg-img-3 {
        left: 16vw;

        &::after {
          width: 100%;
        }
      }
    }
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    button {
      display: none;
    }

    .questions {
      width: 100%;

      ul {
        width: 100%;

        li {
          width: 32vw;
          padding: 0 10%;
          @include rem(font-size, $font-size-body-s);
          @include rem(line-height, calc($font-size-body-s * 1.2));

          &::after {
            width: 240px;
            height: 240px;
          }

          &.--bg-img-1::after {
            transform: translate(-50%, -50%) scaleX(1);
          }

          &.--hidden {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }

  @media #{$mq-large} {
    .questions {
      ul {
        li {
          padding: 0 12%;
        }
      }
    }
  }
}
</style>
