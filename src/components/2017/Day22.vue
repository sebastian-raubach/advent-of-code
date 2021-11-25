<template>
  <Day :day="22" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="800" height="500" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="800" height="500" />
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
      turn: {
        up: (curr, cell) => {
          // Turn according to instructions
          if (cell === '#') {
            curr.dir = 'right'
          } else if (cell === '.') {
            curr.dir = 'left'
          } else if (cell === 'F') {
            curr.dir = 'down'
          }
        },
        right: (curr, cell) => {
          // Turn according to instructions
          if (cell === '#') {
            curr.dir = 'down'
          } else if (cell === '.') {
            curr.dir = 'up'
          } else if (cell === 'F') {
            curr.dir = 'left'
          }
        },
        down: (curr, cell) => {
          // Turn according to instruction
          if (cell === '#') {
            curr.dir = 'left'
          } else if (cell === '.') {
            curr.dir = 'right'
          } else if (cell === 'F') {
            curr.dir = 'up'
          }
        },
        left: (curr, cell) => {
          // Turn according to instructions
          if (cell === '#') {
            curr.dir = 'up'
          } else if (cell === '.') {
            curr.dir = 'down'
          } else if (cell === 'F') {
            curr.dir = 'right'
          }
        }
      },
      move: {
        up: (curr) => curr.y--,
        left: (curr) => curr.x--,
        down: (curr) => curr.y++,
        right: (curr) => curr.x++
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.solutions = {
        partOne: 0,
        partTwo: 0
      }

      this.$nextTick(() => {
        // Generate two copies of the original grid
        const gridOne = new Map()
        const gridTwo = new Map()
        input.forEach((r, y) => {
          r.split('').forEach((c, x) => {
            if (c === '#') {
              gridOne.set(`${x},${y}`, '#')
              gridTwo.set(`${x},${y}`, '#')
            }
          })
        })

        this.solutions.partOne = this.solvePartOne(gridOne, input.length)
        this.solutions.partTwo = this.solvePartTwo(gridTwo, input.length)
      })
    },
    solvePartOne: function (grid, size) {
      // Starting position
      const current = {
        x: Math.floor(size / 2),
        y: Math.floor(size / 2),
        dir: 'up'
      }

      const bb = {
        minX: current.x,
        minY: current.y,
        maxX: current.x,
        maxY: current.y
      }

      let counter = 0
      // Bursts
      for (let i = 0; i < 10_000; i++) {
        // Get current position coordinates
        const pos = `${current.x},${current.y}`
        // Get grid cell
        const cell = grid.get(pos) || '.'

        // Turn according to rules
        this.turn[current.dir](current, cell)
        // Adjust current cell
        if (cell === '.') {
          // Count infections
          counter++
          grid.set(pos, '#')
        } else {
          grid.delete(pos)
        }
        // Then move
        this.move[current.dir](current)

        bb.minX = Math.min(bb.minX, current.x)
        bb.minY = Math.min(bb.minY, current.y)
        bb.maxX = Math.max(bb.maxX, current.x)
        bb.maxY = Math.max(bb.maxY, current.y)
      }

      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const ctx = canvas.getContext('2d')
      // Set the canvas size and translate the origin
      const factor = 2
      canvas.width = (Math.abs(bb.minX) + Math.abs(bb.maxX)) * factor
      canvas.height = (Math.abs(bb.minY) + Math.abs(bb.maxY)) * factor
      ctx.scale(factor, factor)
      ctx.translate(Math.abs(bb.minX), Math.abs(bb.minY))

      // Draw the canvas
      grid.forEach((cell, coords) => {
        const xy = coords.split(',').map(i => +i)
        ctx.fillStyle = '#EA2027'
        ctx.fillRect(xy[0], xy[1], 1, 1)
      })

      return counter
    },
    solvePartTwo: function (grid, size) {
      // Starting position
      const current = {
        x: Math.floor(size / 2),
        y: Math.floor(size / 2),
        dir: 'up'
      }

      const bb = {
        minX: current.x,
        minY: current.y,
        maxX: current.x,
        maxY: current.y
      }

      let counter = 0
      // Bursts
      for (let i = 0; i < 10_000_000; i++) {
        // Get current position coordinates
        const pos = `${current.x},${current.y}`
        // Get grid cell
        const cell = grid.get(pos) || '.'

        // Turn according to rules
        this.turn[current.dir](current, cell)
        if (cell === '.') {
          grid.set(pos, 'W')
        } else if (cell === 'W') {
          // Count infections
          counter++
          grid.set(pos, '#')
        } else if (cell === '#') {
          grid.set(pos, 'F')
        } else {
          grid.delete(pos)
        }
        // Then move
        this.move[current.dir](current)

        bb.minX = Math.min(bb.minX, current.x)
        bb.minY = Math.min(bb.minY, current.y)
        bb.maxX = Math.max(bb.maxX, current.x)
        bb.maxY = Math.max(bb.maxY, current.y)
      }

      // Initialise the canvas
      const canvas = document.getElementById('partTwo')
      const ctx = canvas.getContext('2d')
      // Set the canvas size and translate the origin
      const factor = 2
      canvas.width = (Math.abs(bb.minX) + Math.abs(bb.maxX)) * factor
      canvas.height = (Math.abs(bb.minY) + Math.abs(bb.maxY)) * factor
      ctx.scale(factor, factor)
      ctx.translate(Math.abs(bb.minX), Math.abs(bb.minY))

      // Draw the canvas
      grid.forEach((cell, coords) => {
        const xy = coords.split(',').map(i => +i)
        if (cell === '#') {
          ctx.fillStyle = '#EA2027'
        } else if (cell === 'F') {
          ctx.fillStyle = '#1289A7'
        } else if (cell === 'W') {
          ctx.fillStyle = '#F79F1F'
        }

        ctx.fillRect(xy[0], xy[1], 1, 1)
      })

      return counter
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
