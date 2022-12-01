<template>
  <Day :day="1" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const elves = []

      let sum = 0

      input.forEach(i => {
        if (i === '') {
          // If we encounter an empty line, store the sum and reset
          elves.push(sum)
          sum = 0
        } else {
          // Otherwise, add to the sum
          sum += +i
        }
      })

      // Add the last one
      elves.push(sum)

      // Sort them
      elves.sort((a, b) => b - a)

      // Get the largest value for part one
      this.solutions.partOne = elves[0]
      // Sum up three largest for part two
      this.solutions.partTwo = elves[0] + elves[1] + elves[2]
    }
  }
}
</script>

<style>

</style>
