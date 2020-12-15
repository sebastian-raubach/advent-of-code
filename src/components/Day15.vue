<template>
  <Day :day="15" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-15.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      numbers: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.numbers = input[0].split(',').map(i => +i)
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.solutions.partOne = this.solve(this.numbers, 2020)
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.solve(this.numbers, 30000000)
    },
    solve: function (input, target) {
      // Initialize the memory
      const memory = new Map()
      input.forEach((t, i) => {
        memory.set(t, i + 1)
      })

      // The previous number is the last input
      let prev = input[input.length - 1]

      // Iterate until we have reached the loop counter goal
      for (let i = input.length + 1; i < target; i++) {
        // The current one is the previous
        const current = prev
        // The previous one is either 0 or the diff between the last two sightings
        prev = memory.has(current) ? i - memory.get(current) : 0
        // Save the current index
        memory.set(current, i)
      }

      // The previously seen number is our goal
      return prev
    }
  }
}
</script>

<style>

</style>
