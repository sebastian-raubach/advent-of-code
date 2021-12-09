<template>
  <Day :day="3" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
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
      // Parse the triangles. Mind the padding spaces
      const triangles = input.map(i => i.trim().split(/\s+/).map(c => +c))

      // Solution part one is just the number of valid triangles by row
      this.solutions.partOne = triangles.filter(t => this.checkTriangle(t)).length

      // For part two, we go through each column 3 steps at a time
      let counter = 0
      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < triangles.length; row += 3) {
          // Increment counter if this vertical triangle is valid
          if (this.checkTriangle([triangles[row][col], triangles[row + 1][col], triangles[row + 2][col]])) {
            counter++
          }
        }
      }

      this.solutions.partTwo = counter
    },
    checkTriangle: function (t) {
      // Take a copy
      const cp = t.concat()
      // Sort
      cp.sort((a, b) => a - b)
      // Check sum of smaller two > largest
      return cp[0] + cp[1] > cp[2]
    }
  }
}
</script>

<style scoped>
</style>
