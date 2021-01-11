<template>
  <Day :day="11" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      this.serialNumber = +input[0]

      this.grid = []
      for (let y = 0; y < 300; y++) {
        const row = []
        for (let x = 0; x < 300; x++) {
          // Calculate the grid power value
          const rackId = (x + 1) + 10
          let powerLevel = rackId * (y + 1)
          powerLevel += this.serialNumber
          powerLevel *= rackId
          const digits = `${powerLevel}`.split('')
          powerLevel = digits.length < 3 ? 0 : +(digits[digits.length - 3])
          row.push(powerLevel - 5)
        }
        this.grid.push(row)
      }

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      let maxSum = 0
      let coords = null
      for (let y = 0; y < 297; y++) {
        for (let x = 0; x < 297; x++) {
          // Sum up all the grid cells
          let sum = this.grid[y][x] + this.grid[y][x + 1] + this.grid[y][x + 2]
          sum += this.grid[y + 1][x] + this.grid[y + 1][x + 1] + this.grid[y + 1][x + 2]
          sum += this.grid[y + 2][x] + this.grid[y + 2][x + 1] + this.grid[y + 2][x + 2]

          if (sum > maxSum) {
            // Keep the new maximum and the coordinates
            maxSum = sum
            coords = {
              x: x + 1,
              y: y + 1
            }
          }
        }
      }

      this.solutions.partOne = `${coords.x},${coords.y}`
    },
    solvePartTwo: function () {
      // Find the maximum configuration
      let max = {
        sum: -Number.MAX_VALUE,
        coords: null,
        size: 1
      }

      // Iterate over all positions
      for (let y = 0; y < 300; y++) {
        for (let x = 0; x < 300; x++) {
          // Start the sum with the top left value
          let sum = this.grid[y][x]

          if (sum > max.sum) {
            max = {
              sum: sum,
              coords: { x: x + 1, y: y + 1 },
              size: 1
            }
          }

          // Determine how many steps we can take in either direction
          const maxCoord = Math.max(x, y)
          const maxSize = 300 - maxCoord - 1

          // Increment the area size
          for (let size = 2; size <= maxSize; size++) {
            // Add the vertical edge to the sum
            for (let h = 0; h < size; h++) {
              sum += this.grid[y + h][x + size - 1]
            }
            // Add the horizontal edge to the sum
            for (let w = 0; w < size; w++) {
              sum += this.grid[y + size - 1][x + w]
            }
            // Substract the bottom right corner as it's been counted twice
            sum -= this.grid[y + size - 1][x + size - 1]

            // Keep if new maximum
            if (sum > max.sum) {
              max = {
                sum: sum,
                coords: { x: x + 1, y: y + 1 },
                size: size
              }
            }
          }
        }
      }

      this.solutions.partTwo = `${max.coords.x},${max.coords.y},${max.size}`
    }
  }
}
</script>

<style>

</style>
