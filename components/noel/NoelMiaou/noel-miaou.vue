<template>
  <div ref="main" class="noel-miaou">
    <img ref="wish" class="wish" src="/images/noel-miaou-wish.png" alt="" />
    <noel-globe ref="globe" />
    <img ref="mimoso" class="mimoso" src="/images/noel-mimoso.svg" alt="" />
    <img ref="zigpo" class="zigpo" src="/images/noel-zigpo.svg" alt="" />
    <img ref="ball" class="ball" src="/images/noel-ball.svg" alt="" />
  </div>
</template>

<script>
import { Draggable } from 'gsap/Draggable'
import { randomNumberInRange } from '../../../utils'
import NoelGlobe from './noel-globe.vue'

export default {
  name: 'NoelMiaou',
  components: { NoelGlobe },
  data() {
    return {
      shakeTL: null,
      dragTL: null,
    }
  },
  created() {
    this.$gsap.registerPlugin(Draggable)
  },
  mounted() {
    const globe = this.$refs.globe.$el
    const zigpo = this.$refs.zigpo
    const mimoso = this.$refs.mimoso
    const wish = this.$refs.wish
    const ball = this.$refs.ball

    const speed = 0.64
    const shift = 1.2

    this.$gsap.timeline().to(
      this.$refs.ball,
      {
        rotate: 'random(-72, 72)',
        xPercent: 'random(-120, 120)',
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        duration: 0.8,
        ease: 'circ.in',
      },
      0
    )

    this.dragTL = Draggable.create(globe, {
      bounds: this.$refs.main,
      inertia: true,
      zIndexBoost: false,
      force3D: false,
      onDragStart: () => {
        this.shake(globe)
      },
      onDrag: (pointerEvents) => {
        this.$gsap.to(zigpo, {
          x:
            randomNumberInRange(-shift, shift) *
            (pointerEvents.pageX || pointerEvents.targetTouches[0].pageX) *
            speed,
          y:
            randomNumberInRange(-shift, shift) *
            (pointerEvents.pageY || pointerEvents.targetTouches[0].pageY) *
            speed,
        })
        this.$gsap.to(mimoso, {
          x:
            -randomNumberInRange(-shift, shift) *
            (pointerEvents.pageX || pointerEvents.targetTouches[0].pageX) *
            speed,
          y:
            randomNumberInRange(-shift, shift) *
            (pointerEvents.pageY || pointerEvents.targetTouches[0].pageY) *
            speed,
        })
      },
      onRelease: () => {
        if (this.shakeTL) {
          this.shakeTL.kill()
          this.shakeTL = null
        }

        if (this.dragTL) {
          this.dragTL[0].kill()
          this.dragTL = null
        }

        this.$gsap.to(globe, {
          rotate: 0,
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -30,
          x: 0,
          y: 0,
          ease: 'circ.in',
          duration: shift,
        })
        this.$gsap.to(zigpo, {
          xPercent: 0,
          yPercent: 0,
          x: 0,
          y: 0,
          top: '68%',
          right: '32%',
          ease: 'circ.in',
          duration: shift,
        })
        this.$gsap.to(mimoso, {
          xPercent: 0,
          yPercent: 0,
          x: 0,
          y: 0,
          top: '56%',
          left: '36%',
          ease: 'circ.in',
          duration: shift,
        })

        if (this.$store.state.isMobile) {
          this.$gsap
            .timeline()
            .to(
              [mimoso, zigpo, ball, globe],
              {
                opacity: 0,
                duration: shift,
                ease: 'circ.in',
                stagger: 0.32,
              },
              0
            )
            .to(
              wish,
              {
                opacity: 1,
                scale: 1.4,
                y: 0,
                x: 0,
                xPercent: -50,
                yPercent: -50,
                top: '50%',
                left: '50%',
                duration: 2.4,
                ease: 'circ.in',
              },
              '>'
            )
        } else {
          this.$gsap.to(wish, {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            xPercent: -50,
            duration: 2.4,
            ease: 'circ.in',
          })
        }
      },
    })
  },
  methods: {
    shake(el) {
      this.shakeTL = this.$gsap.to(el, 0.15, {
        x: 'random(-12, 12)',
        y: 'random(-12, 12)',
        rotate: 'random(-64, 64)',
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        duration: 0.2,
        ease: 'sine.inOut',
      })
    },
  },
}
</script>

<style lang="scss">
.noel-miaou {
  position: relative;
  width: 100%;
  height: 100%;

  img {
    pointer-events: none;
  }

  .wish {
    position: absolute;
    top: 5%;
    left: calc(50% + 32px);
    height: 50%;
    transform: translateX(-50%, 10%) scale(0);
    opacity: 0;
    mix-blend-mode: multiply;
  }

  .globe {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
  }

  .mimoso {
    display: block;
    position: absolute;
    height: 24%;
    top: 56%;
    left: 36%;
  }

  .zigpo {
    display: block;
    position: absolute;
    height: 12%;
    top: 68%;
    right: 32%;
  }

  .ball {
    display: block;
    position: absolute;
    height: 6%;
    top: 74%;
    left: 46%;
  }

  @media #{$mq-mobile-tablet} and (orientation:landscape) {
    .globe {
      height: 64%;
    }
    .mimoso {
      height: 32%;
    }
    .zigpo {
      height: 18%;
    }
    .ball {
      top: 80%;
    }
  }
}
</style>
