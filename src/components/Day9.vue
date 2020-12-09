<template>
  <Day :day="9" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-9.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      preamble: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      input = input.map(i => +i)
      this.preamble = input.slice(0, 25)

      this.solvePartOne(input.slice(25, input.length))
      this.solvePartTwo(input)
    },
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
      for (let n = 0; n < numbers.length; n++) {
        const number = numbers[n]

        const hasSumOfTwo = this.hasSumOfTwo(number)

        if (hasSumOfTwo === false) {
          this.solutions.partOne = number
          return
        }

        this.preamble.push(number)
        this.preamble.shift()
      }
    },
    solvePartTwo: function (numbers) {
      for (let start = 0; start < numbers.length; start++) {
        inner: for (let end = start + 1; end < numbers.length; end++) {
          const range = numbers.slice(start, end + 1)
          const sum = range.reduce((a, b) => a + b)

          if (sum === this.solutions.partOne) {
            range.sort((a, b) => a - b)
            this.solutions.partTwo = range[0] + range[range.length - 1]
          } else if (sum > this.solutions.partOne) {
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
