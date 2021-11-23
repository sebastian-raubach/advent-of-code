<template>
  <Day :day="17" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      const start = +(input[0])

      this.solutions.partOne = this.createList(start, 2017)
      this.solutions.partTwo = this.calculateZero(start, 50_000_000)
    },
    createList: function (start, iterations) {
      // Keep track of the values
      const arr = [0]
      // Current index
      let index = 0

      // Run this #iterations times
      for (let i = 0; i < iterations; i++) {
        // Adjust index
        index = (index + start) % arr.length

        // Insert value
        arr.splice(index, 0, i + 1)
        // Move index
        index = (index + 1) % arr.length
      }

      // Return value after current
      return arr[(index + 1) % arr.length]
    },
    calculateZero: function (start, iterations) {
      // Keep track of the index
      let index = 0
      // This will be the value at index 1
      let one = 0

      for (let i = 0; i < iterations; i++) {
        // Adjust index
        index = (index + start) % (i + 1)

        // Adjust if we're looking at the previous index (0)
        if (index === 0) {
          one = i + 1
        }
        // Increase index
        index++
      }

      return one
    }
  }
}
</script>

<style scoped>
</style>
