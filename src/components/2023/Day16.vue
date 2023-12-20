<template>
  <Day :day="16" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      directions: {
        '.': (curr) => {
          return [{
            pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
            delta: curr.delta
          }]
        },
        '/': (curr) => {
          const delta = { x: -curr.delta.y, y: -curr.delta.x }

          return [{
            pos: { x: curr.pos.x + delta.x, y: curr.pos.y + delta.y },
            delta: delta
          }]
        },
        '\\': (curr) => {
          const delta = { x: curr.delta.y, y: curr.delta.x }

          return [{
            pos: { x: curr.pos.x + delta.x, y: curr.pos.y + delta.y },
            delta: delta
          }]
        },
        '-': (curr) => {
          if (curr.delta.x !== 0) {
            return [{
              pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
              delta: curr.delta
            }]
          } else {
            return [{
              pos: { x: curr.pos.x - 1, y: curr.pos.y },
              delta: { x: -1, y: 0 }
            }, {
              pos: { x: curr.pos.x + 1, y: curr.pos.y },
              delta: { x: 1, y: 0 }
            }]
          }
        },
        '|': (curr) => {
          if (curr.delta.y !== 0) {
            return [{
              pos: { x: curr.pos.x + curr.delta.x, y: curr.pos.y + curr.delta.y },
              delta: curr.delta
            }]
          } else {
            return [{
              pos: { x: curr.pos.x, y: curr.pos.y - 1 },
              delta: { x: 0, y: -1 }
            }, {
              pos: { x: curr.pos.x, y: curr.pos.y + 1 },
              delta: { x: 0, y: 1 }
            }]
          }
        }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const map = {}
      this.height = input.length
      this.width = null

      input.forEach((i, y) => {
        const parts = i.split('')

        if (!this.width) {
          this.width = parts.length
        }

        parts.forEach((c, x) => {
          map[`${x}|${y}`] = c
        })
      })

      this.grid = map

      this.solutions.partOne = this.solve({ x: 0, y: 0 }, { x: 1, y: 0 }, true)

      let max = 0

      for (let x = 1; x < this.width - 1; x++) {
        // Top row down
        max = Math.max(max, this.solve({ x: x, y: 0 }, { x: 0, y: 1 }))
        // Bottom row up
        max = Math.max(max, this.solve({ x: x, y: this.height - 1 }, { x: 0, y: -1 }))
      }
      for (let y = 1; y < this.height - 1; y++) {
        // Left column right
        max = Math.max(max, this.solve({ x: 0, y: y }, { x: 1, y: 0 }))
        // Right column left
        max = Math.max(max, this.solve({ x: 0, y: this.width - 1 }, { x: -1, y: 0 }))
      }

      // Top left corner
      max = Math.max(max, this.solve({ x: 0, y: 0 }, { x: 0, y: 1 }))
      max = Math.max(max, this.solve({ x: 0, y: 0 }, { x: 1, y: 0 }))

      // Top right corner
      max = Math.max(max, this.solve({ x: this.width - 1, y: 0 }, { x: 0, y: 1 }))
      max = Math.max(max, this.solve({ x: this.width - 1, y: 0 }, { x: -1, y: 0 }))

      // Bottom left corner
      max = Math.max(max, this.solve({ x: 0, y: this.height - 1 }, { x: 0, y: -1 }))
      max = Math.max(max, this.solve({ x: 0, y: this.height - 1 }, { x: 1, y: 0 }))

      // Bottom right corner
      max = Math.max(max, this.solve({ x: this.width - 1, y: this.height - 1 }, { x: 0, y: -1 }))
      max = Math.max(max, this.solve({ x: this.width - 1, y: this.height - 1 }, { x: -1, y: 0 }))

      this.solutions.partTwo = max

      this.$nextTick(() => this.draw())
    },
    solve: function (start, delta, recordPath = false) {
      let queue = [{
        pos: start,
        delta: delta
      }]
      const visited = new Set()
      const energized = new Set()
      const path = []

      while (queue.length > 0) {
        if (recordPath) {
          path.push(queue.concat())
        }
        const nextSteps = []

        queue.forEach(q => {
          const cell = this.grid[`${q.pos.x}|${q.pos.y}`]

          visited.add(`${q.pos.x}|${q.pos.y}|${q.delta.x}|${q.delta.y}`)
          energized.add(`${q.pos.x}|${q.pos.y}`)

          const next = this.directions[cell](q).filter(n => n.pos.x >= 0 && n.pos.x < this.width && n.pos.y >= 0 && n.pos.y < this.height && !visited.has(`${n.pos.x}|${n.pos.y}|${n.delta.x}|${n.delta.y}`))

          nextSteps.push(...next)
        })

        queue = nextSteps
      }

      if (recordPath) {
        this.path = path
        console.log(path)
      }

      return energized.size
    },
    draw: function () {
      this.gradient = createMultiColorGradient(VIRIDIS, Math.ceil(this.path.length / 2))

      // Initialise the canvas
      this.canvas = document.getElementById('partOne')
      this.ctx = this.canvas.getContext('2d')

      // Set the canvas size
      this.factor = 9
      this.canvas.width = this.width * this.factor
      this.canvas.height = this.height * this.factor
      this.ctx.fillStyle = '#222222'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.lineWidth = this.factor / 4

      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          const pipe = this.grid[`${col}|${row}`]

          this.ctx.strokeStyle = '#34495e'
          this.ctx.fillStyle = '#34495e'
          this.drawPipe(col, row, pipe)
        }
      }

      this.pathIndex = 0
      window.requestAnimationFrame(() => this.drawPath())
    },
    drawPath: function () {
      const cells = this.path[this.pathIndex]

      const color = this.gradient[this.pathIndex]
      this.ctx.strokeStyle = color
      this.ctx.fillStyle = color

      cells.forEach(c => {
        let pipe = this.grid[`${c.pos.x}|${c.pos.y}`]

        if (pipe === '.') {
          if (c.delta.x !== 0) {
            pipe = '-'
          } else {
            pipe = '|'
          }
        }
        if (pipe === '-') {
          if (c.delta.y > 0) {
            pipe = '┴'
          } else if (c.delta.y < 0) {
            pipe = 'T'
          }
        }
        if (pipe === '|') {
          if (c.delta.x > 0) {
            pipe = '┤'
          } else if (c.delta.x < 0) {
            pipe = '├'
          }
        }
        if (pipe === '/') {
          if (c.delta.x > 0 || c.delta.y > 0) {
            pipe = 'J'
          } else {
            pipe = 'F'
          }
        }
        if (pipe === '\\') {
          if (c.delta.x > 0 || c.delta.y < 0) {
            pipe = '7'
          } else {
            pipe = 'L'
          }
        }

        this.drawPipe(c.pos.x, c.pos.y, pipe)
      })

      if (this.pathIndex < this.path.length - 1) {
        this.pathIndex++
        window.requestAnimationFrame(() => this.drawPath())
      }
    },
    drawPipe: function (x, y, pipe) {
      switch (pipe) {
        case '├':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor + this.factor / 2, y * this.factor)
          this.ctx.lineTo(x * this.factor + this.factor / 2, (y + 1) * this.factor)
          this.ctx.moveTo(x * this.factor + this.factor / 2, (y + 0.5) * this.factor)
          this.ctx.lineTo((x + 1) * this.factor, (y + 0.5) * this.factor)
          this.ctx.stroke()
          break
        case '┤':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor + this.factor / 2, y * this.factor)
          this.ctx.lineTo(x * this.factor + this.factor / 2, (y + 1) * this.factor)
          this.ctx.moveTo(x * this.factor + this.factor / 2, (y + 0.5) * this.factor)
          this.ctx.lineTo(x * this.factor, (y + 0.5) * this.factor)
          this.ctx.stroke()
          break
        case 'T':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor, y * this.factor + this.factor / 2)
          this.ctx.lineTo((x + 1) * this.factor, y * this.factor + this.factor / 2)
          this.ctx.moveTo((x + 0.5) * this.factor, y * this.factor + this.factor / 2)
          this.ctx.lineTo((x + 0.5) * this.factor, (y + 1) * this.factor)
          this.ctx.stroke()
          break
        case '┴':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor, y * this.factor + this.factor / 2)
          this.ctx.lineTo((x + 1) * this.factor, y * this.factor + this.factor / 2)
          this.ctx.moveTo((x + 0.5) * this.factor, y * this.factor + this.factor / 2)
          this.ctx.lineTo((x + 0.5) * this.factor, y * this.factor)
          this.ctx.stroke()
          break
        case 'F':
          this.ctx.beginPath()
          this.ctx.arc((x + 1) * this.factor, (y + 1) * this.factor, this.factor / 2, Math.PI, 1.5 * Math.PI)
          this.ctx.stroke()
          break
        case 'J':
          this.ctx.beginPath()
          this.ctx.arc(x * this.factor, y * this.factor, this.factor / 2, 0, 0.5 * Math.PI)
          this.ctx.stroke()
          break
        case '7':
          this.ctx.beginPath()
          this.ctx.arc(x * this.factor, (y + 1) * this.factor, this.factor / 2, 1.5 * Math.PI, 0)
          this.ctx.stroke()
          break
        case 'L':
          this.ctx.beginPath()
          this.ctx.arc((x + 1) * this.factor, y * this.factor, this.factor / 2, 0.5 * Math.PI, Math.PI)
          this.ctx.stroke()
          break
        case '/':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor + this.factor / 8, (y + 1) * this.factor - this.factor / 8)
          this.ctx.lineTo((x + 1) * this.factor - this.factor / 8, y * this.factor + this.factor / 8)
          this.ctx.stroke()
          break
        case '\\':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor + this.factor / 8, y * this.factor + this.factor / 8)
          this.ctx.lineTo((x + 1) * this.factor - this.factor / 8, (y + 1) * this.factor - this.factor / 8)
          this.ctx.stroke()
          break
        case '|':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor + this.factor / 2, y * this.factor)
          this.ctx.lineTo(x * this.factor + this.factor / 2, (y + 1) * this.factor)
          this.ctx.stroke()
          break
        case '-':
          this.ctx.beginPath()
          this.ctx.moveTo(x * this.factor, y * this.factor + this.factor / 2)
          this.ctx.lineTo((x + 1) * this.factor, y * this.factor + this.factor / 2)
          this.ctx.stroke()
          break
        case '.':
          // this.ctx.beginPath()
          // this.ctx.arc(x * this.factor + this.factor / 2, y * this.factor + this.factor / 2, this.factor / 4, 0, 2 * Math.PI)
          // this.ctx.fill()
          break
      }
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
