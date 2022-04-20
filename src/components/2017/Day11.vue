<template>
  <Day :day="11" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="800" height="500" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

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
      r: 2,
      directions: {
        n: point => { point.r-- },
        ne: point => {
          point.r--
          point.q++
        },
        se: point => { point.q++ },
        s: point => { point.r++ },
        sw: point => {
          point.q--
          point.r++
        },
        nw: point => { point.q-- }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.solutions.partOne = ''

      this.$nextTick(() => {
        const directions = input[0].split(',')

        // Keep a copy of the origin
        const origin = {
          q: 0,
          r: 0
        }
        // Keep track of the current position
        const current = {
          q: 0,
          r: 0
        }

        // Initialise the canvas
        const canvas = document.getElementById('partOne')
        const ctx = canvas.getContext('2d')
        // Keep track of all points and the edges for drawing
        const points = []
        const edges = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }

        points.push(origin)

        // Get the maximum distance for part two
        let maxDistance = -Number.MAX_SAFE_INTEGER

        directions.forEach(d => {
          // Adjust the position
          this.directions[d](current)

          // Calculate the x and hy coordinate for drawing
          const x = this.r * (3.0 / 2 * current.q)
          const y = this.r * (Math.sqrt(3) / 2 * current.q + Math.sqrt(3) * current.r)

          // Adjust the bounding box
          edges.left = Math.min(edges.left, x)
          edges.right = Math.max(edges.right, x)
          edges.top = Math.min(edges.top, y)
          edges.bottom = Math.max(edges.bottom, y)

          // Keep track of the point
          points.push({
            x: x,
            y: y
          })

          // Calculate the distance to the origin for part two
          const distance = this.getDistance(origin, current)

          // Keep the maximum
          if (distance > maxDistance) {
            maxDistance = distance
          }
        })

        // Set the canvas size and translate the origin
        canvas.width = Math.abs(edges.right) + Math.abs(edges.left)
        canvas.height = Math.abs(edges.top) + Math.abs(edges.bottom)
        ctx.translate(Math.abs(edges.left), Math.abs(edges.top))

        // Draw the canvas
        points.forEach((p, i) => {
          ctx.strokeStyle = i === 0 ? 'green' : ((i === points.length - 1) ? 'red' : 'black')
          ctx.fillStyle = i === 0 ? 'green' : ((i === points.length - 1) ? 'red' : 'white')
          this.drawHexagon(ctx, p)
        })

        // Set the solutions
        this.solutions.partOne = this.getDistance(origin, current)
        this.solutions.partTwo = maxDistance
      })
    },
    getDistance: function (a, b) {
      // Calculate the distance using https://www.redblobgames.com/grids/hexagons/#distances
      return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2
    },
    drawHexagon: function (ctx, point) {
      // Draw the hex
      const a = 2 * Math.PI / 6
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(point.x + this.r * Math.cos(a * i), point.y + this.r * Math.sin(a * i))
      }
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 800px;
  width: 100%;
}
</style>
