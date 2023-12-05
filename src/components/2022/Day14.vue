<template>
  <Day :day="14" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" :width="canvasOne.width" :height="canvasOne.height" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" :width="canvasTwo.width" :height="canvasTwo.height" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createMultiColorGradient, VIRIDIS } from '@/util/color'

const ROCK = 0
const SAND = 1

export default {
  components: {
    Day
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      canvasOne: {
        height: 1000,
        width: 1000
      },
      canvasTwo: {
        height: 1000,
        width: 1000
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const p1 = this.solve(input.concat(), false)
      this.solutions.partOne = p1.count
      const p2 = this.solve(input.concat(), true)
      this.solutions.partTwo = p2.count

      this.$nextTick(() => {
        this.draw('partOne', this.canvasOne, p1)
        this.draw('partTwo', this.canvasTwo, p2)
      })
    },
    solve: function (input, addFloor) {
      const xBounds = [500, 500]
      const yBounds = [0, 0]

      const grid = new Map()

      input.forEach(line => {
        const parts = line.split(' -> ').map(c => c.split(',').map(n => +n))
        xBounds[0] = Math.min(xBounds[0], parts[0][0])
        xBounds[1] = Math.max(xBounds[1], parts[0][0])
        yBounds[0] = Math.min(yBounds[0], parts[0][1])
        yBounds[1] = Math.max(yBounds[1], parts[0][1])

        for (let i = 1; i < parts.length; i++) {
          xBounds[0] = Math.min(xBounds[0], parts[i][0])
          xBounds[1] = Math.max(xBounds[1], parts[i][0])
          yBounds[0] = Math.min(yBounds[0], parts[i][1])
          yBounds[1] = Math.max(yBounds[1], parts[i][1])

          const from = parts[i - 1]
          const to = parts[i]

          if (from[0] === to[0]) {
            // Same x, iterate y
            const yMin = Math.min(from[1], to[1])
            const yMax = Math.max(from[1], to[1])
            for (let y = yMin; y <= yMax; y++) {
              grid.set(`${from[0]},${y}`, { t: ROCK })
            }
          } else {
            // Same y, iterate x
            const xMin = Math.min(from[0], to[0])
            const xMax = Math.max(from[0], to[0])
            for (let x = xMin; x <= xMax; x++) {
              grid.set(`${x},${from[1]}`, { t: ROCK })
            }
          }
        }
      })

      if (addFloor) {
        xBounds[0] -= yBounds[1]
        xBounds[1] += yBounds[1]
        yBounds[1] += 2
        for (let x = xBounds[0] - yBounds[1]; x <= xBounds[1] + yBounds[1]; x++) {
          grid.set(`${x},${yBounds[1]}`, { t: ROCK })
        }
      }

      let count = 0
      while (true) {
        let sand = [500, 0]
        const path = []

        while (true) {
          path.push(sand.concat())

          if (sand[1] > yBounds[1]) {
            // Overflow
            return {
              grid: grid,
              count: count,
              bounds: {
                x: xBounds,
                y: yBounds
              },
              path: path
            }
          }

          const b = [sand[0], sand[1] + 1]
          const bl = [sand[0] - 1, sand[1] + 1]
          const br = [sand[0] + 1, sand[1] + 1]

          if (!grid.has(`${b[0]},${b[1]}`)) {
            sand = b
          } else if (!grid.has(`${bl[0]},${bl[1]}`)) {
            sand = bl
          } else if (!grid.has(`${br[0]},${br[1]}`)) {
            sand = br
          } else {
            grid.set(`${sand[0]},${sand[1]}`, { t: SAND, c: count++ })

            if (sand[0] === 500 && sand[1] === 0) {
              return {
                grid: grid,
                count: count,
                bounds: {
                  x: xBounds,
                  y: yBounds
                },
                path: path
              }
            }
            break
          }
        }
      }
    },
    draw: function (id, dims, result) {
      // Initialise the canvas
      const canvas = document.getElementById(id)
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 1

      // Create gradient
      const sandGradient = createMultiColorGradient(VIRIDIS, result.count)

      const factor = 5

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dims.width = (result.bounds.x[1] - result.bounds.x[0] + 1) * factor
      dims.height = (result.bounds.y[1] - result.bounds.y[0] + 1) * factor

      this.$nextTick(() => {
        // Offset for better drawing accuracy
        ctx.translate(-result.bounds.x[0] * factor, -result.bounds.y[0] * factor)
        ctx.clearRect(0, 0, dims.width, dims.height)

        result.grid.forEach((value, key) => {
          const [x, y] = key.split(',').map(c => +c)
          if (value.t === SAND) {
            ctx.fillStyle = sandGradient[value.c]
          } else if (value.t === ROCK) {
            ctx.fillStyle = '#95a5a6'
          }

          ctx.fillRect(x * factor, y * factor, factor, factor)
        })

        result.path.forEach(p => {
          ctx.fillStyle = '#c0392b'
          ctx.fillRect(p[0] * factor, p[1] * factor, factor, factor)
        })
        ctx.translate(result.bounds.x[0] * factor, result.bounds.y[0] * factor)
      })
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow-x: auto;
  overflow-y: hidden;
  height: 991px;
  width: 100%;
}
</style>
