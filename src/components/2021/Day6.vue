<template>
  <Day :day="6" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      this.solutions.partOne = this.solve(input, 80)
      this.solutions.partTwo = this.solve(input, 256)
    },
    solve: function (input, days) {
      // Create a map to keep track of the number if fish at each day
      const map = new Map()

      // Fill it with zeros
      for (let i = 0; i <= 8; i++) {
        map.set(i, 0)
      }

      // Fill in the initial fish
      input[0].split(',').forEach(fish => map.set(+fish, map.get(+fish) + 1))

      // For each step
      for (let d = 0; d < days; d++) {
        // For each day of the cycle
        for (let i = 0; i <= 8; i++) {
          // Shift them
          map.set(i - 1, map.get(i))
        }

        // Add the ones that create new fish back to their top
        map.set(6, map.get(6) + map.get(-1))
        // Then generate the new fish
        map.set(8, map.get(-1))

        // Delete the old ones
        map.delete(-1)
      }

      // Return the count of all fish
      return Array.from(map.values()).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style scoped>
</style>
