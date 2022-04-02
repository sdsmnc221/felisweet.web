<template>
  <atom-wrapper class="slider-questions" flex flex-center flex-row>
    <button-arrow
      direction="left"
      :size="26"
      :arrow-size="13"
      :on-click="prevQuestion"
    />
    <atom-wrapper class="questions">
      <ul ref="questions" :style="styleObject">
        <li v-for="(question, index) in questions" :key="'question' + index">
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
  data() {
    return {
      activeIndex: 0,
      questions: [
        `Votre chat a un comportement qui vous gêne ?`,
        `Personne ne peut être là pour s'occuper de votre chat durant votre absence ?`,
        `Ou bien vous avez tout simplement une question, un besoin de conseil chat-chat-chat ?`,
      ],
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
    fadeQuestion() {
      Array.from(this.$refs.questions.children).forEach((q) => {
        q.classList.remove('--visible')
        q.classList.add('--hidden')
      })
      this.$refs.questions
        .querySelector(`:nth-of-type(${this.activeIndex + 1})`)
        .classList.add('--visible')
    },
    prevQuestion() {
      this.activeIndex =
        this.activeIndex > 0 ? this.activeIndex - 1 : this.questions.length - 1
      this.fadeQuestion()
    },
    nextQuestion() {
      this.activeIndex =
        this.activeIndex < this.questions.length - 1 ? this.activeIndex + 1 : 0
      this.fadeQuestion()
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
    background-image: url('/images/bubble.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    position: relative;

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
      @include rem(line-height, $font-size-body-xs * 1.2);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      @include rem(padding, 0 $spacing-xl * 1.2);
      transition: all ease 1.2s;

      &.--hidden {
        opacity: 0;
        transform: scale(0);
      }

      &.--visible {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
