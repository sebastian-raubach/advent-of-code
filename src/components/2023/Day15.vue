<template>
  <Day :day="15" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="200" height="1536" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mod } from '@/util/math'

import { createMultiColorGradient, VIRIDIS } from '@/util/color'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    hash: function (str) {
      const parts = str.split('')
      let sum = 0

      parts.forEach(c => {
        sum += c.charCodeAt(0)
        sum *= 17
        sum = mod(sum, 256)
      })
      return sum
    },
    onInputChanged: function (input) {
      this.solutions.partOne = input[0].split(',').map(i => this.hash(i)).reduce((a, b) => a + b, 0)

      const boxes = Array.from(Array(256).keys()).map(i => [])

      input[0].split(',').forEach(i => {
        if (i.endsWith('-')) {
          const label = i.substring(0, i.length - 1)
          const hash = this.hash(label)
          const box = boxes[hash]

          const index = box.findIndex(l => l.label === label)

          if (index !== -1) {
            box.splice(index, 1)
          }
        } else {
          const [label, lens] = i.split('=')
          const hash = this.hash(label)
          const box = boxes[hash]
          const index = box.findIndex(l => l.label === label)

          if (index !== -1) {
            box[index].lens = +lens
          } else {
            box.push({
              label: label,
              lens: +lens
            })
          }
        }
      })

      this.solutions.partTwo = boxes.map((b, bi) => {
        return b.map((l, li) => (bi + 1) * (li + 1) * l.lens).reduce((a, b) => a + b, 0)
      }).reduce((a, b) => a + b, 0)

      this.$nextTick(() => this.plot(boxes))
    },
    plot: function (boxes) {
      const maxWidth = Math.max(...boxes.map(b => b.length))
      const maxLens = Math.max(...boxes.map(b => Math.max(...b.map(l => l.lens))))

      const gradient = createMultiColorGradient(VIRIDIS, maxLens + 1)

      // Initialise the canvas
      const canvas = document.getElementById('partTwo')

      // Set the canvas size
      const hFactor = 20
      const wFactor = 30
      const padding = 2
      canvas.width = (maxWidth + padding) * wFactor + 30
      canvas.height = (boxes.length + padding) * hFactor

      const ctx = canvas.getContext('2d')
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'end'
      ctx.textBaseline = 'middle'

      ctx.fillStyle = '#222222'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      boxes.forEach((b, bi) => {
        ctx.fillStyle = '#ffffff'
        ctx.fillText(`${bi + 1}`, 30, bi * hFactor + hFactor / 2)

        b.forEach((l, li) => {
          const lensThickness = 0.7 + (l.lens * (1 - 0.3)) / maxLens * wFactor / 2
          const x = 30 + padding + li * wFactor + wFactor / 2
          const y = bi * hFactor + padding / 2
          ctx.fillStyle = gradient[l.lens]
          ctx.beginPath()
          ctx.moveTo(x, y)
          console.log(lensThickness, lensThickness)
          ctx.bezierCurveTo(x + lensThickness, y + hFactor * 0.25, x + lensThickness, y + hFactor * 0.75, x, y + hFactor - padding - padding / 2)
          ctx.bezierCurveTo(x - lensThickness, y + hFactor * 0.75, x - lensThickness, y + hFactor * 0.25, x, y)
          ctx.fill()
        })
      })
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow: auto;
  height: 1000px;
  width: 100%;
}
</style>
