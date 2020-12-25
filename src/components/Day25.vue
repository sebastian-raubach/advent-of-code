<template>
  <Day :day="25" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-25.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.publicKeys = input.map(i => +i)
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      const min = Math.min(...this.publicKeys)
      const max = Math.max(...this.publicKeys)

      let value = 1
      let counter = 0
      while (value !== min) {
        value = (value * 7) % 20201227
        counter++
      }

      let key = max
      for (let i = 1; i < counter; i++) {
        key = (key * max) % 20201227
      }

      this.solutions.partOne = key
    },
    solvePartTwo: function () {
      // There is no part 2
    }
  }
}
</script>

<style>

</style>
