<template>
  <Day :day="1" :solutions="solutions" @input-changed="onInputChanged">
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
      numbers: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.numbers = input.map(i => +i)
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Iterate through
      for (let i = 0; i < this.numbers.length; i++) {
        // Start second loop only from i
        for (let j = i; j < this.numbers.length; j++) {
          if (this.numbers[i] + this.numbers[j] === 2020) {
            this.solutions.partOne = this.numbers[i] * this.numbers[j]
            return
          }
        }
      }

      this.solutions.partOne = 'No solution found'
    },
    solvePartTwo: function (input) {
      // Iterate through
      for (let i = 0; i < this.numbers.length; i++) {
        // Start second loop only from i
        for (let j = i; j < this.numbers.length; j++) {
          // Start the third loop only from j
          for (let k = j; k < this.numbers.length; k++) {
            if (this.numbers[i] + this.numbers[j] + this.numbers[k] === 2020) {
              this.solutions.partTwo = this.numbers[i] * this.numbers[j] * this.numbers[k]
              return
            }
          }
        }
      }

      this.solutions.partTwo = 'No solution found'
    }
  }
}
</script>

<style>

</style>
