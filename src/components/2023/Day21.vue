<template>
  <Day :day="21" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="1000" height="1000" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createMultiColorGradient, VIRIDIS } from '@/util/color'
import { mod } from '@/util/math'

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
      directions: [[-1, 0], [1, 0], [0, -1], [0, 1]]
    }
  },
  methods: {
    onInputChanged: function (input) {
      let start = { x: 0, y: 0 }

      const grid = {}

      this.height = input.length

      input.forEach((i, y) => {
        const cells = i.split('')
        const sIndex = i.indexOf('S')

        if (sIndex !== -1) {
          start = { x: sIndex, y: y }
        }

        if (!this.width) {
          this.width = cells.length
        }

        cells.forEach((c, x) => {
          if (c === 'S') {
            start.x = x
            start.y = y
          }

          grid[`${x}|${y}`] = c
        })
      })

      this.minX = Number.MAX_SAFE_INTEGER
      this.maxX = -Number.MAX_SAFE_INTEGER
      this.minY = Number.MAX_SAFE_INTEGER
      this.maxY = -Number.MAX_SAFE_INTEGER

      const centeredGrid = {}
      Object.keys(grid).forEach(k => {
        let [x, y] = k.split('|').map(Number)
        x -= start.x
        y -= start.y

        this.minX = Math.min(this.minX, x)
        this.maxX = Math.max(this.maxX, x)
        this.minY = Math.min(this.minY, y)
        this.maxY = Math.max(this.maxY, y)

        centeredGrid[`${x}|${y}`] = grid[k]
      })
      start = { x: 0, y: 0 }

      this.grid = centeredGrid

      const shortestPaths = this.solvePartOne(64)

      this.solutions.partOne = Object.values(shortestPaths).filter(v => v % 2 === 0).length - 1
      this.$nextTick(() => this.draw(start, shortestPaths))

      // this.solutions.partTwo = this.solvePartTwo()
    },
    solvePartTwo: function () {
      const maxDist = 26501365
      // Calculate area
      let total = 0
      const delta = maxDist * 2 + 1
      for (let i = 0; i <= maxDist; i++) {
        // Ceiling and halfing gives us all odd distance spaces (this wouldn't work if dist was even)
        total += Math.ceil((delta - (i * 2)) / 2)
      }
      // Double area
      total *= 2
      // Remove the widest line once, because it has been counted twice
      total -= Math.ceil(delta / 2)
      console.log(maxDist, total)

      // For each original obstacle, remove each multiple in both dimensions up to boundary
      const obstacles = []

      Object.keys(this.grid).forEach(k => {
        const [x, y] = k.split('|').map(Number)

        if (this.grid[k] === '#') {
          obstacles.push({ x: x, y: y })
        }
      })

      console.log(obstacles.length)

      let c = 0
      for (let x = -maxDist; x <= maxDist; x++) {
        for (let y = -maxDist; y <= maxDist; y++) {
          const dist = Math.abs(x) + Math.abs(y)

          if (dist <= maxDist && dist % 2 === 0) {
            const isMultiple = obstacles.some(o => {
              return mod(x, o.x) === 0 && mod(y, o.y) === 0
            })

            if (isMultiple) {
              c++
            }
          }
        }
      }

      console.log('multiple count', c)

      // const toRemove = new Set()

      // obstacles.forEach(o => {
      //   const mx = Math.floor(maxDist / o.x)
      //   const my = Math.floor(maxDist / o.y)

      //   for (let x = 0; x <= mx; x++) {
      //     for (let y = 0; y <= my; y++) {
      //       const nx = o.x + o.x * x
      //       const ny = o.y + o.y * y

      //       const dist = Math.abs(nx) + Math.abs(ny)

      //       if (dist < maxDist && dist % 2 === 0) {
      //         // It's within range and it's got an even distance (otherwise it'd overlap with an area we already removed)
      //         toRemove.add(`${nx}|${ny}`)
      //       }
      //     }
      //   }
      // })

      // console.log(toRemove.size)
    },
    solvePartOne: function (maxDistance) {
      const distances = {}

      for (let x = this.minX; x <= this.maxX; x++) {
        for (let y = this.minY; y <= this.maxY; y++) {
          if (['.', 'S'].includes(this.grid[`${x}|${y}`])) {
            const dist = Math.abs(x) + Math.abs(y)

            if (dist <= maxDistance) {
              distances[`${x}|${y}`] = dist
            }
          }
        }
      }

      return distances
    },
    draw: function (start, shortestPaths) {
      this.gradient = createMultiColorGradient(VIRIDIS, 65)
      this.pathDistance = 0

      // Initialise the canvas
      this.canvas = document.getElementById('partOne')
      this.ctx = this.canvas.getContext('2d')

      // Set the canvas size
      this.factor = 8
      this.canvas.width = this.width * this.factor
      this.canvas.height = this.height * this.factor

      this.ctx.translate(0.5, 0.5)
      this.ctx.lineWidth = 1

      this.ctx.fillStyle = '#222222'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      const dx = Math.abs(this.minX)
      const dy = Math.abs(this.minY)

      for (let y = this.minY; y <= this.maxY; y++) {
        for (let x = this.minX; x <= this.maxX; x++) {
          const cell = this.grid[`${x}|${y}`]

          this.ctx.strokeStyle = '#34495e'
          this.ctx.fillStyle = '#34495e'

          if (cell === '#') {
            this.ctx.fillRect((dx + x) * this.factor, (dy + y) * this.factor, this.factor, this.factor)
          }
        }
      }

      window.requestAnimationFrame(() => this.drawPath(shortestPaths, dx, dy))
    },
    drawPath: function (shortestPaths, dx, dy) {
      const cells = Object.keys(shortestPaths).filter(k => shortestPaths[k] === this.pathDistance).map(k => k.split('|').map(Number))

      if (cells.length < 1) {
        this.ctx.translate(-0.5, -0.5)
        return
      }

      cells.forEach(c => {
        this.ctx.fillStyle = this.gradient[this.pathDistance]
        this.ctx.fillRect((dx + c[0]) * this.factor, (dy + c[1]) * this.factor, this.factor, this.factor)

        if (this.pathDistance % 2 === 0) {
          this.ctx.fillStyle = '#222222'
          this.ctx.beginPath()
          this.ctx.arc((dx + c[0]) * this.factor + this.factor / 2, (dy + c[1]) * this.factor + this.factor / 2, this.factor / 4, 0, 2 * Math.PI)
          this.ctx.fill()
        }
      })

      this.pathDistance++
      window.requestAnimationFrame(() => this.drawPath(shortestPaths, dx, dy))
    }
  }
}
</script>

<style>
</style>
