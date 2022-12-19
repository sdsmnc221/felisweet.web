<template>
  <div ref="main" class="noel-mission-catmas">
    <img
      ref="title"
      class="title"
      src="/images/noel/noel-section4-title.gif"
      alt=""
    />
    <div class="content">
      <p>De belles cartes...</p>
    </div>
    <div class="content">
      <img src="/images/noel/noel-section4-content1.gif" alt="" />
    </div>
    <div class="content">
      <p>de jolies photos de vos chats...</p>
    </div>
    <div class="content">
      <img src="/images/noel/noel-section4-content2.gif" alt="" />
    </div>
    <div class="content">
      <p>des stickers, des timbres et enveloppes...</p>
    </div>
    <div class="content">
      <img src="/images/noel/noel-section4-content3.gif" alt="" />
    </div>
    <div class="content">
      <p>tout a été préparé avec minutie et amour.</p>
    </div>
    <div class="content">
      <p>Un "happy mail", un courrier du bonheur, vous a été destiné,</p>
    </div>
    <div class="content">
      <p>
        pour que vos chats et vous puissiez partager ce beau moment de bonheur
        avec FeliSweet.
      </p>
    </div>
    <button-arrow
      v-if="index < total - 1"
      direction="down"
      :size="36"
      :arrow-size="36"
      :on-click="next"
    />
  </div>
</template>

<script>
import ButtonArrow from '../../atoms/ButtonArrow'
export default {
  name: 'NoelMissionCatmas',
  components: { ButtonArrow },
  data() {
    return {
      tl: null,
      index: 0,
      total: 0,
    }
  },
  mounted() {
    this.tl = this.$gsap
      .timeline({ paused: true })
      .to(
        this.$refs.title,
        {
          scale: 0.84,
          top: '-18%',
          left: '50%',
          xPercent: -50,
          yPercent: 0,
          x: 0,
          y: 0,
          duration: 3.6,
          ease: 'circ.in',
        },
        0
      )
      .fromTo(
        this.$refs.iframe,
        { opacity: 0, scale: 0, pointerEvents: 'none' },
        {
          opacity: 1,
          scale: 1,
          duration: 2.4,
          ease: 'circ.in',
          pointerEvents: 'auto',
        },
        '>'
      )

    const contents = this.$gsap.utils.toArray('.content')
    this.total = contents.length

    this.$gsap.set(contents, { opacity: 0 })

    this.$gsap.to(contents[this.index], {
      opacity: 1,
      ease: 'circ.in',
      duration: 1.6,
    })
  },
  methods: {
    startTL() {
      if (this.tl) this.tl.play()
    },
    resetTL() {
      if (this.tl) this.tl.reverse()
    },
    next() {
      const contents = this.$gsap.utils.toArray('.content')
      this.index++

      if (this.index < this.total) {
        this.$store.dispatch('playSound', { name: 'chime' })
        this.$gsap
          .timeline()
          .to(contents, {
            opacity: 0,
            mixBlendMode: 'multiply',
            ease: 'circ.in',
            duration: 1.6,
          })
          .to(
            contents[this.index],
            {
              opacity: 1,
              ease: 'circ.in',
              duration: 1.6,
            },
            '>'
          )
      }
    },
  },
}
</script>

<style lang="scss">
.noel-mission-catmas {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    pointer-events: none;
    position: absolute;
    height: auto;
    width: 28%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 10% 24%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
      margin: 0 32px;
      font-size: 1.6rem;
    }

    img {
      display: block;
      width: auto;
      height: 100%;
      mix-blend-mode: multiply;
    }
  }

  .button-arrow {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;

    img {
      width: 18px !important;
      height: 18px !important;
    }
  }

  @media #{$mq-mobile-tablet} and (orientation:landscape) {
    .content {
      p {
        font-size: 1.2rem;
      }

      &:last-of-type {
        p {
          margin-top: 32px;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
