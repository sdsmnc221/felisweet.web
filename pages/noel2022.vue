<template>
  <atom-wrapper tag="main">
    <transition>
      <div
        v-if="
          !$store.state.isMobile ||
          ($store.state.isMobile && $store.state.isLandscape)
        "
        class="sections-container"
      >
        <div class="sections">
          <div class="bg"></div>
          <section>
            <noel-frame ref="frame0" without-long-ball>
              <noel-miaou :show-wish="showWish" @shakeGlobe="countdown" />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame1">
              <noel-marie @showTitle="showTitle1" />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame2">
              <noel-illustration @showTitle="showTitle2" />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame3" without-balls without-long-ball>
              <noel-mission-catmas />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame4">
              <noel-ebook />
            </noel-frame>
          </section>
        </div>
        <div ref="cursor" class="cursor"></div>
        <transition name="fade">
          <noel-indication
            v-if="indicationActive"
            :text="indicationText"
            :small="indicationSmall"
          />
        </transition>
      </div>
    </transition>

    <transition>
      <noel-rotate-screen
        v-if="$store.state.isMobile && !$store.state.isLandscape"
      />
    </transition>
  </atom-wrapper>
</template>

<script>
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AtomWrapper from '../components/atoms/AtomWrapper'
import NoelFrame from '../components/noel/NoelFrame'
import NoelMiaou from '../components/noel/NoelMiaou'
import NoelMarie from '../components/noel/NoelMarie'
import NoelIllustration from '../components/noel/NoelIllustration'
import NoelEbook from '../components/noel/NoelEbook'
import NoelIndication from '../components/noel/NoelIndication'
import NoelMissionCatmas from '../components/noel/NoelMissionCatmas'
import NoelRotateScreen from '../components/noel/NoelRotateScreen'

export default {
  name: 'Noel2022Page',
  components: {
    AtomWrapper,
    NoelFrame,
    NoelMiaou,
    NoelMarie,
    NoelIllustration,
    NoelEbook,
    NoelIndication,
    NoelMissionCatmas,
    NoelRotateScreen,
  },
  data() {
    return {
      indicationActive: false,
      indicationText: '',
      indicationSmall: false,
      showWish: false,
    }
  },
  created() {
    this.$gsap.registerPlugin(ScrollTrigger)
  },
  mounted() {
    window.addEventListener('resize', this.render)

    window.addEventListener('mousemove', (e) => {
      if (this.$refs.cursor) {
        this.$refs.cursor.style.left = e.clientX - 48 / 2 + 'px'
        this.$refs.cursor.style.top = e.clientY - 48 / 2 + 'px'
      }
    })

    this.render()
  },
  methods: {
    render() {
      if (this.$store.state.isMobile && !this.$store.state.isLandscape) return

      setTimeout(() => {
        this.setIndication(
          true,
          'Scrollez pour vous plonger dans notre atmosphère festif, restez sur chaque section et suivez les indications pour fêter avec nous miaou~'
        )

        setTimeout(() => this.setIndication(false), 4800)
      }, 7200)

      const sections = this.$gsap.utils.toArray('section')
      const bg = document.body.querySelector('.sections .bg')

      const duration = 3.2
      const sectionIncrement = duration / (sections.length - 1)

      // const sectionIncrement = duration / (sections.length - 1)
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: document.body.querySelector('#__nuxt'),
          pin: true,
          scrub: true,
          // snap: 1 / (sections.length - 1),
          start: 'top top',
          end: '+=' + window.innerWidth,
        },
      })

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        duration,
        ease: 'none',
        onUpdate: () => {
          this.$gsap.to(bg, { xPercent: -tl.progress() * 100 })
        },
      })

      // everything below this is just for the fading/scaling up which is NOT scrubbed - it's all dynamic, triggered when each section enters/leaves so that the fading/scaling occurs at a consistent rate no matter how fast you scroll!
      sections.forEach((section, index) => {
        const noelFrame = section.querySelector('.noel-frame')
        const tween = this.$gsap.fromTo(
          noelFrame,
          { opacity: 0, scale: 0.64, yPercent: 32, perspective: '32vw' },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            perspective: 0,
            duration: 1.6,
            force3D: true,
            paused: true,
            ease: 'circ.in',
            onComplete: () => {
              const ref = this.$refs['frame' + index]
              const slot = ref?.$slots?.default
              if (slot && slot[0]?.componentInstance?.startTL)
                slot[0].componentInstance.startTL()
            },
            onReverseComplete: () => {
              const ref = this.$refs['frame' + index]
              const slot = ref?.$slots?.default
              if (slot && slot[0]?.componentInstance?.resetTL)
                slot[0].componentInstance.resetTL()
            },
          }
        )
        addSectionCallbacks(tl, {
          start: sectionIncrement * (index - 0.99),
          end: sectionIncrement * (index + 0.99),
          onEnter: () => tween.play(),
          onLeave: () => tween.reverse(),
          onEnterBack: () => tween.play(),
          onLeaveBack: () => tween.reverse(),
        })

        if (index === 0) tween.play()
        // index || tween.progress(1) // the first tween should be at its end (already faded/scaled in)
      })

      // helper function that lets us define a section in a timeline that spans between two times (start/end) and lets us add onEnter/onLeave/onEnterBack/onLeaveBack callbacks
      function addSectionCallbacks(
        timeline,
        { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
      ) {
        const trackDirection = (animation) => {
          // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
          const onUpdate = animation.eventCallback('onUpdate') // in case it already has an onUpdate
          let prevTime = animation.time()
          animation.direction = animation.reversed() ? -1 : 1
          animation.eventCallback('onUpdate', () => {
            const time = animation.time()
            if (prevTime !== time) {
              animation.direction = time < prevTime ? -1 : 1
              prevTime = time
            }
            onUpdate && onUpdate.call(animation)
          })
        }
        const empty = (v) => v // in case one of the callbacks isn't defined
        timeline.direction || trackDirection(timeline) // make sure direction tracking is enabled on the timeline
        start >= 0 &&
          timeline.add(
            () =>
              ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(
                param
              ),
            start
          )
        end <= timeline.duration() &&
          timeline.add(
            () =>
              ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(
                param
              ),
            end
          )
      }
    },
    setIndication(activeState, text = '', smallState = false) {
      this.indicationActive = activeState
      this.indicationText = text
      this.indicationSmall = smallState
    },
    countdown() {
      setTimeout(() => {
        this.setIndication(true, '3', true)

        setTimeout(() => {
          this.setIndication(true, '2', true)

          setTimeout(() => {
            this.setIndication(true, '1', true)

            setTimeout(() => {
              this.setIndication(true, 'MAGIE !!!', true)

              setTimeout(() => {
                this.setIndication(false)
                this.showWish = true
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    },
    showTitle1() {
      this.setIndication(
        true,
        "Coucou c'est Marie. J'ai quelque chose à vous dire !"
      )

      setTimeout(() => this.setIndication(false), 2400)
    },
    showTitle2() {
      this.setIndication(true, 'Un certain message se cache !')

      setTimeout(() => this.setIndication(false), 2400)
    },
  },
}
</script>

<style lang="scss">
// html {
//   cursor: none;
// }
// *,
// body {
//   cursor: none !important;
// }

body {
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
}
main.atom-wrapper {
  width: auto;
  max-width: 500vw;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .cursor {
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    background-image: url('/images/noel-cursor.png');
    z-index: 999;
    mix-blend-mode: normal;
    transition: none;
  }

  .sections-container {
    display: flex;
    flex: 1;
    align-self: stretch;
  }

  .sections {
    display: flex;
    max-width: 500vw;
    align-self: stretch;
    background-color: #7fc1cf;
    position: relative;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to right, #2d384e, #7fc1cf);
      z-index: 0;
      pointer-events: none;
    }

    section {
      width: 100vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      will-change: transform;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-size: cover;
        background-position: top right;
        z-index: -1;
        pointer-events: none;
      }

      &:nth-of-type(1)::after {
        background-image: url('/images/noel-bg-1.png');
      }

      &:nth-of-type(2)::after {
        background-image: url('/images/noel-bg-2.png');
      }

      &:nth-of-type(3)::after {
        background-image: url('/images/noel-bg-3.png');
      }

      &:nth-of-type(4)::after {
        background-image: url('/images/noel-bg-4.png');
      }

      &:nth-of-type(5)::after {
        background-image: url('/images/noel-bg-5.png');
      }
    }
  }
}

@media #{$mq-mobile-tablet} and (orientation:landscape) {
  footer {
    display: none !important;
  }

  main.atom-wrapper .cursor {
    display: none;
  }
}
</style>
