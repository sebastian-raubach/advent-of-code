<template>
  <Day :day="23" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="1000" height="1000" />
      </div>
      <b-button @click="plot">Redraw</b-button>
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
      dirs: [
        { d: [-1, 0], forbidden: '>' },
        { d: [1, 0], forbidden: '<' },
        { d: [0, -1], forbidden: 'v' },
        { d: [0, 1], forbidden: '^' }
      ]
    }
  },
  methods: {
    onInputChanged: function (input) {
      const grid = {}
      const start = { x: 0, y: 0 }
      const end = { x: 0, y: input.length - 1 }
      this.height = input.length
      this.width = input[0].length
      input.forEach((i, y) => {
        const parts = i.split('')
        if (y === 0) {
          start.x = parts.indexOf('.')
        } else if (y === input.length - 1) {
          end.x = parts.indexOf('.')
        }
        parts.forEach((c, x) => {
          grid[`${x}|${y}`] = c
        })
      })

      this.grid = grid
      const paths = this.bfs(grid, start, end)
      this.path = paths[paths.length - 1]
      this.solutions.partOne = this.path.length - 1

      const crossings = this.convertToGraph(grid)
      crossings[`${start.x}|${start.y}`] = Object.assign(start, { key: `${start.x}|${start.y}` })
      crossings[`${end.x}|${end.y}`] = Object.assign(end, { key: `${end.x}|${end.y}` })

      const nodes = Object.values(crossings)

      this.graph = {}
      Object.keys(crossings).forEach(c => {
        this.graph[c] = { cost: null, key: c, neighbors: [] }
      })
      for (let s = 0; s < nodes.length - 1; s++) {
        for (let e = s + 1; e < nodes.length; e++) {
          const p = this.bfs(grid, nodes[s], nodes[e], true)
          if (p.length > 0) {
            this.graph[nodes[s].key].neighbors.push({ key: nodes[e].key, cost: p[0].length - 1 })
            this.graph[nodes[e].key].neighbors.push({ key: nodes[s].key, cost: p[0].length - 1 })
          }
        }
      }

      this.solutions.partTwo = this.getLongestGraph(`${start.x}|${start.y}`, `${end.x}|${end.y}`, new Set())

      this.$nextTick(() => this.plot())
    },
    plot: function () {
      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const factor = 7
      this.pathIndex = 0

      // Update dimensions based on grid sizes
      canvas.width = this.width * factor
      canvas.height = this.height * factor

      const ctx = canvas.getContext('2d')

      this.$nextTick(() => {
        // Offset for better drawing accuracy
        ctx.translate(0.5, 0.5)
        ctx.lineWidth = factor / 2

        ctx.fillStyle = '#57606f'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Create gradient
        const gridGradient = createMultiColorGradient(VIRIDIS, this.path.length + 1)
        const graphGradient = createMultiColorGradient(VIRIDIS, Math.max(...Object.values(this.graph).map(n => Math.max(...n.neighbors.map(nn => nn.cost)))) + 1)
        ctx.fillStyle = '#2f3542'

        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            // Fill cells according to elevation

            const cell = this.grid[`${x}|${y}`]

            if (cell === '#') {
              ctx.fillRect(x * factor, y * factor, factor, factor)
            }
          }
        }

        window.requestAnimationFrame(() => this.plotPath(ctx, factor, gridGradient, graphGradient))
      })
    },
    plotGraph: function (ctx, factor, graphGradient) {
      Object.values(this.graph).forEach(n => {
        const [x, y] = n.key.split('|').map(Number)

        this.graph[n.key].neighbors.forEach(nn => {
          const [nx, ny] = nn.key.split('|').map(Number)
          ctx.strokeStyle = graphGradient[nn.cost]
          ctx.beginPath()
          ctx.moveTo((x + 0.5) * factor, (y + 0.5) * factor)
          ctx.lineTo((nx + 0.5) * factor, (ny + 0.5) * factor)
          ctx.stroke()
        })
      })

      Object.values(this.graph).forEach(n => {
        const [x, y] = n.key.split('|').map(Number)

        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc((x + 0.5) * factor, (y + 0.5) * factor, factor / 2, 0, 2 * Math.PI)
        ctx.fill()
      })
    },
    plotPath: function (ctx, factor, gridGradient, graphGradient) {
      const p = this.path[this.pathIndex]
      ctx.fillStyle = gridGradient[this.pathIndex]
      ctx.fillRect(p.x * factor, p.y * factor, factor, factor)

      this.pathIndex++

      if (this.pathIndex === this.path.length) {
        window.requestAnimationFrame(() => this.plotGraph(ctx, factor, graphGradient))
      } else {
        window.requestAnimationFrame(() => this.plotPath(ctx, factor, gridGradient, graphGradient))
      }
    },
    convertToGraph: function (grid) {
      const crossings = {}

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (grid[`${x}|${y}`] === '.') {
            const isCrossing = this.dirs.map(d => grid[`${x + d.d[0]}|${y + d.d[1]}`]).filter(c => ['>', '<', 'v', '^'].includes(c)).length > 1

            if (isCrossing) {
              crossings[`${x}|${y}`] = { x: x, y: y, key: `${x}|${y}` }
            }
          }
        }
      }

      return crossings
    },
    getLongestGraph: function (current, end, visited) {
      if (current === end) {
        return 0
      }

      let maxDistance = Number.MIN_SAFE_INTEGER

      visited.add(current)

      const node = this.graph[current]

      node.neighbors.forEach(n => {
        if (!visited.has(n.key)) {
          maxDistance = Math.max(maxDistance, n.cost + this.getLongestGraph(n.key, end, visited))
        }
      })

      visited.delete(current)

      return maxDistance
    },
    bfs: function (grid, start, end, findShortest = false) {
      const queue = [{ x: start.x, y: start.y, path: [], visited: new Set() }]
      queue[0].visited.add(`${start.x}|${start.y}`)

      const paths = []

      while (queue.length > 0) {
        const current = queue.shift()

        for (const d of this.dirs) {
          const p = { x: current.x + d.d[0], y: current.y + d.d[1] }

          if (p.x === end.x && p.y === end.y) {
            // Found a valid path
            const path = current.path.concat()
            path.push({ x: current.x, y: current.y })
            path.push(end)

            if (findShortest) {
              return [path]
            } else {
              paths.push(path)
            }
          }

          const c = grid[`${p.x}|${p.y}`]

          const alreadyVisited = current.visited.has(`${p.x}|${p.y}`)

          if (p.x >= 0 && p.x < this.width && p.y >= 0 && p.x < this.height && c !== undefined && c !== '#' && !alreadyVisited) {
            if (findShortest) {
              const isCrossing = this.dirs.map(d => grid[`${p.x + d.d[0]}|${p.y + d.d[1]}`]).filter(c => ['>', '<', 'v', '^'].includes(c)).length > 1

              if (isCrossing) {
                continue
              }
            }

            if (!findShortest && c === d.forbidden) {
              continue
            }
            const path = current.path.concat()
            path.push({ x: current.x, y: current.y })
            const v = new Set(current.visited)
            v.add(`${current.x}|${current.y}`)
            queue.push({ x: p.x, y: p.y, path: path, visited: v })
          }
        }
      }

      return paths
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
