<template>
  <atom-wrapper tag="main" :class="{ '--isSafari': isSafari }">
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
            <noel-frame
              ref="frame0"
              :index="0"
              without-long-ball
              @left="left"
              @right="right"
            >
              <noel-miaou
                :show-wish="showWish"
                @shakeGlobe="
                  () => {
                    stopCountdown = false
                    countdown()
                  }
                "
                @stopCountdown="
                  () => {
                    stopCountdown = true
                    setIndication(false)
                  }
                "
              />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame1" :index="1" @left="left" @right="right">
              <noel-marie @showTitle="showTitle1" />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame2" :index="2" @left="left" @right="right">
              <noel-illustration @showTitle="showTitle2" />
            </noel-frame>
          </section>
          <section>
            <noel-frame
              ref="frame3"
              :index="3"
              without-balls
              without-long-ball
              @left="left"
              @right="right"
            >
              <noel-mission-catmas />
            </noel-frame>
          </section>
          <section>
            <noel-frame ref="frame4" :index="4" @left="left" @right="right">
              <noel-ebook />
            </noel-frame>
          </section>
        </div>
        <div ref="cursor" class="cursor"></div>
        <div class="sound">
          <input
            id="sound"
            class="tgl tgl-flip"
            type="checkbox"
            @change="sound"
          />
          <label class="tgl-btn" for="sound"></label>
        </div>
        <transition name="fade">
          <noel-indication
            v-if="indicationActive"
            :text="indicationText"
            :small="indicationSmall"
          />
        </transition>
        <noel-ending v-if="showEnding" />
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
import Resources from '../utils/Resources'
import sources from '../utils/souces'
import AtomWrapper from '../components/atoms/AtomWrapper'
import NoelFrame from '../components/noel/NoelFrame'
import NoelMiaou from '../components/noel/NoelMiaou'
import NoelMarie from '../components/noel/NoelMarie'
import NoelIllustration from '../components/noel/NoelIllustration'
import NoelEbook from '../components/noel/NoelEbook'
import NoelIndication from '../components/noel/NoelIndication'
import NoelMissionCatmas from '../components/noel/NoelMissionCatmas'
import NoelRotateScreen from '../components/noel/NoelRotateScreen'
import NoelEnding from '../components/noel/NoelEnding'

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
    NoelEnding,
  },
  data() {
    return {
      indicationActive: false,
      indicationText: '',
      indicationSmall: false,
      showWish: false,
      stopCountdown: false,
      tl: null,
      shakeTL: null,
      resources: null,
      showEnding: false,
    }
  },
  head() {
    return {
      title: "Fêtez la fin de l'année 2022 avec FeliSweet",
    }
  },
  computed: {
    isSafari() {
      const isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === '[object SafariRemoteNotification]'
        })(
          !window.safari ||
            (typeof safari !== 'undefined' && window.safari.pushNotification)
        )
      return isSafari
    },
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

    window.addEventListener('resourcesIsReady', () => {
      if (!this.$store.state.muted)
        setTimeout(() => {
          this.$store.dispatch('playSound', { name: 'ambiance' })
        }, 1000)
    })

    this.resources = new Resources(sources, this.$store, window)

    this.render()

    this.shakeTL = this.$gsap
      .timeline({ paused: true })
      .add(() => {
        if (!this.stopCountdown) this.setIndication(true, '3', true)
      }, '0')
      .add(() => {
        if (!this.stopCountdown) this.setIndication(true, '2', true)
      }, '1')
      .add(() => {
        if (!this.stopCountdown) this.setIndication(true, '1', true)
      }, '2')
      .add(() => {
        if (!this.stopCountdown) this.setIndication(true, 'MAGIE !!!', true)
      }, '3')
      .add(() => {
        if (!this.stopCountdown) this.setIndication(true, 'MAGIE !!!', true)
      }, '4')
      .add(() => {
        this.stopCountdown = true
        this.setIndication(false)
        this.showWish = true
      }, '5')
  },
  methods: {
    render() {
      if (this.$store.state.isMobile && !this.$store.state.isLandscape) return

      setTimeout(() => {
        this.setIndication(
          true,
          'Déplacez-vous entre les pages de la carte pour vous plonger dans notre atmosphère festif, restez sur chaque section et suivez les indications pour fêter avec nous miaou~'
        )

        setTimeout(() => this.setIndication(false), 4800)
      }, 7200)

      const sections = this.$gsap.utils.toArray('section')
      const bg = document.body.querySelector('.sections .bg')

      const duration = 3.2
      const sectionIncrement = duration / (sections.length - 1)

      // const sectionIncrement = duration / (sections.length - 1)
      this.tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: document.body.querySelector('#__nuxt'),
          pin: true,
          scrub: true,
          snap: 1 / sections.length,
          start: 'top top',
          end: '+=' + window.innerWidth,
        },
      })

      this.tl.to(sections, {
        xPercent: -100 * sections.length,
        duration,
        ease: 'none',
        onUpdate: () => {
          this.$gsap.to(bg, { xPercent: -this.tl.progress() * 100 })
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
            // onReverseComplete: () => {
            //   const ref = this.$refs['frame' + index]
            //   const slot = ref?.$slots?.default
            //   if (slot && slot[0]?.componentInstance?.resetTL)
            //     slot[0].componentInstance.resetTL()
            // },
          }
        )
        addSectionCallbacks(this.tl, {
          start: sectionIncrement * (index - 0.99),
          end: sectionIncrement * (index + 0.99),
          onEnter: () => tween.play(),
          // onLeave: () => tween.reverse(),
          // onEnterBack: () => tween.play(),
          // onLeaveBack: () => tween.reverse(),
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
      if (this.shakeTL) this.shakeTL.progress(0).play()
    },
    showTitle1() {
      this.setIndication(
        true,
        "Coucou c'est Marie. J'ai quelque chose à vous dire !"
      )
      this.$store.dispatch('playSound', { name: 'coucou' })

      setTimeout(() => this.setIndication(false), 2400)
    },
    showTitle2() {
      this.setIndication(true, 'Un certain message se cache !')

      setTimeout(() => this.setIndication(false), 2400)
    },
    left({ index }) {
      if (index - 1 === 0) this.$store.dispatch('playSound', { name: 'miaou' })
      if (index > 0) {
        window.scrollTo({
          left: 0,
          top: window.scrollY - 10,
          behavior: 'smooth',
        })
        this.$store.dispatch('playSound', { name: 'star' })
      }
    },
    right({ index }) {
      if (index === 0) {
        this.$store.dispatch('stopSound', { name: 'miaou' })
      }
      if (index < 4) {
        window.scrollTo({
          left: 0,
          top: window.scrollY + 10,
          behavior: 'smooth',
        })
        this.$store.dispatch('playSound', { name: 'star' })
      }

      if (index === 4) {
        this.showEnding = true
      }
    },
    sound(e) {
      this.$store.dispatch('setMute', { mute: e.target.checked })
    },
  },
}
</script>

<style lang="scss">
html {
  cursor: none;
}
*,
body {
  cursor: none !important;
  transition: none;
}

body {
  overflow-x: hidden;
  overflow-y: hidden !important;
  position: relative;

  &::after {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -1; // hide images
    content: url('/images/noel/noel-marie-1.png')
      url('/images/noel/noel-marie-2.gif')
      url('/images/noel/noel-section4-content1.gif')
      url('/images/noel/noel-section4-content2.gif')
      url('/images/noel/noel-section4-content3.gif');
    // load images
  }
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
    background-image: url('/images/noel/noel-cursor.png');
    z-index: 999;
    mix-blend-mode: normal;
    transition: none;
  }

  .sound {
    position: fixed;
    top: 4%;
    right: 4%;

    .tgl {
      display: none;

      // add default box-sizing for this scope
      &,
      &:after,
      &:before,
      & *,
      & *:after,
      & *:before,
      & + .tgl-btn {
        box-sizing: border-box;
        &::selection {
          background: none;
        }
      }

      + .tgl-btn {
        outline: 0;
        display: block;
        width: 6em;
        height: 2em;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:after,
        &:before {
          position: relative;
          display: block;
          content: '';
          width: 50%;
          height: 100%;
        }

        &:after {
          left: 0;
        }

        &:before {
          display: none;
        }
      }

      &:checked + .tgl-btn:after {
        left: 50%;
      }
    }

    .tgl-flip {
      + .tgl-btn {
        padding: 2px;
        transition: all 0.2s ease;
        font-family: sans-serif;
        perspective: 100px;
        &:after,
        &:before {
          display: inline-block;
          transition: all 0.4s ease;
          width: 100%;
          text-align: center;
          position: absolute;
          line-height: 2em;
          font-weight: bold;
          color: #fff;
          position: absolute;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          border-radius: 4px;
        }

        &:after {
          width: 120px;
          height: 64px;
          transform: rotateY(-180deg);
          background-image: url('/images/noel/noel-unmute.gif');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        &:before {
          width: 120px;
          height: 64px;
          background-image: url('/images/noel/noel-mute.gif');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }

        &:active:before {
          transform: rotateY(-20deg);
        }
      }

      &:checked + .tgl-btn {
        &:before {
          transform: rotateY(180deg);
        }

        &:after {
          transform: rotateY(0);
          left: 0;
        }

        &:active:after {
          transform: rotateY(20deg);
        }
      }
    }
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
        background-image: url('/images/noel/noel-bg-1.png');
      }

      &:nth-of-type(2)::after {
        background-image: url('/images/noel/noel-bg-2.png');
      }

      &:nth-of-type(3)::after {
        background-image: url('/images/noel/noel-bg-3.png');
      }

      &:nth-of-type(4)::after {
        background-image: url('/images/noel/noel-bg-4.png');
      }

      &:nth-of-type(5)::after {
        background-image: url('/images/noel/noel-bg-5.png');
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

  main.atom-wrapper {
    flex: none;
    height: calc(100vh - 52px);

    &.--isSafari {
      flex: 1;
      height: auto;
    }
  }
}
</style>
