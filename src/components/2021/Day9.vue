<template>
  <Day :day="9" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
    </template>
    <template v-slot:partTwo>
      <div id="partTwo" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mapGetters } from 'vuex'

export default {
  components: {
    Day
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ]),
    layout: function () {
      return {
        height: 700,
        xaxis: {
          title: { text: 'X', font: { color: this.darkMode ? 'white' : 'black' } },
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          title: { text: 'Y', font: { color: this.darkMode ? 'white' : 'black' } },
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee',
          scaleanchor: 'x'
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      }
    }
  },
  watch: {
    darkMode: function () {
      this.plotGrid()
      this.plotBasins()
    }
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      pointToBasin: {}
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input into a number 2d array
      const grid = input.map(r => r.split('').map(c => +c))

      // Keep track of the basins
      const basins = []
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          // Find neighbors of the current grid cell
          const neighbors = this.neighbors(grid, x, y)

          // Check if the current point is smaller than all neighbors
          if (grid[y][x] < Math.min(...neighbors.map(n => grid[n.y][n.x]))) {
            basins.push({
              x: x,
              y: y
            })
          }
        }
      }

      // Set solution one as the sum of all basin centers (+1) and plot
      this.setTraceOne(grid)
      this.solutions.partOne = basins.map(b => grid[b.y][b.x] + 1).reduce((a, b) => a + b)
      this.plotGrid()

      // Get the size of each basin using DFS, then sort descending
      const basinSizes = basins.map((b, i) => this.calcBasinSize(grid, b, [], i))
      const basinSizesSorted = basinSizes.concat().sort((a, b) => b - a)
      // Use the largest three to calculate the solution, then plot
      this.solutions.partTwo = basinSizesSorted[0] * basinSizesSorted[1] * basinSizesSorted[2]
      this.setTraceTwo(grid, basinSizes)
      this.plotBasins()
    },
    setTraceOne: function (grid) {
      // Plot part one
      const trace = {
        x: Array.from(Array(grid[0].length)).map((_, i) => i + 1),
        y: Array.from(Array(grid.length)).map((_, i) => i + 1),
        z: grid,
        type: 'heatmap',
        colorscale: [[0, '#1B1464'], [1, '#12CBC4']]
      }
      Object.freeze(trace)
      this.tracesOne = [trace]
    },
    setTraceTwo: function (grid, basinSizes) {
      // Plot part two
      const trace = {
        x: Array.from(Array(grid[0].length)).map((_, i) => i + 1),
        y: Array.from(Array(grid.length)).map((_, i) => i + 1),
        z: grid.map((r, ri) => r.map((c, ci) => {
          if (c === 9) {
            return null
          } else {
            const basin = this.pointToBasin[`${ci},${ri}`]

            return basinSizes[basin]
          }
        })),
        type: 'heatmap',
        colorscale: [[0, '#1B1464'], [1, '#12CBC4']]
      }
      Object.freeze(trace)
      this.tracesTwo = [trace]
    },
    calcBasinSize: function (grid, curr, visited, index) {
      // Remember we've been here before
      visited.push(`${curr.x},${curr.y}`)

      // Remember for plotting
      this.pointToBasin[`${curr.x},${curr.y}`] = index

      // Get the valid neighbors (the ones with strictly larger value and not visited before)
      const validNeighbors = this.neighbors(grid, curr.x, curr.y).filter(n => {
        if (visited.indexOf(`${n.x},${n.y}`) !== -1) {
          // Check if it's already been visited
          return false
        } else {
          // Check if it's got a larger value but it's not a 9
          return grid[n.y][n.x] > grid[curr.y][curr.x] && grid[n.y][n.x] < 9
        }
      })

      // Count the node itself
      let counter = 1

      // Then sum up the sizes of their neighbors
      validNeighbors.forEach(n => {
        // We have to check this here again, because we may have visited more nodes in a previous DFS branch from this point
        if (visited.indexOf(`${n.x},${n.y}`) === -1) {
          // Increase the basin size
          counter += this.calcBasinSize(grid, n, visited, index)
        }
      })

      return counter
    },
    neighbors: function (grid, x, y) {
      const result = []

      if (x > 0) {
        // Go left
        result.push({ x: x - 1, y: y })
      }
      if (x < grid[y].length - 1) {
        // Go right
        result.push({ x: x + 1, y: y })
      }
      if (y > 0) {
        // Go up
        result.push({ x: x, y: y - 1 })
      }
      if (y < grid.length - 1) {
        // Go down
        result.push({ x: x, y: y + 1 })
      }

      return result
    },
    plotGrid: function () {
      this.$nextTick(() => {
        this.$plotly.newPlot('partOne', this.tracesOne, this.layout, {
          responsive: true,
          displaylogo: false
        })
      })
    },
    plotBasins: function () {
      this.$nextTick(() => {
        this.$plotly.newPlot('partTwo', this.tracesTwo, this.layout, {
          responsive: true,
          displaylogo: false
        })
      })
    }
  }
}
</script>

<style>

</style>
