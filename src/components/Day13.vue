<template>
  <Day :day="13" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-13.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      target: null,
      numbers: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Get the target number for part 1
      this.target = +input[0]
      // Get only the busses for part 1
      this.numbers = input[1].split(',').filter(i => i !== 'x').map(i => +i)
      // Get all the busses and their indices for part 2
      this.busses = input[1].split(',').map((b, i) => {
        return {
          index: i,
          value: b === 'x' ? null : +b
        }
      }).filter(b => b.value !== null)

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Start from the next timepoint after our arrival
      let current = this.target + 1

      while (true) {
        // Find the busses leaving at this number
        const matches = this.numbers.filter(n => current % n === 0)

        // If there is one, that's our solution
        if (matches.length > 0) {
          this.solutions.partOne = matches[0] * (current - this.target)
          return
        }

        current++
      }
    },
    solvePartTwo: function () {
      // Use the Chinese Remainder Theorem to solve this
      let step = 1
      let n = 1

      this.busses.forEach(b => {
        while ((n + b.index) % b.value !== 0) {
          n += step
        }

        step *= b.value
      })

      this.solutions.partTwo = n
    }
  }
}
</script>

<style>

</style>
