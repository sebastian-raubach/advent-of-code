<template>
  <Day :day="9" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      preamble: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Convert input to numbers
      input = input.map(i => +i)
      // Extrac the preamble
      this.preamble = input.slice(0, 25)

      // Solve part one with the remaining numbers
      this.solvePartOne(input.slice(25, input.length))
      // Solve part two with the whole input
      this.solvePartTwo(input)
    },
    /**
     * Checks if two numbers in the preamble added together result in the given number
     * @param number The number to get as a result
     * @returns `true` if a combination of numbers was found, `false` otherwise
     */
    hasSumOfTwo: function (number) {
      // Iterate through
      for (let i = 0; i < this.preamble.length; i++) {
        // Start second loop only from i
        for (let j = i + 1; j < this.preamble.length; j++) {
          if (this.preamble[i] + this.preamble[j] === number) {
            return true
          }
        }
      }

      return false
    },
    solvePartOne: function (numbers) {
      // For each number
      for (let n = 0; n < numbers.length; n++) {
        const number = numbers[n]

        // Check if there are two other numbers that add up to it
        const hasSumOfTwo = this.hasSumOfTwo(number)

        // If not, we have our result
        if (hasSumOfTwo === false) {
          this.solutions.partOne = number
          return
        }

        // Otherwise, push the number to the preamble and remove the first value
        this.preamble.push(number)
        this.preamble.shift()
      }
    },
    solvePartTwo: function (numbers) {
      // Move the first pointer from the start of the numbers
      for (let start = 0; start < numbers.length; start++) {
        // Keep track of the min, max and sum
        let sum = numbers[start]
        let min = sum
        let max = sum
        // Move the second pointer from the next position onwards
        inner: for (let end = start + 1; end < numbers.length; end++) {
          // Adjust the values
          sum += numbers[end]
          min = Math.min(min, numbers[end])
          max = Math.max(max, numbers[end])

          if (sum === this.solutions.partOne) {
            // If it's the result, add up the min and max
            this.solutions.partTwo = min + max
          } else if (sum > this.solutions.partOne) {
            // If the sum is larger than the number we're looking for, there's no point in going on. Break to the outer loop.
            break inner
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
