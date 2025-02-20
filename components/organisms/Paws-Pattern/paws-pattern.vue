<template>
  <atom-wrapper ref="paws" class="paws-pattern" :class="{ '--deep': deep }" />
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import { randomNumberInRange as random } from '../../../utils'
import PawImage from '../../../static/images/paw.svg'

export default {
  components: { AtomWrapper },
  props: {
    pawsPerSection: {
      type: Number,
      default: 2,
    },
    deep: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    const sections = Array.from(document.body.querySelectorAll('section'))
    const heights = sections.map((s) => s.getBoundingClientRect().height)

    for (let i = 0; i < sections.length; i++) {
      const { top, bottom } = this.getSectionTopBottom(heights, i)

      for (let j = 0; j < this.pawsPerSection; j++) {
        const otherPaws = [...document.querySelectorAll('.paw')]
        let s, l, t, sInPx, lInPx

        s = random(8, 16)
        l = random(0, 100)
        t = random(top, bottom)

        sInPx = (s * window.innerWidth) / 100
        lInPx = (l * window.innerWidth) / 100

        while (
          otherPaws.some((paw) => {
            return this.overlapCheck(paw.getBoundingClientRect(), {
              top: t,
              bottom: t + sInPx,
              left: lInPx,
              right: lInPx + sInPx,
            })
          })
        ) {
          s = random(8, 16)
          l = random(0, 100)
          t = random(top, bottom)

          sInPx = (s * window.innerWidth) / 100
          lInPx = (l * window.innerWidth) / 100
        }

        this.createPaw(sInPx + 'px', lInPx + 'px', t + 'px')
      }
    }
  },
  methods: {
    overlapCheck(rect1, rect2) {
      const isOverlapping = !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      )

      return isOverlapping
    },
    createPaw(size, left, top) {
      const img = document.createElement('img')
      img.classList.add('paw')
      img.src = PawImage
      img.style.width = size
      img.style.top = top
      img.style.left = left
      img.style.transform = `rotate(${random(0, 360)}deg)`

      this.$refs.paws.appendChild(img)
    },
    getSectionTopBottom(heights, sectionId) {
      let top = 0
      let bottom = 0

      for (let i = 0; i <= sectionId; i++) {
        bottom += heights[i]
      }
      top = bottom - heights[sectionId]

      return { top, bottom }
    },
  },
}
</script>

<style lang="scss">
.paws-pattern {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  pointer-events: none;

  &.--deep {
    z-index: 0;
  }

  &:not(.--deep) {
    z-index: -2;
  }

  .paw {
    position: absolute;
  }
}
</style>
