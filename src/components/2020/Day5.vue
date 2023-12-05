<template>
  <Day :day="5" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      parsedInput: null,
      mapping: { B: 1, F: 0, R: 1, L: 0 }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Map the letters to 0s and 1s, by splitting into characters, mapping them to 0 and 1, then joining back together
      this.parsedInput = input.map(r => r.split('').map(c => this.mapping[c]).join(''))

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Mab boarding pass sequence as binary number to decimal number
      this.seatIds = this.parsedInput.map(p => parseInt(p, 2))

      // Get the maximum
      this.solutions.partOne = this.seatIds.reduce((a, b) => a > b ? a : b)
    },
    solvePartTwo: function () {
      // Get the first row that has tickets (skip the minimum row)
      const startRow = Math.floor(this.seatIds.reduce((a, b) => a < b ? a : b) / 8) + 1
      // Get the last row that has tickets (skip the maximum row)
      const endRow = Math.floor(this.solutions.partOne / 8) - 1

      // Iterate through the row in the range
      for (let row = startRow; row <= endRow; row++) {
        // Iterate through the columns
        for (let col = 0; col < 8; col++) {
          // Get the seat id
          const id = row * 8 + col

          // Check if the current seat id isn't in the list, but the neighbors are
          if (this.seatIds.indexOf(id) === -1 && this.seatIds.indexOf(id - 1) !== -1 && this.seatIds.indexOf(id + 1) !== -1) {
            this.solutions.partTwo = id
            return
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
