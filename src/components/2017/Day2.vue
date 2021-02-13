<template>
  <Day :day="2" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split each row on tab and then map the values to numbers
      this.grid = input.map(i => i.split('\t').map(v => +v))
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Map each row to the distance between min and max, then sum them all together
      this.solutions.partOne = this.grid.map(r => Math.max(...r) - Math.min(...r)).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Map each row to the numbers evenly divisible, then sum them all together
      this.solutions.partTwo = this.grid.map(r => this.getDivResult(r)).reduce((a, b) => a + b)
    },
    getDivResult: function (row) {
      // First number runs from start to end - 1
      for (let i = 0; i < row.length - 1; i++) {
        // Second number runs from first + 1 to end
        for (let j = i + 1; j < row.length; j++) {
          // If either modulo is 0, they are evenly d\ivisibe, return
          if (row[i] % row[j] === 0) {
            return row[i] / row[j]
          } else if (row[j] % row[i] === 0) {
            return row[j] / row[i]
          }
        }
      }

      return 0
    }
  }
}
</script>

<style>

</style>
