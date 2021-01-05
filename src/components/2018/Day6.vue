<template>
  <Day :day="6" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.coordinates = input.map(i => i.split(', ').map(c => +c))

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      let maxX = -Number.MAX_VALUE
      let maxY = -Number.MAX_VALUE

      // Determine max x and y
      this.coordinates.forEach(c => {
        maxX = Math.max(maxX, c[0])
        maxY = Math.max(maxY, c[1])
      })

      // Create the grid
      this.grid = this.makeArray(maxY + 1, maxX + 1, 0)

      const areaSizes = new Map()
      // Go through the grid and assign grid cells to their closest coordinate
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          // Find the closest coordinate
          let minIndex = null
          let minValue = Number.MAX_VALUE
          this.coordinates.map(c => Math.abs(c[0] - x) + Math.abs(c[1] - y))
            .forEach((d, i) => {
              if (d < minValue) {
                // Otherwise use the new value and index
                minIndex = i
                minValue = d
              } else if (d === minValue) {
                // If we have two closest, ignore them
                minIndex = null
              }
            })

          this.grid[y][x] = minIndex

          // Increase the size counter for this coordinate
          if (minIndex !== null) {
            if (!areaSizes.has(minIndex)) {
              areaSizes.set(minIndex, 1)
            } else {
              areaSizes.set(minIndex, areaSizes.get(minIndex) + 1)
            }
          }
        }
      }

      // Delete areas that reach the edge because they are infinite
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[0][x] !== null) {
          areaSizes.delete(this.grid[0][x])
        }
        if (this.grid[this.grid.length - 1][x] !== null) {
          areaSizes.delete(this.grid[this.grid.length - 1][x])
        }
      }
      for (let y = 0; y < this.grid.length; y++) {
        if (this.grid[y][0] !== null) {
          areaSizes.delete(this.grid[y][0])
        }
        if (this.grid[y][this.grid[y].length - 1] !== null) {
          areaSizes.delete(this.grid[y][this.grid[y].length - 1])
        }
      }

      // Find the maximum area size
      this.solutions.partOne = Math.max(...areaSizes.values())
    },
    solvePartTwo: function () {
      let counter = 0
      // Run through the grid
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          // Calculate the sum of all distances to the coordinates
          const distanceSum = this.coordinates.map(c => Math.abs(c[0] - x) + Math.abs(c[1] - y)).reduce((a, b) => a + b)
          if (distanceSum < 10000) {
            // Increase the counter
            counter++
          }
        }
      }
      this.solutions.partTwo = counter
    },
    makeArray: function (w, h, val) {
    var arr = []
    for (let i = 0; i < h; i++) {
        arr[i] = []
        for (let j = 0; j < w; j++) {
            arr[i][j] = val
        }
    }
    return arr
}
  }
}
</script>

<style>
</style>
