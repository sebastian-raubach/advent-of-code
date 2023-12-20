<template>
  <Day :day="17" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="1000" height="1000" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="1000" height="1000" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/util/color'

const { PriorityQueue } = require('@datastructures-js/priority-queue')

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
      dirs: [[0, 1], [1, 0], [0, -1], [-1, 0]]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.grid = input.map(i => i.split('').map(Number))

      const p1 = this.solve(1, 3)
      this.solutions.partOne = p1.cost
      const p2 = this.solve(4, 10)
      this.solutions.partTwo = p2.cost

      this.$nextTick(() => {
        this.draw('partOne', p1.path)
        this.draw('partTwo', p2.path)
      })
    },
    solve: function (minDist, maxDist) {
      const seen = new Set()
      const costs = {}

      // Use a priority queue to keep track of the node with lowest cost
      const queue = new PriorityQueue({
        compare: (a, b) => a.cost - b.cost
      })

      queue.enqueue({ x: 0, y: 0, cost: 0, dd: -1, path: [] })

      while (queue.size() > 0) {
        const current = queue.dequeue()
        const currKey = `${current.x}|${current.y}|${current.dd}`

        if (current.x === this.grid[0].length - 1 && current.y === this.grid.length - 1) {
          return current
        }
        if (seen.has(currKey)) {
          continue
        }
        seen.add(currKey)
        for (let dir = 0; dir < this.dirs.length; dir++) {
          let costIncrease = 0

          if (dir === current.dd || (dir + 2) % 4 === current.dd) {
            // Can't go further this way and can't go back
            continue
          }
          for (let dist = 1; dist <= maxDist; dist++) {
            const xx = current.x + this.dirs[dir][0] * dist
            const yy = current.y + this.dirs[dir][1] * dist

            if (this.inRange(xx, yy)) {
              costIncrease += this.grid[yy][xx]
              if (dist < minDist) {
                continue
              }
              const nc = current.cost + costIncrease
              const key = `${xx}|${yy}|${dir}`
              if (costs[key] && costs[key] <= nc) {
                // Cheaper route exists
                continue
              }
              costs[key] = nc
              const tempPath = current.path.concat()
              tempPath.push({ x: xx, y: yy, cost: nc })
              queue.enqueue({ x: xx, y: yy, cost: nc, dd: dir, path: tempPath })
            }
          }
        }
      }
    },
    inRange: function (x, y) {
      return x >= 0 && y >= 0 && x < this.grid[0].length && y < this.grid.length
    },
    draw: function (id, path) {
      // Initialise the canvas
      const canvas = document.getElementById(id)
      const factor = 10

      // Update dimensions based on grid sizes
      canvas.width = (this.grid[0].length + 1) * factor
      canvas.height = (this.grid.length + 1) * factor

      const ctx = canvas.getContext('2d')

      this.$nextTick(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Offset for better drawing accuracy
        ctx.translate(0.5, 0.5)
        ctx.lineWidth = 1

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create gradient
        const bgGradient = createColorGradient('#2f3542', '#57606f', 10)
        const fgGradient = createMultiColorGradient(VIRIDIS, path[path.length - 1].cost + 1)

        for (let y = 0; y < this.grid.length; y++) {
          for (let x = 0; x < this.grid[y].length; x++) {
            // Fill cells according to elevation
            ctx.fillStyle = bgGradient[this.grid[y][x] - 1]
            ctx.fillRect(x * factor, y * factor, factor, factor)
          }
        }

        // Now draw the path oulines
        ctx.strokeStyle = 'black'

        path.unshift({ x: 0, y: 0 })

        ctx.translate(-0.5, -0.5)

        for (let i = 1; i < path.length; i++) {
          this.getBetween(path[i - 1], path[i]).forEach(p => {
            // Draw rectangle around visible trees
            ctx.fillStyle = fgGradient[p.cost]
            ctx.fillRect(p.x * factor, p.y * factor, factor, factor)
          })
        }
      })
    },
    getBetween: function (a, b) {
      const result = [a, b]

      if (a.x !== b.x) {
        for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
          result.push({ x: x, y: a.y, cost: a.cost })
        }
      } else {
        for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
          result.push({ x: a.x, y: y, cost: a.cost })
        }
      }

      return result
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
