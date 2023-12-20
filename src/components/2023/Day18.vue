<template>
  <Day :day="18" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="1000" height="1000" />
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
      dirs: {
        U: (current, amount = 1) => { current.y -= amount },
        D: (current, amount = 1) => { current.y += amount },
        L: (current, amount = 1) => { current.x -= amount },
        R: (current, amount = 1) => { current.x += amount }
      },
      p2Dirs: ['R', 'D', 'L', 'U']
    }
  },
  methods: {
    onInputChanged: function (input) {
      const pattern = /(?<dir>[LRUD]{1})\s(?<steps>\d+)\s\((?<color>#[0-9a-f]{6})\)/
      const instructions = input.map(i => {
        const res = i.match(pattern).groups

        const hex = res.color.replace('#', '')

        return {
          p1: {
            dir: res.dir,
            steps: +res.steps,
            color: res.color
          },
          p2: {
            dir: this.p2Dirs[+hex.charAt(5)],
            steps: parseInt(hex.substring(0, 5), 16),
            color: '#00acef'
          }
        }
      })

      console.log(instructions)

      const p1 = this.solve(instructions.map(i => i.p1))
      this.solutions.partOne = Object.keys(p1.newGrid).length
      this.solutions.partTwo = this.solvePart2(instructions.map(i => i.p2))

      this.$nextTick(() => this.plot(p1.grid, p1.dims, p1.newGrid))
    },
    solvePart2: function (instructions) {
      // First we count the border area
      let current = { x: 0, y: 0 }
      let borderCount = 1

      instructions.forEach(i => {
        for (let a = 0; a < i.steps; a++) {
          this.dirs[i.dir](current)

          borderCount++
        }
      })

      const vertices = []

      current = { x: 0, y: 0 }

      instructions.forEach(i => {
        this.dirs[i.dir](current, i.steps)
        vertices.push({ x: current.x, y: current.y })
      })

      // Then we use this polygon area calculation algorithm to find the area inside
      // https://web.archive.org/web/20100405070507/http://valis.cs.uiuc.edu/~sariel/research/CG/compgeom/msg00831.html
      let area = 0
      for (let i = 0; i < vertices.length; i++) {
        const j = (i + 1) % vertices.length
        area += vertices[i].x * vertices[j].y
        area -= vertices[i].y * vertices[j].x
      }

      // we actually calculated the area and the border twice
      return Math.abs(area / 2) + Math.ceil(borderCount / 2)
    },
    solve: function (instructions) {
      const current = { x: 0, y: 0 }
      const grid = {}
      grid[`${current.x}|${current.y}`] = instructions[0].color

      const dims = {
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0
      }

      instructions.forEach(i => {
        for (let a = 0; a < i.steps; a++) {
          this.dirs[i.dir](current)

          grid[`${current.x}|${current.y}`] = i.color

          // Update dimensions
          dims.xMin = Math.min(dims.xMin, current.x)
          dims.xMax = Math.max(dims.xMax, current.x)
          dims.yMin = Math.min(dims.yMin, current.y)
          dims.yMax = Math.max(dims.yMax, current.y)
        }
      })

      const newGrid = JSON.parse(JSON.stringify(grid))
      // This is a bit of a hack. We don't actually know if 1,1 is inside the area, but it works fine on the example and my input.
      this.floodFill({ x: 1, y: 1 }, dims, newGrid)

      return {
        grid,
        newGrid,
        dims
      }
    },
    floodFill: function (curr, dims, newGrid) {
      // Map the grid to hashes instead of the color hexes
      Object.keys(newGrid).forEach(k => { newGrid[k] = '#' })

      // Maintain a queue
      const queue = [curr]

      while (queue.length > 0) {
        // Get first one
        const curr = queue.shift()

        // Check if it's valid
        if (curr.x >= dims.xMin && curr.x <= dims.xMax && curr.y >= dims.yMin && curr.y <= dims.yMax && !newGrid[`${curr.x}|${curr.y}`]) {
          // Mark as filled
          newGrid[`${curr.x}|${curr.y}`] = '#'

          // Continue for all directions
          Object.keys(this.dirs).forEach(d => {
            const next = { x: curr.x, y: curr.y }
            this.dirs[d](next)
            queue.push(next)
          })
        }
      }
    },
    plot: function (grid, dims, filled) {
      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const factor = 6

      // Update dimensions based on grid sizes
      const width = dims.xMax - dims.xMin + 1
      const height = dims.yMax - dims.yMin + 1
      canvas.width = width * factor
      canvas.height = height * factor

      const ctx = canvas.getContext('2d')

      this.$nextTick(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Offset for better drawing accuracy
        ctx.translate(0.5, 0.5)
        ctx.lineWidth = 1

        ctx.fillStyle = '#2c3e50'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (let y = 0; y <= height; y++) {
          for (let x = 0; x <= width; x++) {
            const xx = dims.xMin + x
            const yy = dims.yMin + y
            if (filled[`${xx}|${yy}`]) {
              const color = grid[`${xx}|${yy}`] || '#34495e'
              ctx.fillStyle = color
              ctx.fillRect(x * factor, y * factor, factor, factor)
            }
          }
        }

        ctx.translate(-0.5, -0.5)
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
