<template>
  <Day :day="15" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder-one">
        <canvas ref="partOne" class="canvas" width="202" height="100" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder-two">
        <canvas ref="partTwo" class="canvas" width="1002" height="500" />
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
      neighbors: [[1, 0], [0, 1], [-1, 0], [0, -1]],
      gridOne: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const nodesOne = this.parseInput(input, 1)
      this.solutions.partOne = this.dijkstra(nodesOne, input[0].length - 1, input.length - 1)
      this.$nextTick(() => this.print(this.$refs.partOne, nodesOne, this.getNodesOnPath(nodesOne, `${input[0].length - 1},${input.length - 1}`), input[0].length - 1, input.length - 1))

      const nodesTwo = this.parseInput(input, 5)
      this.solutions.partTwo = this.dijkstra(nodesTwo, input[0].length * 5 - 1, input.length * 5 - 1)
      this.$nextTick(() => this.print(this.$refs.partTwo, nodesTwo, this.getNodesOnPath(nodesTwo, `${input[0].length * 5 - 1},${input.length * 5 - 1}`), input[0].length * 5 - 1, input.length * 5 - 1))
    },
    parseInput: function (input, repeat) {
      const nodes = new Map()

      const maxX = input[0].length
      const maxY = input.length

      // Parse the original grid
      const grid = input.map(i => i.split('').map(c => +c))

      // For the larger dimensions
      for (let y = 0; y < maxY * repeat; y++) {
        for (let x = 0; x < maxX * repeat; x++) {
          // Get the coordinates and the valid neighbors
          const coords = `${x},${y}`
          const validNeighbors = this.neighbors.filter(n => x + n[0] >= 0 && x + n[0] < maxX * repeat && y + n[1] >= 0 && y + n[1] < maxY * repeat)

          // Calculate the value of the repeated cell
          let value = (+grid[y % grid.length][x % grid[0].length]) + Math.floor(y / maxY) + Math.floor(x / maxX)

          // Fix issues with large values
          if (value > 9) {
            value -= 9
          }

          // Add the node to the mapping
          nodes.set(coords, {
            x: x,
            y: y,
            value: value,
            coords: coords,
            cost: Number.POSITIVE_INFINITY,
            neighbors: validNeighbors
          })
        }
      }

      return nodes
    },
    dijkstra: function (nodes, maxX, maxY) {
      const target = `${maxX},${maxY}`

      // Use a priority queue to keep track of the node with lowest cost
      const queue = new PriorityQueue({
        compare: (a, b) => a.cost - b.cost
      })

      // Add the start point
      const start = nodes.get('0,0')
      start.cost = 0
      queue.enqueue(start)

      // While there are still nodes on the queue, continue
      while (queue.size() > 0) {
        // Get the lowest-cost node
        const current = queue.dequeue()

        // Go through all neighbors
        current.neighbors.forEach(n => {
          // Get the actual object
          const coords = `${current.x + n[0]},${current.y + n[1]}`
          const neighbor = nodes.get(coords)

          // Check if it's on the queue
          const onQueue = neighbor.cost !== Number.POSITIVE_INFINITY
          // Adjust the cost
          neighbor.cost = Math.min(neighbor.cost, current.cost + neighbor.value)

          if (!onQueue) {
            // Add to queue
            queue.enqueue(neighbor)
          }
        })

        // If we found the target, we can stop
        if (current.coords === target) {
          break
        }
      }

      return nodes.get(target).cost
    },
    print: function (canvas, nodes, path, maxX, maxY) {
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = createColorGradient('#006266', '#C4E538', nodes.get(`${maxX},${maxY}`).cost + 1)
      const gradientValue = createColorGradient('#006266', '#C4E538', 10)

      nodes.forEach(n => {
        ctx.fillStyle = gradientValue[n.value]
        ctx.fillRect(n.x, n.y, 1, 1)

        if (path.has(n.coords)) {
          ctx.fillStyle = '#181a1b'
          ctx.fillRect(n.x + maxX + 2, n.y, 1, 1)
        } else {
          ctx.fillStyle = gradient[n.cost]
          ctx.fillRect(n.x + maxX + 2, n.y, 1, 1)
        }
      })
    },
    getNodesOnPath: function (nodes, target) {
      // Keep track of the nodes on the path
      const path = new Set()

      // Start at the target
      let current = target
      path.add(current)

      // While we haven't reached the start yet
      while (current !== '0,0') {
        // Find the neighbor with the smallest cost
        let minValue = Number.MAX_SAFE_INTEGER
        let min = null
        nodes.get(current).neighbors.forEach(n => {
          const curr = current.split(',').map(c => +c)
          const coords = `${curr[0] + n[0]},${curr[1] + n[1]}`
          const neighbor = nodes.get(coords)

          if (neighbor.cost < minValue) {
            minValue = neighbor.cost
            min = coords
          }
        })

        // Add that neighbor and continue with it
        path.add(min)
        current = min
      }

      // Add the target
      path.add('0,0')

      return path
    }
  }
}
</script>

<style>
.canvas-holder-one {
  overflow: auto;
  height: 100px;
  width: 100%;
}
.canvas-holder-two {
  overflow: auto;
  height: 500px;
  width: 100%;
}
</style>
