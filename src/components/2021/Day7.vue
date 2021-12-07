<template>
  <Day :day="7" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const values = input[0].split(',').map(i => +i)

      // Sort them
      values.sort()

      // Keep the minimum  for both parts
      let minOne = Number.MAX_SAFE_INTEGER
      let minTwo = Number.MAX_SAFE_INTEGER

      // For all the values within the bounding box
      for (let i = values[0]; i < values[values.length - 1]; i++) {
        // Calculate the cumulative distance for each point
        minOne = Math.min(minOne, values.reduce((sum, curr) => sum + Math.abs(curr - i), 0))
        // Calculate the cumulative distance for each point using the sum of 1 to n
        minTwo = Math.min(minTwo, values.reduce((sum, curr) => sum + (Math.abs(curr - i) * (Math.abs(curr - i) + 1) / 2), 0))
      }

      this.solutions = {
        partOne: minOne,
        partTwo: minTwo
      }
    }
  }
}
</script>

<style scoped>
</style>
