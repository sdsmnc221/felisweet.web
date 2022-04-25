<template>
  <atom-wrapper>
    <div ref="dot" class="cursor cursor--small"></div>
    <canvas ref="canvas" class="cursor cursor--canvas" resize></canvas>
  </atom-wrapper>
</template>

<script>
import * as paper from 'paper'
import SimplexNoise from 'simplex-noise'
import { lerp, map } from '../../../utils'

import AtomWrapper from '../../atoms/AtomWrapper/atom-wrapper.vue'

export default {
  name: 'DotCursor',
  components: { AtomWrapper },
  data() {
    return {
      clientX: -100,
      clientY: -100,
      lastX: 0,
      lastY: 0,
      stuckX: -100,
      stuckY: -100,
      isStuck: false,
      isNoisy: false,
    }
  },
  mounted() {
    this.initCursor()
    this.initCanvas()
    this.initHovers()
  },
  methods: {
    initCursor() {
      const dot = this.$refs.dot
      // add listener to track the current mouse position
      document.addEventListener('mousemove', (e) => {
        this.clientX = e.clientX
        this.clientY = e.clientY
      })

      // transform the innerCursor to the current mouse position
      // use requestAnimationFrame() for smooth performance
      const render = () => {
        dot.style.transform = `translate(${this.clientX}px, ${this.clientY}px)`
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    },
    initCanvas() {
      // let showCursor = false
      // let fillOuterCursor
      const canvas = this.$refs.canvas
      const shapeBounds = {
        width: 75,
        height: 75,
      }

      paper.setup(canvas)
      const strokeColor = '#7fbbdd'
      const strokeWidth = 1
      const segments = 8
      const radius = 16

      // we'll need these later for the noisy circle
      const noiseScale = 320 // speed
      const noiseRange = 8 // range of distortion

      // the base shape for the noisy circle
      const polygon = new paper.Path.RegularPolygon(
        new paper.Point(0, 0),
        segments,
        radius
      )
      polygon.strokeColor = strokeColor
      polygon.strokeWidth = strokeWidth
      polygon.smooth()
      const group = new paper.Group([polygon])
      group.applyMatrix = false

      const noiseObjects = polygon.segments.map(() => new SimplexNoise())
      let bigCoordinates = []

      // the draw loop of Paper.js
      // (60fps with requestAnimationFrame under the hood)
      paper.view.onFrame = (event) => {
        // using linear interpolation, the circle will move 0.2 (20%)
        // of the distance between its current position and the mouse
        // coordinates per Frame
        if (!this.isStuck) {
          // move circle around normally
          this.lastX = lerp(this.lastX, this.clientX, 0.2)
          this.lastY = lerp(this.lastY, this.clientY, 0.2)
          group.position = new paper.Point(this.lastX, this.lastY)
        } else if (this.isStuck) {
          // fixed position on a nav item
          this.lastX = lerp(this.lastX, this.stuckX, 0.2)
          this.lastY = lerp(this.lastY, this.stuckY, 0.2)
          group.position = new paper.Point(this.lastX, this.lastY)
        }

        if (this.isStuck && polygon.bounds.width < shapeBounds.width) {
          // scale up the shape
          polygon.scale(1.08)
        } else if (!this.isStuck && polygon.bounds.width > 30) {
          // remove noise
          if (this.isNoisy) {
            polygon.segments.forEach((segment, i) => {
              segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1])
            })
            this.isNoisy = false
            bigCoordinates = []
          }
          // scale down the shape
          const scaleDown = 0.92
          polygon.scale(scaleDown)
        }

        // while stuck and big, apply simplex noise
        if (this.isStuck && polygon.bounds.width >= shapeBounds.width) {
          this.isNoisy = true
          // first get coordinates of large circle
          if (bigCoordinates.length === 0) {
            polygon.segments.forEach((segment, i) => {
              bigCoordinates[i] = [segment.point.x, segment.point.y]
            })
          }

          // loop over all points of the polygon
          polygon.segments.forEach((segment, i) => {
            // get new noise value
            // we divide event.count by noiseScale to get a very smooth value
            const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0)
            const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1)

            // map the noise value to our defined range
            const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange)
            const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange)

            // apply distortion to coordinates
            const newX = bigCoordinates[i][0] + distortionX
            const newY = bigCoordinates[i][1] + distortionY

            // set new (noisy) coodrindate of point
            segment.point.set(newX, newY)
          })
        }
        polygon.smooth()
      }
    },
    initHovers() {
      // reset isStuck on mouseLeave

      // add event listeners to all items
      const linkItems = document.querySelectorAll('.link')
      linkItems.forEach((item) => {
        item.addEventListener('mouseenter', this.handleMouseEnter)
        item.addEventListener('mouseleave', this.handleMouseLeave)
      })
    },
    handleMouseEnter(e) {
      // find the center of the link element and set stuckX and stuckY
      // these are needed to set the position of the noisy circle
      const navItem = e.currentTarget
      const navItemBox = navItem.getBoundingClientRect()
      this.stuckX = Math.round(navItemBox.left + navItemBox.width / 2)
      this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2)
      this.isStuck = true
    },
    handleMouseLeave() {
      this.isStuck = false
    },
  },
}
</script>

<style lang="scss">
.cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
}
.cursor--small {
  width: 8px;
  height: 8px;
  left: -2.5px;
  top: -2.5px;
  border-radius: 50%;
  z-index: 11000;
  background: $color-jellybean-blue;
  transition: none;
}
.cursor--canvas {
  width: 100vw;
  height: 100vh;
  z-index: 12000;
}
</style>
