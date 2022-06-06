<template>
  <Day :day="18" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      neighbors: [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.gridsOne = []
      this.gridsTwo = []
      this.roundOne = 0
      this.roundTwo = 0

      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      // Convert the input into a boolean 2d array
      const grid = input.map(i => i.split('').map(c => c === '#'))
      // Take a copy of the original grid, then run as normal
      this.solutions.partOne = this.run(grid.map(r => r.concat()), false)
      // Take a copy of the original grid, then run with corners fixed
      this.solutions.partTwo = this.run(grid.map(r => r.concat()), true)

      this.$nextTick(() => window.requestAnimationFrame(this.draw))
    },
    run: function (grid, cornersOn) {
      // Run 100 times
      for (let i = 0; i < 100; i++) {
        // Fix corner points if required
        if (cornersOn) {
          grid[0][0] = 1
          grid[0][grid[0].length - 1] = 1
          grid[grid.length - 1][0] = 1
          grid[grid.length - 1][grid[0].length - 1] = 1

          this.gridsTwo.push(grid)
        } else {
          this.gridsOne.push(grid)
        }

        // Take a copy
        const copy = grid.map(r => r.concat())

        // Iterate both dimensions
        for (let y = 0; y < copy.length; y++) {
          for (let x = 0; x < copy[y].length; x++) {
            // Count the neighbors that are turned on by first getting their theoretical position
            // Then excluding the ones outside the grid, then mapping to their value, then counting
            const neighborCount = this.neighbors.map(n => [x + n[0], y + n[1]])
              .filter(n => n[0] >= 0 && n[0] < copy[y].length && n[1] >= 0 && n[1] < copy.length)
              .map(n => grid[n[1]][n[0]] ? 1 : 0)
              .reduce((a, b) => a + b, 0)

            // Update the grid cell
            if (grid[y][x]) {
              copy[y][x] = neighborCount === 2 || neighborCount === 3
            } else {
              copy[y][x] = neighborCount === 3
            }
          }
        }

        // Store the copy back as the new state
        grid = copy
      }

      // Fix corner points if required
      if (cornersOn) {
        grid[0][0] = 1
        grid[0][grid[0].length - 1] = 1
        grid[grid.length - 1][0] = 1
        grid[grid.length - 1][grid[0].length - 1] = 1

        this.gridsTwo.push(grid)
      } else {
        this.gridsOne.push(grid)
      }

      // Return the number of "turned-on" cells
      return grid.map(r => r.map(c => c ? 1 : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
    },
    drawBits: function (id, grids, count) {
      // Check the element actually exists
      const el = document.getElementById(id)
      if (!el) {
        return
      }

      // Get context, clear canvas
      const ctx = el.getContext('2d')
      ctx.clearRect(0, 0, 1000, 1000)

      // Draw grid
      const grid = grids[count]
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          ctx.fillStyle = grid[y][x] ? '#C4E538' : '#006266'
          ctx.fillRect(x * 10, y * 10, 10, 10)
        }
      }
    },
    draw: function () {
      // Draw both grids
      this.drawBits('partOne', this.gridsOne, this.roundOne)
      this.drawBits('partTwo', this.gridsTwo, this.roundTwo)
      // Update the indices
      this.roundOne = (this.roundOne + 1) % this.gridsOne.length
      this.roundTwo = (this.roundTwo + 1) % this.gridsTwo.length

      // Redraw in 100ms
      this.timeout = setTimeout(() => window.requestAnimationFrame(this.draw), 100)
    }
  }
}
</script>

<style>
.canvas {
  width: 100%;
}
</style>
