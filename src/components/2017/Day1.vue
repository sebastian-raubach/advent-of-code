<template>
  <Day :day="1" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Map to numbers
      this.numbers = input[0].split('').map(i => +i)
      this.solvePartOne()
      this.solvePartTwo()
    },
    solve: function (dist) {
      // Map each to its value if it matches the one at the specified distance, then sum them up
      return this.numbers.map((n, i) => n === this.numbers[(i + dist) % this.numbers.length] ? n : 0).reduce((a, b) => a + b)
    },
    solvePartOne: function () {
      this.solutions.partOne = this.solve(1)
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.solve(this.numbers.length / 2)
    }
  }
}
</script>

<style>

</style>
