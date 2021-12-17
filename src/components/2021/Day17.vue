<template>
  <Day :day="17" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder" ref="canvasHolder">
        <canvas ref="partOne" class="canvas" width="800" height="1080" />
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
      canvasData: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input
      const [x, y] = input[0].replace('target area: x=', '').split(', y=').map(c => c.split('..').map(d => +d))
      const target = {
        xMin: x[0],
        xMax: x[1],
        yMin: y[0],
        yMax: y[1]
      }

      // Keep track of the max y and the count
      let maxY = Number.NEGATIVE_INFINITY
      let counter = 0
      // Keep track of the individual points of each trajectory for plotting
      const overallPoints = []

      // Check all y's that are at least the bottom of the target area and at most the negative bottom
      for (let velY = target.yMin; velY < -target.yMin; velY++) {
        // Check all x's that are at most the right edge of the target and at least 1
        for (let velX = target.xMax; velX > 0; velX--) {
          // Check the trajectory
          const [points, y] = this.getTrajectory({ x: velX, y: velY }, target)

          if (y !== null) {
            // Keep max y and increment counter
            maxY = Math.max(maxY, y)
            overallPoints.push(points)
            counter++
          }
        }
      }

      this.solutions.partOne = maxY
      this.solutions.partTwo = counter

      // Plot
      this.$nextTick(() => {
        this.plotPoints(overallPoints, target)
        this.$refs.canvasHolder.scrollTop = this.$refs.canvasHolder.scrollHeight
      })
    },
    getTrajectory: function (velocity, target) {
      // Start at the origin
      const curr = {
        x: 0,
        y: 0
      }

      // Keep track of the maximum x we've seen
      let maxY = Number.NEGATIVE_INFINITY
      // Keep track of all points on the trajectory
      const points = []

      // While we've not shot past the max x or the min y
      while (curr.x <= target.xMax && curr.y >= target.yMin) {
        // Adjust coordinates
        curr.x += velocity.x
        curr.y += velocity.y

        points.push([curr.x, curr.y])

        // Get max y
        maxY = Math.max(maxY, curr.y)

        // Adjust velocity
        velocity.x -= Math.sign(velocity.x)
        velocity.y--

        // Check if we're in the target area
        if (curr.x >= target.xMin && curr.x <= target.xMax && curr.y >= target.yMin && curr.y <= target.yMax) {
          return [points, maxY]
        }
      }

      return [null, null]
    },
    plotPoints: function (overallPoints, target) {
      // Get the bounding box
      const edges = {
        top: Math.max(0, target.yMax),
        left: Math.min(0, target.xMin),
        bottom: Math.min(0, target.yMin),
        right: Math.max(0, target.xMax)
      }
      overallPoints.forEach(set => {
        set.forEach(p => {
          edges.top = Math.max(edges.top, p[1])
          edges.left = Math.min(edges.left, p[0])
          edges.bottom = Math.min(edges.bottom, p[1])
          edges.right = Math.max(edges.right, p[0])
        })
      })

      // Set the canvas size and translate the origin
      const canvas = this.$refs.partOne
      canvas.width = Math.abs(edges.right) + Math.abs(edges.left)
      canvas.height = Math.abs(edges.top) + Math.abs(edges.bottom)
      const ctx = canvas.getContext('2d')
      ctx.translate(Math.abs(edges.left), Math.abs(edges.top))

      // Draw the origin
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, 1, 1)

      // Draw all trajectories
      overallPoints.forEach(set => {
        // Generate a gradient each
        const gradient = this.createColorGradient('#006266', '#C4E538', set.length)

        for (let i = 0; i < set.length - 1; i++) {
          ctx.strokeStyle = gradient[i]
          ctx.beginPath()
          ctx.moveTo(set[i][0], -set[i][1])
          ctx.lineTo(set[i + 1][0], -set[i + 1][1])
          ctx.stroke()
        }
      })

      // Mark the target
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(target.xMin, -target.yMin)
      ctx.lineTo(target.xMin, -target.yMax)
      ctx.lineTo(target.xMax, -target.yMax)
      ctx.lineTo(target.xMax, -target.yMin)
      ctx.lineTo(target.xMin, -target.yMin)
      ctx.stroke()
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 1080px;
  width: 100%;
}
</style>
