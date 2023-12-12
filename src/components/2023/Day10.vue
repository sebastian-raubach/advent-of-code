<template>
  <Day :day="10" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      pathIndex: 0,
      pipes: {
        L: {
          connects: (from, pipe) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.y === pipe.y && from.x === (pipe.x + 1))
        },
        J: {
          connects: (from, pipe) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.y === pipe.y && from.x === (pipe.x - 1))
        },
        7: {
          connects: (from, pipe) => (from.x === pipe.x && from.y === (pipe.y + 1)) || (from.y === pipe.y && from.x === (pipe.x - 1))
        },
        F: {
          connects: (from, pipe) => (from.x === pipe.x && from.y === (pipe.y + 1)) || (from.y === pipe.y && from.x === (pipe.x + 1))
        },
        '|': {
          connects: (from, pipe) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.x === pipe.x && from.y === (pipe.y + 1))
        },
        '-': {
          connects: (from, pipe) => (from.y === pipe.y && from.x === (pipe.x - 1)) || (from.y === pipe.y && from.x === (pipe.x + 1))
        },
        S: {
          connects: (from, pipe) => true
        }
      },
      dirs: [[-1, 0], [1, 0], [0, -1], [0, 1]]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.grid = input.map(i => i.split(''))

      let start = { x: 0, y: 0 }

      input.forEach((r, ri) => {
        const sIndex = r.indexOf('S')

        if (sIndex !== -1) {
          start = { x: sIndex, y: ri }
        }
      })

      const circuit = []
      const visited = new Set()
      let current = start

      while (true) {
        circuit.push(current)
        visited.add(`${current.x},${current.y}`)

        const currPipe = this.grid[current.y][current.x]
        const neighbors = this.getNeighbors(current)

        const matches = neighbors.filter(n => {
          const pipe = this.grid[n.y][n.x]

          if (visited.has(`${n.x},${n.y}`)) {
            return false
          } else if (n.x === start.x && n.y === start.y) {
          // } else if (pipe === 'S') {
            return true
          } else if (pipe === '.') {
            return false
          } else {
            return this.pipes[pipe].connects(current, n) && this.pipes[currPipe].connects(n, current)
          }
        })

        if (matches.length > 0) {
          current = matches[0]
        } else {
          break
        }
      }

      this.fixStart(circuit)

      this.solutions.partOne = Math.floor(circuit.length / 2)
      const enclosed = this.findEnclosed(circuit)
      this.solutions.partTwo = enclosed.length

      this.$nextTick(() => this.draw(start, circuit, enclosed))
    },
    fixStart: function (circuit) {
      const start = circuit[0]
      const next = circuit[1]
      const prev = circuit[circuit.length - 1]

      if (prev.x === start.x && start.x === next.x) {
        this.grid[start.y][start.x] = '|'
      } else if (prev.y === start.y && start.y === next.y) {
        this.grid[start.y][start.x] = '-'
      } else if (((prev.x === start.x + 1) && (next.y === start.y + 1)) || ((next.x === start.x + 1) && (prev.y === start.y + 1))) {
        this.grid[start.y][start.x] = 'F'
      } else if (((prev.x === start.x - 1) && (next.y === start.y + 1)) || ((next.x === start.x - 1) && (prev.y === start.y + 1))) {
        this.grid[start.y][start.x] = '7'
      } else if (((prev.x === start.x + 1) && (next.y === start.y - 1)) || ((next.x === start.x + 1) && (prev.y === start.y - 1))) {
        this.grid[start.y][start.x] = 'L'
      } else if (((prev.x === start.x - 1) && (next.y === start.y - 1)) || ((next.x === start.x - 1) && (prev.y === start.y - 1))) {
        this.grid[start.y][start.x] = 'J'
      }
    },
    findEnclosed: function (circuit) {
      const mapped = new Map()
      circuit.forEach((p, i) => {
        mapped.set(`${p.x}|${p.y}`, i)
      })
      const result = []
      for (let row = 0; row < this.grid.length; row++) {
        for (let col = 0; col < this.grid[row].length; col++) {
          if (!mapped.has(`${col}|${row}`)) {
            let enclosed = false
            let x = col

            while (x >= 0) {
              const index = mapped.get(`${x}|${row}`)
              const pipe = this.grid[row][x]
              if (index !== undefined && (pipe === '|' || pipe === 'F' || pipe === '7')) {
                enclosed = !enclosed
              }

              x--
            }

            if (enclosed) {
              result.push({ x: col, y: row })
            }
          }
        }
      }
      return result
    },
    draw: function (start, path, enclosed) {
      this.pathIndex = 0
      this.enclosedIndex = 0
      this.gradient = createMultiColorGradient(VIRIDIS, Math.ceil(path.length / 2))

      // Initialise the canvas
      this.canvas = document.getElementById('partOne')
      this.ctx = this.canvas.getContext('2d')

      // Set the canvas size
      this.factor = 7
      this.canvas.width = this.grid[0].length * this.factor
      this.canvas.height = this.grid.length * this.factor
      this.ctx.fillStyle = '#222222'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.lineWidth = this.factor / 4

      for (let row = 0; row < this.grid.length; row++) {
        for (let col = 0; col < this.grid[row].length; col++) {
          let pipe = this.grid[row][col]

          if (row === start.y && col === start.x) {
            pipe = 'S'
          }

          this.ctx.strokeStyle = '#34495e'
          this.ctx.fillStyle = '#34495e'
          this.drawPipe(col, row, pipe)
        }
      }

      window.requestAnimationFrame(() => this.drawPath(path, enclosed))
    },
    drawPath: function (path, enclosed) {
      const i = this.pathIndex
      const s = path[i]
      const sp = this.grid[s.y][s.x]
      const e = path[path.length - i - 1]
      const ep = this.grid[e.y][e.x]

      if ((s.x === e.x && s.y) === e.y || i === Math.floor(path.length / 2)) {
        this.ctx.fillStyle = '#e74c3c'
        this.ctx.strokeStyle = '#e74c3c'
      } else {
        const color = this.gradient[i]
        this.ctx.strokeStyle = color
        this.ctx.fillStyle = color
      }

      this.drawPipe(s.x, s.y, sp)
      this.drawPipe(e.x, e.y, ep)

      if (i < path.length / 2) {
        this.pathIndex++
        window.requestAnimationFrame(() => this.drawPath(path, enclosed))
      } else {
        const sorted = enclosed.concat().sort((a, b) => Math.sign((a.x + a.y) - (b.x + b.y)))
        window.requestAnimationFrame(() => this.drawEnclosed(sorted))
      }
    },
    drawEnclosed: function (enclosed) {
      this.ctx.strokeStyle = '#25CCF7'
      this.ctx.fillStyle = '#25CCF7'

      const e = enclosed[this.enclosedIndex]

      this.drawPipe(e.x, e.y, this.grid[e.y][e.x])

      if (this.enclosedIndex < enclosed.length - 1) {
        this.enclosedIndex++
        window.requestAnimationFrame(() => this.drawEnclosed(enclosed))
      }
    },
    drawPipe: function (x, y, pipe) {
      switch (pipe) {
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
          this.ctx.beginPath()
          this.ctx.arc(x * this.factor + this.factor / 2, y * this.factor + this.factor / 2, this.factor / 4, 0, 2 * Math.PI)
          this.ctx.fill()
          break
        case 'S':
          this.ctx.fillStyle = '#e74c3c'
          this.ctx.fillRect(x * this.factor, y * this.factor, this.factor, this.factor)
          break
      }
    },
    getNeighbors: function (current) {
      return this.dirs.map(d => { return { x: current.x + d[0], y: current.y + d[1] } }).filter(d => d.x >= 0 && d.x < this.grid[0].length && d.y >= 0 && d.y < this.grid.length)
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
