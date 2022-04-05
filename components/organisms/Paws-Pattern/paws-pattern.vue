<template>
  <atom-wrapper ref="paws" class="paws-pattern" />
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
  },
  mounted() {
    const sections = Array.from(document.body.querySelectorAll('section'))
    const heights = sections.map((s) => s.getBoundingClientRect().height)

    for (let i = 0; i < sections.length; i++) {
      const { top, bottom } = this.getSectionTopBottom(heights, i)

      for (let j = 0; j < this.pawsPerSection; j++) {
        const s = random(16, 32) + 'vw'
        const l = random(0, 72) + 'vw'
        const t = random(top, bottom) + 'px'
        this.createPaw(s, l, t)
      }
    }
  },
  methods: {
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
  z-index: -2;

  .paw {
    position: absolute;
  }
}
</style>
