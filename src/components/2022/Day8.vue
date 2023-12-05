<template>
  <Day :day="8" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="991" height="991" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="991" height="991" />
      </div>
    </template>
  </Day>
</template>

<script>
import { createColorGradient } from '@/util/color'
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
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input into a numeric 2d grid
      const grid = input.map(i => i.split('').map(c => +c))

      // Remember which cells are visible
      const visibleGrid = grid.map((r, y) => r.map((c, x) => (y === 0 || x === 0 || y === grid.length - 1 || x === r.length - 1) ? 1 : 0))
      // Remember the highest viewing score
      let highestViewingScore = {
        x: 0,
        y: 0,
        score: 0
      }

      // Iterate the grid
      for (let y = 1; y < grid.length - 1; y++) {
        for (let x = 1; x < grid[y].length - 1; x++) {
          // Get the trees to all four sides (top, right, bottom, left)
          const sides = this.getSides(grid, x, y)

          // If for ANY side, ALL trees are smaller, then it's visible
          if (sides.some(s => s.length < 1 || s.every(c => c < grid[y][x]))) {
            visibleGrid[y][x] = 1
          }

          // Calculate the viewing score
          const viewingScore = sides.map(s => {
            // For each side, sum up the trees that are visible
            let score = 0

            for (let i = 0; i < s.length; i++) {
              score++

              if (s[i] >= grid[y][x]) {
                break
              }
            }

            return score
          }).reduce((a, b) => a * b, 1)

          if (viewingScore > highestViewingScore.score) {
            // New highest score found
            highestViewingScore = {
              x: x,
              y: y,
              score: viewingScore
            }
          }
        }
      }

      // Part one is the count of all visible trees
      this.solutions.partOne = visibleGrid.reduce((a, b) => a + b.reduce((c, d) => c + d), 0)
      // Part two is the highest viewing score
      this.solutions.partTwo = highestViewingScore.score

      // Now draw the result
      this.$nextTick(() => {
        this.drawGridOne(grid, visibleGrid)
        this.drawGridTwo(grid, highestViewingScore)
      })
    },
    getSides: function (grid, x, y) {
      // Get the trees to all four sides
      const top = grid.slice(0, y).map(r => r[x]).reverse()
      const right = grid[y].slice(x + 1, grid[y].length)
      const bottom = grid.slice(y + 1, grid.length).map(r => r[x])
      const left = grid[y].slice(0, x).reverse()

      return [top, right, bottom, left]
    },
    drawGridOne: function (grid, visible) {
      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const ctx = canvas.getContext('2d')
      // Offset for better drawing accuracy
      ctx.translate(0.5, 0.5)
      ctx.lineWidth = 1

      // Create gradient
      const gradient = createColorGradient('#b8e994', '#079992', 10)

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (visible[y][x]) {
            // Draw rectangle around visible trees
            ctx.strokeStyle = 'black'
            ctx.rect(x * 10, y * 10, 10, 10)
            ctx.stroke()
          }
          // Fill all of them
          ctx.fillStyle = gradient[grid[y][x]]
          ctx.fillRect(x * 10, y * 10, 10, 10)
        }
      }
    },
    drawGridTwo: function (grid, highest) {
      // Initialise the canvas
      const canvas = document.getElementById('partTwo')
      const ctx = canvas.getContext('2d')
      // Offset for better drawing accuracy
      ctx.translate(0.5, 0.5)
      ctx.lineWidth = 1

      // Create gradients
      const bgGradient = createColorGradient('#57606f', '#2f3542', 10)
      const highlightGradient = createColorGradient('#b8e994', '#079992', 10)

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (x === highest.x && y === highest.y) {
            // Highlight highest scoring one
            ctx.fillStyle = highlightGradient[grid[y][x]]
            ctx.fillRect(x * 10, y * 10, 10, 10)
          } else {
            // Fill all the others with bg gradient
            ctx.fillStyle = bgGradient[grid[y][x]]
            ctx.fillRect(x * 10, y * 10, 10, 10)
          }
        }
      }

      // Now highlight all the trees that are visible from here
      const cell = grid[highest.y][highest.x]
      for (let y = highest.y + 1; y < grid.length; y++) {
        ctx.fillStyle = highlightGradient[grid[y][highest.x]]
        ctx.fillRect(highest.x * 10, y * 10, 10, 10)
        if (grid[y][highest.x] > cell) {
          break
        }
      }
      for (let y = highest.y - 1; y >= 0; y--) {
        ctx.fillStyle = highlightGradient[grid[y][highest.x]]
        ctx.fillRect(highest.x * 10, y * 10, 10, 10)
        if (grid[y][highest.x] > cell) {
          break
        }
      }
      for (let x = highest.x + 1; x < grid[highest.y].length; x++) {
        ctx.fillStyle = highlightGradient[grid[highest.y][x]]
        ctx.fillRect(x * 10, highest.y * 10, 10, 10)
        if (grid[highest.y][x] > cell) {
          break
        }
      }
      for (let x = highest.x - 1; x >= 0; x--) {
        ctx.fillStyle = highlightGradient[grid[highest.y][x]]
        ctx.fillRect(x * 10, highest.y * 10, 10, 10)
        if (grid[highest.y][x] > cell) {
          break
        }
      }
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
