<template>
  <Day :day="1" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Map frequencies to numbers
      this.numbers = input.map(i => +i)
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Sum all frequency changes together
      this.solutions.partOne = this.numbers.reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Remember seen frequencies
      const freqs = new Set()
      // The current frequency total
      let current = 0
      // The counter used to get the wrapped index
      let counter = 0
      // While we haven't seen the current frequency
      while (!freqs.has(current)) {
        // Add it to the set
        freqs.add(current)
        // Then add the new frequency
        current += this.numbers[counter++ % this.numbers.length]
      }

      // The result is the repeated frequency
      this.solutions.partTwo = current
    }
  }
}
</script>

<style>

</style>
