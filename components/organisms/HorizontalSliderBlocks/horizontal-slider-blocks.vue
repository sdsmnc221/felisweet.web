<template>
  <atom-wrapper class="horizontal-slider-blocks" :style="css">
    <scroll-reveal-wrapper :top="200">
      <atom-wrapper tag="section">
        <div class="top-content">
          <atom-image :src="data.top.illustration.filename" />
          <div class="text" v-html="data.top.text"></div>
        </div>
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper :top="200" class="slider-container">
      <div class="bottom-content">
        <div class="slider">
          <div
            v-for="(block, index) in data.sliders"
            :key="`slider-block-text-${index}`"
            class="block-text"
          >
            <div v-html="block"></div>
          </div>
        </div>
      </div>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper :top="200">
      <div class="bottom-text" v-html="data.bottom.text"></div>
    </scroll-reveal-wrapper>
  </atom-wrapper>
</template>

<script>
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AtomWrapper from '../../atoms/AtomWrapper/atom-wrapper'
import ScrollRevealWrapper from '../../atoms/ScrollRevealWrapper/scroll-reveal-wrapper'
import AtomImage from '../../atoms/AtomImage/atom-image'

export default {
  name: 'HorizontalSliderBlocks',
  components: { AtomWrapper, ScrollRevealWrapper, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tl: null,
    }
  },
  computed: {
    css() {
      return {
        '--bg-slider': `url(${this.data.bottom.illustration.filename})`,
      }
    },
  },
  created() {
    this.$gsap.registerPlugin(ScrollTrigger)
  },
  mounted() {
    const sections = this.$gsap.utils.toArray('.block-text')

    this.tl = this.$gsap.timeline({
      scrollTrigger: {
        trigger: document.body.querySelector('.slider-container'),
        pin: '.bottom-content',
        scrub: true,
        snap: 1 / sections.length,
        start: 'top 20%',
        end: '+=' + window.innerWidth,
      },
    })

    this.tl.to(sections, {
      xPercent: -100 * sections.length - 1,
      duration: 1.6,
      ease: 'none',
    })
  },
}
</script>

<style lang="scss">
.horizontal-slider-blocks {
  display: none;

  @media #{$mq-medium}, #{$mq-tablet}, #{$mq-xlarge} {
    display: block;

    .top-content {
      width: 100vw;
      height: 100vh;

      background-image: url('/images/photo-banner-pattern.svg');
      background-repeat: repeat;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .atom-image {
        width: 72vw;
      }

      .text {
        width: 48vw;
        padding: $spacing-4xl;
        background-color: $color-white;
        color: $color-service-blue;
        border-radius: 120px;
        margin-top: -32vh;

        * {
          text-align: center;
          font-weight: $weight-bold;
          font-size: $font-size-body-xl;
        }
      }
    }

    .bottom-content {
      transform: translateY(-10vh);
      position: relative;
      z-index: 2;
      height: 100vh;
      background-image: var(--bg-slider);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;

      .slider {
        position: relative;
        display: flex;
        width: 400vw;
        height: 100%;
        align-items: center;

        .block-text {
          width: 100vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          will-change: transform;
          position: relative;

          div {
            width: 32vw;
            background: rgba(71, 121, 149, 0.72);
            border-radius: 72px;
            padding: $spacing-3xl;
            transform: translateX(16vw);

            * {
              text-align: center;
              font-size: $font-size-body-l;
              color: $color-white;
            }
          }
        }
      }
    }

    .bottom-text {
      margin: 0 auto;
      padding: $spacing-4xl;
      padding-top: 14vh;
      width: 40vw;
      background-color: $color-white;
      border-radius: 0 0 72px 72px;
      transform: translateY(-20vh);
      position: relative;
      z-index: -1;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 48px);
        height: calc(100% + 45px);
        border-radius: 0 0 100px 100px;
        border: 5px dashed $color-service-blue;
      }

      * {
        text-align: center;
        font-size: $font-size-body-l;
        color: $color-service-blue;
        margin: 24px;
      }

      ul {
        width: 72%;
        margin: 24px auto;

        li {
          text-align: left;
          background: url('/images/list-style-paw.svg') no-repeat 3.2px 3.2px
            transparent;
          list-style-type: none;
          margin: 0;
          padding: 0px 0px 1px 48px;
          vertical-align: middle;
          @include rem(margin-bottom, $spacing-m);
          @include rem(margin-left, -$spacing-m);
        }
      }
    }
  }
}
</style>
