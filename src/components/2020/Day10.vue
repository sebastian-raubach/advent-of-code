<template>
  <Day :day="10" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      numbers: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.numbers = input.map(i => +i).sort((a, b) => a - b)
      this.numbers.unshift(0)
      this.numbers.push(this.numbers.reduce((a, b) => a > b ? a : b) + 3)

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      const jolts = {}

      // Loop through the numbers
      for (let i = 1; i < this.numbers.length; i++) {
        // Get the diff between them
        const diff = this.numbers[i] - this.numbers[i - 1]

        // Increase the count for this diff value
        if (!jolts[diff]) {
          jolts[diff] = 0
        }
        jolts[diff]++
      }

      // The result is the diff value for 1 times diff value for 3
      this.solutions.partOne = jolts[1] * jolts[3]
    },
    solvePartTwo: function () {
      const possibleConnections = {}

      // For each adapter, find the ones that can reach it
      for (let i = this.numbers.length - 1; i >= 0; i--) {
        let j = i - 1
        const parents = []
        while (j >= 0 && this.numbers[i] <= this.numbers[j] + 3) {
          parents.push(this.numbers[j])
          j--
        }
        possibleConnections[this.numbers[i]] = parents
      }

      const waysToGo = {}
      // Start from zero
      waysToGo[0] = 1
      let total = 0
      // For each adapter
      for (let i = 1; i < this.numbers.length; i++) {
        total = 0
        // Sum up the ways to get here upwards
        possibleConnections[this.numbers[i]].forEach(e => {
          total += waysToGo[e]
        })
        // Remember the number of ways to get here
        waysToGo[this.numbers[i]] = total
      }

      // The total is our solution
      this.solutions.partTwo = total
    }
  }
}
</script>

<style>

</style>
