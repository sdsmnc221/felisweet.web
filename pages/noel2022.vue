<template>
  <atom-wrapper tag="main">
    <div class="sections">
      <div class="bg"></div>
      <section>
        <noel-frame without-long-ball>
          <noel-miaou />
        </noel-frame>
      </section>
      <section>
        <noel-frame>
          <noel-marie />
        </noel-frame>
      </section>
      <section><noel-frame>Section 3</noel-frame></section>
      <section><noel-frame>Section 4</noel-frame></section>
      <section>
        <noel-frame>
          <iframe
            ref="iframe"
            allowfullscreen="allowfullscreen"
            scrolling="no"
            src="https://heyzine.com/flip-book/017363908b.html"
          />
        </noel-frame>
      </section>
    </div>
  </atom-wrapper>
</template>

<script>
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AtomWrapper from '../components/atoms/AtomWrapper'
import NoelFrame from '../components/noel/NoelFrame'
import NoelMiaou from '../components/noel/NoelMiaou'
import NoelMarie from '../components/noel/NoelMarie'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    NoelFrame,
    NoelMiaou,
    NoelMarie,
  },
  created() {
    this.$gsap.registerPlugin(ScrollTrigger)
  },
  mounted() {
    const duration = 3.2

    const sections = this.$gsap.utils.toArray('section')
    const bg = document.body.querySelector('.sections .bg')

    // const sectionIncrement = duration / (sections.length - 1)
    const tl = this.$gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
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
  },
}
</script>

<style lang="scss">
*,
body {
  cursor: url('/images/noel-cursor.png'), default;
}
body {
  overflow-x: hidden;
  overflow-y: scroll;
}
main.atom-wrapper {
  width: auto;
  max-width: 500vw;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

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
}
</style>
