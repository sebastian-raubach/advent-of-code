<template>
  <Day :day="11" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="518" height="518" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createColorGradient } from '@/util/color'

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
      ns: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]],
      grids: [],
      round: 0
    }
  },
  methods: {
    onInputChanged: function (input) {
      const grid = input.map(r => r.split('').map(c => {
        return {
          v: +c,
          flashed: false
        }
      }))

      // Total flash counter
      let totalFlashes = 0
      // Current round index
      let i = 0
      while (true) {
        // Keep track of the ones that have flashed and need to increase their neighbors
        const queue = []

        grid.forEach((r, y) => r.forEach((c, x) => {
          // Increase first
          c.v++

          // If they'll flash, add to queue
          if (c.v > 9) {
            queue.push({ x: x, y: y })
          }
        }))

        let roundFlashes = 0
        // Now go through the queue while there are still ones that have to flash
        while (queue.length > 0) {
          // Get the next one
          const next = queue.shift()
          // Get the corresponding grid cell
          const gridCell = grid[next.y][next.x]
          // If it hasn't flashed yet (it may be in the queue multiple times)
          if (!gridCell.flashed) {
            // Flash
            gridCell.flashed = true
            roundFlashes++

            // Increment all neighbors
            this.getNeighbors(next.x, next.y).forEach(n => {
              const nbc = grid[n.y][n.x]
              if (!nbc.flashed) {
                nbc.v++

                if (nbc.v > 9) {
                  queue.push(n)
                }
              }
            })
          }
        }

        const flashMap = grid.map(r => r.map(c => Math.min(9, c.v)))
        Object.freeze(flashMap)
        this.grids.push(flashMap)

        // Reset each flashed node
        grid.forEach(r => r.forEach(c => {
          c.flashed = false
          if (c.v > 9) {
            c.v = 0
          }
        }))

        // Increment
        i++
        totalFlashes += roundFlashes

        if (i === 100) {
          // Found solution one after 100 iterations
          this.solutions.partOne = totalFlashes
        }
        if (roundFlashes === 100) {
          // Found solution two after all have flashed in the same round
          this.solutions.partTwo = i

          this.$nextTick(() => window.requestAnimationFrame(this.draw))

          return
        }
      }
    },
    getNeighbors: function (x, y) {
      // Create all possible neighbors, then filter out invalid ones
      return this.ns.map(n => {
        const dx = x + n[0]
        const dy = y + n[1]

        return {
          x: dx,
          y: dy
        }
      }).filter(n => {
        return n.x >= 0 && n.x < 10 && n.y >= 0 && n.y < 10
      })
    },
    draw: function () {
      const ctx = document.getElementById('partTwo').getContext('2d')
      ctx.clearRect(0, 0, 518, 518)
      const gradient = createColorGradient('#C4E538', '#006266', 10)

      const grid = this.grids[this.round]
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          ctx.fillStyle = gradient[grid[y][x]]
          ctx.fillRect(x * 50, y * 50, 50, 50)
        }
      }

      this.round = (this.round + 1) % this.grids.length

      setTimeout(() => window.requestAnimationFrame(this.draw), 100)
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 522px;
  width: 100%;
}
</style>
