<template>
  <Day :day="17" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" :width="canvasOne.width" :height="canvasOne.height" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

const REST = '~'
const CLAY = '#'
const SAND = '.'
const HYPO = '|'
const SOURCE = 'x'

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
        width: 1000,
        height: 1000
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const clay = []
      input.forEach(i => {
        // Split x and y part
        const parts = i.split(', ')
        // Split each on the equals sign
        const one = parts[0].split('=')
        const two = parts[1].split('=')
        // Convert to numbers
        one[1] = +one[1]
        two[1] = two[1].split('..').map(d => +d)

        if (one[0] === SOURCE) {
          // If the first coordinate is x, fill in the y's according to the range
          for (let y = two[1][0]; y <= two[1][1]; y++) {
            clay.push({
              x: one[1],
              y: y
            })
          }
        } else {
          // If the first coordinate is y, fill in the x's according to the range
          for (let x = two[1][0]; x <= two[1][1]; x++) {
            clay.push({
              x: x,
              y: one[1]
            })
          }
        }
      })

      // Start with the spring
      const xRange = [500, 500]
      const yRange = [0, 0]
      this.clayyRange = [Number.MAX_VALUE, -Number.MAX_VALUE]

      // Then expand the range
      clay.forEach(c => {
        xRange[0] = Math.min(xRange[0], c.x)
        xRange[1] = Math.max(xRange[1], c.x)
        yRange[0] = Math.min(yRange[0], c.y)
        yRange[1] = Math.max(yRange[1], c.y)

        this.clayyRange[0] = Math.min(this.clayyRange[0], c.y)
        this.clayyRange[1] = Math.max(this.clayyRange[1], c.y)
      })
      // Add 1 cell padding
      xRange[0]--
      xRange[1]++
      this.clayyRange[0] -= yRange[0]
      this.clayyRange[1] -= yRange[0]

      // Fill the grid with sand
      this.grid = []
      for (let y = 0; y <= yRange[1] - yRange[0]; y++) {
        const row = []
        for (let x = 0; x <= xRange[1] - xRange[0]; x++) {
          row.push(SAND)
        }
        this.grid.push(row)
      }

      // Adjust coordinates to be relative to top left coordinate
      clay.forEach(c => {
        c.x -= xRange[0]
        c.y -= yRange[0]

        // Set the clay
        this.grid[c.y][c.x] = CLAY
      })

      // Set the spring
      this.spring = { x: 500 - xRange[0], y: 0 - yRange[0] }
      this.grid[this.spring.y][this.spring.x] = SOURCE

      this.solvePartOne()
      this.solvePartTwo()

      this.$nextTick(() => this.draw())
    },
    draw: function () {
      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 1

      // Create gradient
      // const sandGradient = createMultiColorGradient(VIRIDIS, result.count)

      const factor = 4

      this.canvasOne = {
        width: this.grid[0].length * factor,
        height: this.grid.length * factor
      }

      this.$nextTick(() => {
        for (let y = 0; y < this.grid.length; y++) {
          for (let x = 0; x < this.grid[y].length; x++) {
            if (this.grid[y][x] === REST) {
              ctx.fillStyle = '#3498db'
              ctx.fillRect(x * factor, y * factor, factor, factor)
            } else if (this.grid[y][x] === HYPO) {
              ctx.fillStyle = '#2980b9'
              ctx.fillRect(x * factor, y * factor, factor, factor)
            } else if (this.grid[y][x] === CLAY) {
              ctx.fillStyle = '#7f8c8d'
              ctx.fillRect(x * factor, y * factor, factor, factor)
            }
          }
        }
      })
    },
    goDown: function () {
      const valid = [CLAY, REST]

      // While we still have a position that can advance
      while (this.active.length > 0) {
        // Get the next one
        let current = this.active.shift().concat()
        while (true) {
          // Continue downwards as long as we're going through sand
          const next = current.concat()
          next[1]++

          if (next[1] >= this.grid.length) {
            // We reached the bottom
            break
          }

          if (this.grid[next[1]][next[0]] === SAND) {
            // If we hit sand, just continue downwards
            this.grid[next[1]][next[0]] = HYPO
            current = next
          } else if (this.grid[next[1]][next[0]] === CLAY || this.grid[next[1]][next[0]] === REST) {
            // Else, if we hit clay or water at rest, expand to the left and right
            let left = current.concat()
            let right = current.concat()

            // While we haven't reached a point where the water can overflow
            while (valid.includes(this.grid[left[1] + 1][left[0] - 1]) && valid.includes(this.grid[right[1] + 1][right[0] + 1])) {
              left = current.concat()
              right = current.concat()
              // Find the left boundary
              while (valid.includes(this.grid[left[1] + 1][left[0] - 1])) {
                if (this.grid[left[1]][left[0] - 1] === CLAY) {
                  break
                }
                left[0]--
                this.grid[left[1]][left[0]] = REST
              }
              // Find the right boundary
              while (valid.includes(this.grid[right[1] + 1][right[0] + 1])) {
                if (this.grid[right[1]][right[0] + 1] === CLAY) {
                  break
                }
                right[0]++
                this.grid[right[1]][right[0]] = REST
              }

              this.grid[current[1]][current[0]] = REST
              current[1]--
            }

            // We have reached a tipping point, fill the top layer with hypothetical water
            for (let x = left[0]; x < right[0] + 1; x++) {
              this.grid[left[1]][x] = HYPO
            }

            if (!valid.includes(this.grid[right[1] + 1][right[0] + 1])) {
              // If the overflow is to the right, remember this
              right[0]++
              this.grid[right[1]][right[0]] = HYPO
              this.active.push(right)
            }
            if (!valid.includes(this.grid[left[1] + 1][left[0] - 1])) {
              // If the overflow is to the left, remember this
              left[0]--
              this.grid[left[1]][left[0]] = HYPO
              this.active.push(left)
            }

            break
          } else {
            break
          }
        }
      }
    },
    solvePartOne: function () {
      // Start with one active position - the spring
      this.active = [[this.spring.x, this.spring.y]]
      // Iterate the way down
      this.goDown()

      // Count the occurances of water
      let counter = 0
      for (let y = this.clayyRange[0]; y <= this.clayyRange[1]; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          if (this.grid[y][x] === REST || this.grid[y][x] === HYPO) {
            counter++
          }
        }
      }
      this.solutions.partOne = counter
    },
    solvePartTwo: function () {
      // Cound the occurance of water at rest
      let counter = 0
      for (let y = this.clayyRange[0]; y <= this.clayyRange[1]; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          if (this.grid[y][x] === REST) {
            counter++
          }
        }
      }
      this.solutions.partTwo = counter
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
