<template>
  <atom-wrapper class="slider-formations" flex flex-center flex-row>
    <button-arrow
      direction="left"
      :size="32"
      :arrow-size="16"
      :on-click="prev"
      dark
    />
    <atom-wrapper class="formations">
      <div v-if="data.cta.text && data.cta.image" class="cta">
        <atom-image :src="data.cta.image.filename" :alt="data.cta.image.alt" />
        <span>{{ data.cta.text }}</span>
      </div>
      <ul :style="styleObject">
        <li
          v-for="(formation, index) in data.formations"
          :key="'formation' + index"
          :class="{
            '--hidden': index !== activeIndex,
            '--visible': index === activeIndex,
          }"
        >
          <div class="formation-content">
            <div
              v-if="formation.name"
              class="formation-name"
              v-html="formation.name"
            />
            <p v-if="formation.certificate" class="formation-certificate">
              {{ formation.certificate }}
            </p>
            <div
              v-if="formation.description"
              class="formation-description"
              v-html="formation.description"
            />
          </div>
          <span class="formation-year">{{ formation.year }}</span>
          <svg
            ref="svg"
            class="formation-cat"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 545 125.7"
            style="enable-background: new 0 0 545 125.7"
            xml:space="preserve"
          >
            <g>
              <path
                id="Tail"
                d="M521.4,80.4H521C496.3,80.6,420.4,83,420.4,83l-28.9-1.5c0,0,4.8,10.6,16.1,12.7c0.1,0,0.3,0.1,0.4,0.1
		c13.4,2.3,58.8,9.4,58.8,9.4L530.3,93C530.3,93,545.3,80.4,521.4,80.4z"
              />
              <path class="st0" d="M272.4,114.2c-18.6-1.3-63.6,6.2-74.9-12.8" />
              <path
                class="st0"
                d="M451.4,75.4c-6.2-2.5-14-4-20.6-3.2c-9.3,1.2-8.2,1.3-43.5-3.5l9.4,14.7l3,0.1c12.9,0.2,25.8,2.1,38.7,2.1
		C445.8,85.6,469.9,82.9,451.4,75.4z"
              />
              <path
                class="st0"
                d="M229.2,84.9c-11.6-6.2-25.7,3.4-34.5-4.7c-17.8-11.2-21.4-32.8-23.8-52.3c-4.4,0.8-8.6,1.5-12.5,2.2
		c-19-0.1-42.2,90.5-42.2,90.5s133.7,4.7,146,4.6c12.3-0.1,10.2-11,10.2-11c3.7,0,7.3,0,11,0c-10.1-7.7-20.2-15.4-31.2-18.5
		C244.1,92.2,236.1,90.2,229.2,84.9z"
              />
              <path
                class="st1"
                d="M408.3,89.3c-9.6-4.8-14.5-11.9-21.3-22.1c-30.8-73.3-150.8-50.8-216-39.3c2.5,19.5,6,41.1,23.9,52.3
		c7.9,7.3,19.7,0.8,29,2.8c11.4,2.5,22,9.4,32.5,14.2c6.4,2.9,21.4,17,27.2,17c41,0.3,82.6,2.8,123.7,2
		C403.2,106.4,407.9,98.3,408.3,89.3z"
              />
              <path
                class="st0"
                d="M453.9,96.8c-23.3-0.7-36.6-3-45.7-7.5c-0.4,9-5.1,17.1-1.1,27c13-0.2,26-0.8,38.9-1.9
		C501.4,109.7,464.9,98.5,453.9,96.8z"
              />
              <path class="st0" d="M272.4,114.2c-18.6-1.3-63.6,6.2-74.9-12.8" />
              <path
                class="st1"
                d="M40.1,16C34.1-6.3,25.8,1,23.2,4.4c-8.1,12.7-11.2,47.1-6.6,75C48.7,74.9,77.8,48.9,86,18.8l-0.1-0.5
		C65.4,17.7,44.6,16.9,40.1,16z"
              />
              <path
                class="st0"
                d="M85.9,18.3l0.1,0.5c0-0.1,0.1-0.3,0.1-0.5H85.9z"
              />
              <path
                class="st0"
                d="M86,18.8c-8.2,30.2-37.4,56.1-69.5,60.6c1.5,9.3,3.9,17.8,7.1,24.6s7.3,11.6,12.4,13.8
		c23.1,10.2,65.1,8.5,88.9,2.7c15.3-3.8,25.7-18.9,30.4-34.1C120.1,84.6,93.3,52.7,86,18.8z"
              />
              <path
                class="st1"
                d="M158.5,48.8c-0.8-14.2-2-29.3-5.9-43c-8.1-14.4-21.3,13.5-21.3,13.5s-22.4-0.4-45.2-1.1c0,0.2-0.1,0.3-0.1,0.5
		c7.3,34,34.1,65.8,69.4,67.5c1.1-3.5,1.9-7,2.4-10.6C159,66.8,159.2,57.8,158.5,48.8z"
              />
              <line
                id="Whisker1"
                class="st2"
                x1="153.7"
                y1="66.4"
                x2="175.5"
                y2="66.6"
              />
              <line
                id="Whisker2"
                class="st2"
                x1="154.5"
                y1="72.5"
                x2="176.3"
                y2="72.6"
              />
              <line
                id="Whisker3"
                class="st2"
                x1="153.6"
                y1="77.2"
                x2="176.9"
                y2="77.1"
              />
              <line
                id="Whisker4"
                class="st2"
                x1="0.4"
                y1="65.3"
                x2="21.2"
                y2="65.4"
              />
              <line
                id="Whisker5"
                class="st2"
                x1="1"
                y1="69.9"
                x2="20.3"
                y2="70.2"
              />
              <line
                id="Whisker6"
                class="st2"
                x1="1.6"
                y1="74.4"
                x2="22.4"
                y2="74.5"
              />
              <path
                class="st3"
                d="M70.9,80.4c0,0,7.6-1,13.2-4.8c1.7,1.3,7,6.8,11.6,6.2"
              />
              <path
                class="st4"
                d="M84.2,76.4c-2.3-0.1-4.7-1.8-6.6-6.4c-3-7,8.7-5,12.1-3.5C93.5,68.3,89.3,76.6,84.2,76.4z"
              />
              <line
                id="Eye2"
                class="st5"
                x1="109"
                y1="53.9"
                x2="130.5"
                y2="54.1"
              />
              <line
                id="Eye1"
                class="st5"
                x1="38"
                y1="52.5"
                x2="61.1"
                y2="52.5"
              />
              <path
                class="st0"
                d="M139.9,20.5c0,0,3.1-11.2,6.4-10.1c1.9,2.8,4,7.2,4.4,10.2C147.1,21,143.5,20.9,139.9,20.5z"
              />
              <path
                class="st0"
                d="M25.2,18.2c0,0-0.2-13.8,3.1-11.2c3.6,4.1,5.7,8.5,6.1,11.5C32.9,18.7,25.2,18.2,25.2,18.2z"
              />
            </g>

            <image
              href="/images/formation-head.png"
              alt=""
              class="formation-head"
            />
          </svg>
        </li>
      </ul>
    </atom-wrapper>

    <button-arrow
      direction="right"
      :size="32"
      :arrow-size="16"
      :on-click="next"
      dark
    />
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import AtomWrapper from '../../atoms/AtomWrapper'
import ButtonArrow from '../../atoms/ButtonArrow'

export default {
  name: 'SliderFormations',
  components: { AtomWrapper, ButtonArrow, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
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
          this.data.formations.length
        })), -50%)`,
      }
    },
  },
  mounted() {
    const refs = this.$refs.svg
    this.$gsap
      .timeline()
      .addLabel('start', 0)
      .to(
        refs.map((ref) => ref.querySelector('#Tail')),
        {
          skewX: 'random(-16, 16)',
          skewY: 'random(-16, 16)',
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          duration: 0.8,
          stagger: 0.2,
          ease: 'circ.in',
        },
        'start'
      )
      .to(
        [...refs.map((ref) => ref.querySelectorAll('[id^=Whisker]'))],
        {
          skewX: 'random(-16, 16)',
          skewY: 'random(-16, 16)',
          rotate: 'random(-32, 32)',
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          duration: 0.6,
          ease: 'circ.in',
        },
        'start'
      )
  },
  methods: {
    prev() {
      this.activeIndex =
        this.activeIndex > 0
          ? this.activeIndex - 1
          : this.data.formations.length - 1
    },
    next() {
      this.activeIndex =
        this.activeIndex < this.data.formations.length - 1
          ? this.activeIndex + 1
          : 0
    },
  },
}
</script>

<style lang="scss">
.slider-formations {
  width: 100vw;
  margin-bottom: $spacing-5xl;
  margin-top: calc($spacing-5xl * 2);

  .cta {
    position: absolute;
    top: -64%;
    left: 0;

    span {
      position: absolute;
      color: $color-light-blue;
      font-weight: $weight-bold;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-2deg);
      width: 100%;
      text-align: center;
      letter-spacing: -0.02em;
      @include rem(font-size, $font-size-root);
    }
  }

  svg {
    position: relative;
    overflow: visible;
  }

  .button-arrow {
    position: relative;
    z-index: 2;
    transform: scale(1.4) translateY(-100%);
    border: 2px solid $color-service-blue;
  }

  .formations {
    position: relative;
    width: 64vw;
    min-height: 40vh;
    @include rem(margin, $spacing-l);
    @include rem(margin-bottom, $spacing-5xl);

    ul {
      list-style-type: none;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      transition: all ease 0.64s;
      align-items: stretch;
      @include rem(margin, $spacing-2xl 0);
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
      border: 8px solid $color-service-blue;
      background-color: $color-white;

      &.--hidden {
        opacity: 0;
        transform: scale(0);
      }

      &.--visible {
        opacity: 1;
        transform: scale(1);
      }

      div.formation-content {
        position: relative;
        max-height: 64vh;

        div {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        * {
          font-family: $font-family-inconsolata;
          font-style: normal;
          font-weight: 500;
          @include rem(font-size, $font-size-root);
          line-height: 100%;
          text-align: center;
          color: $color-shakespear-blue;
        }

        .formation-name {
          strong {
            display: block;
            @include rem(font-size, $font-size-body-xl);
          }
        }

        .formation-certificate {
          @include rem(font-size, $font-size-body-l);
          font-weight: 800;
          @include rem(margin-top, $spacing-m);
        }

        .formation-description {
          @include rem(margin-top, $spacing-l);
        }
      }

      .formation-cat {
        width: 50vw;
        position: absolute;
        top: -42px;
        left: 50%;
        transform: translateX(-50%);
      }

      .formation-head {
        transform: translate(32px, -32px);
        width: 100px;
        height: 100px;
      }

      .formation-year {
        position: absolute;
        left: 50%;
        bottom: -12px;
        transform: translateX(-50%);
        font-family: $font-family-quicksand;
        font-weight: $weight-bold;
        font-size: 48px;
        line-height: 100%;
        text-align: center;
        color: $color-service-blue;
      }
    }
  }

  @media #{$mq-xlarge} {
  }

  @media #{$mq-medium} {
    .cta {
      top: -40%;
      left: 18%;
      transform: rotate(-12deg);

      span {
        padding: 0 12px;
      }
    }

    .formations {
      @include rem(margin-top, $spacing-2xl);
      @include rem(margin-bottom, $spacing-5xl * 3);

      ul {
        align-items: center;
        @include rem(margin, $spacing-5xl 0);
      }

      li {
        @include rem(padding, $spacing-2xl);
        border-width: 12px;

        div.formation-content {
          @include rem(margin, $spacing-3xl 0 $spacing-4xl 0);

          div {
            justify-content: center;
            align-items: center;
          }

          * {
            font-size: 24px;
          }
        }

        .formation-cat {
          width: 32vw;
          top: -80px;
        }

        .formation-head {
          transform: translate(58px, -8px);
          width: 56px;
          height: 56px;
        }

        .formation-year {
          font-size: 96px;
          bottom: -22px;
        }

        div.formation-content {
          position: relative;
          max-height: 64vh;

          * {
            @include rem(font-size, $font-size-body-l);
          }

          .formation-name {
            strong {
              @include rem(font-size, $font-size-heading-3);
            }
          }

          .formation-certificate {
            @include rem(font-size, $font-size-body-xl);
            font-weight: 800;
            @include rem(margin-top, $spacing-m);
          }
        }
      }
    }
  }

  .st0 {
    fill: #ffffff;
    stroke: #000000;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .st1 {
    stroke: #000000;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .st2 {
    fill: none;
    stroke: #231f20;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .st3 {
    fill: none;
    stroke: #000000;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .st4 {
    fill: #e0aaaa;
    stroke: #000000;
    stroke-miterlimit: 10;
  }
  .st5 {
    fill: none;
    stroke: #ffffff;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .d {
    fill: #2381a0;
  }
}

@media #{$mq-medium} {
  .slider-formations {
    margin-top: 0;
    margin-bottom: 0;
    top: $spacing-4xl;
    position: relative;
  }
}
</style>
