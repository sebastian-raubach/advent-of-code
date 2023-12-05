<template>
  <Day :day="12" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" :width="gridOne.width" :height="gridOne.height" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" :width="gridTwo.width" :height="gridTwo.height" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createColorGradient } from '@/util/color'

const { PriorityQueue } = require('@datastructures-js/priority-queue')

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
      gridOne: {
        width: 1000,
        height: 1000
      },
      gridTwo: {
        width: 1000,
        height: 1000
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const grid = input.map(i => i.split(''))

      const unvisited = []
      const start = { x: 0, y: 0, cost: 0, path: [] }
      const end = { x: 0, y: 0 }
      const as = []
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (grid[y][x] === 'S') {
            // We're searching in reverse, so define S as the target/end
            end.x = x
            end.y = y
            grid[y][x] = 1
          } else if (grid[y][x] === 'E') {
            // And E as the start
            start.x = x
            start.y = y
            start.path = [`${x},${y}`]
            grid[y][x] = 26
          } else {
            // Map everything to numeric values from a=1 to z=26
            grid[y][x] = grid[y][x].charCodeAt(0) - 96
          }

          if (grid[y][x] === 1) {
            // Remember any location that's a target (an 'a')
            as.push({ x: x, y: y })
          }

          // All nodes are initially unvisited
          unvisited.push({ x: x, y: y, cost: null, path: [] })
        }
      }

      // Remember solutions
      const shortest = {
        p1: this.solve(grid, start, [end], JSON.parse(JSON.stringify(unvisited))),
        p2: this.solve(grid, start, as, JSON.parse(JSON.stringify(unvisited)))
      }

      // Set  solution values
      this.solutions.partOne = shortest.p1.cost
      this.solutions.partTwo = shortest.p2.cost

      this.$nextTick(() => {
        // Draw grids and paths
        this.draw('partOne', grid, this.gridOne, shortest.p1.path)
        this.draw('partTwo', grid, this.gridTwo, shortest.p2.path)
      })
    },
    /**
     * Calculates the Dijkstra algorithm using the neighborhood value distance as an
     * additional criterium. We're searching backwards, so finding and 'end' (an 'a')
     * will be fine as a solution.
     * @param grid The background grid of numbers
     * @param start The starting location ('E')
     * @param ends An array of possible targets ('a's)
     * @param unvisited An array of those nodes that haven't been visited yet
     */
    solve: function (grid, start, ends, unvisited) {
      // Use a priority queue to keep track of the node with lowest cost
      const queue = new PriorityQueue({
        compare: (a, b) => a.cost - b.cost
      })

      // Add the start node
      queue.enqueue(start)

      // Keep track of current node
      let current

      while (queue.size() > 0) {
        // Get the one with the lowest costs
        current = queue.dequeue()

        // Check if it is one of the targets
        const matches = ends.filter(e => e.x === current.x && e.y === current.y)

        if (matches.length > 0) {
          // Return result
          return current
        }

        // Get all the neighbors and check the numeric distance condition
        const neighbors = this.getNeighbors(current.x, current.y, unvisited).filter(n => (grid[current.y][current.x] - grid[n.y][n.x]) <= 1)

        neighbors.forEach(n => {
          // For each neighbor
          if (n.cost === null) {
            // If it hasn't got a cost yet, calculate the cost  and add to queue
            n.path = current.path.concat()
            n.path.push(`${n.x},${n.y}`)
            n.cost = current.cost + 1
            queue.enqueue(n)
          } else if (current.cost + 1 < n.cost) {
            // Else, if this new cost is lower, update the cost
            n.cost = current.cost + 1
            n.path = current.path.concat()
            n.path.push(`${n.x},${n.y}`)
          }
          // Remove from unvisited
          unvisited = unvisited.filter(u => !(u.x === n.x && u.y === n.y))
        })
      }

      return null
    },
    /**
     * Gets the unvisited neighbors of the current coordinates
     */
    getNeighbors: function (x, y, unvisited) {
      const n = []

      unvisited.forEach(u => {
        // Check if it's a neighbor
        if (u.x === x && u.y === y - 1) {
          n.push(u)
        }
        if (u.x === x + 1 && u.y === y) {
          n.push(u)
        }
        if (u.x === x && u.y === y + 1) {
          n.push(u)
        }
        if (u.x === x - 1 && u.y === y) {
          n.push(u)
        }
      })

      return n
    },
    draw: function (id, grid, dims, path) {
      // Initialise the canvas
      const canvas = document.getElementById(id)
      const ctx = canvas.getContext('2d')

      const factor = 10

      // Update dimensions based on grid sizes
      dims.width = (grid[0].length + 1) * factor
      dims.height = (grid.length + 1) * factor

      this.$nextTick(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Offset for better drawing accuracy
        ctx.translate(0.5, 0.5)
        ctx.lineWidth = 1

        ctx.clearRect(0, 0, dims.width, dims.height)

        // Create gradient
        const gradient = createColorGradient('#006266', '#C4E538', 26)

        for (let y = 0; y < grid.length; y++) {
          for (let x = 0; x < grid[y].length; x++) {
            // Fill cells according to elevation
            ctx.fillStyle = gradient[grid[y][x] - 1]
            ctx.fillRect(x * factor, y * factor, factor, factor)
          }
        }

        // Now draw the path oulines
        ctx.strokeStyle = 'black'
        path.forEach(p => {
          const [x, y] = p.split(',').map(c => +c)
          // Draw rectangle around visible trees
          ctx.rect(x * factor, y * factor, factor, factor)
          ctx.stroke()
        })

        ctx.translate(-0.5, -0.5)
      })
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow-x: auto;
  overflow-y: hidden;
  height: 410px;
  width: 100%;
}
</style>
