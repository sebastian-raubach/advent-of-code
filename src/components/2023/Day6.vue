<template>
  <Day :day="6" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      // Parse the input
      const time = input[0].split(/\s+/).slice(1).map(Number)
      const dist = input[1].split(/\s+/).slice(1).map(Number)

      // Solve part one by multiplying the number of options together
      this.solutions.partOne = this.solve(time, dist).reduce((a, b) => a * b, 1)
      // Solve part two by counting the number of options for the concatenated numbers
      this.solutions.partTwo = this.solve([+time.join('')], [+dist.join('')])[0]
    },
    solve: function (time, dist) {
      // Map each time to the count of wait/speed combinations that win
      return time.map((t, i) => {
        // Determine the minimal time and maximal time to wait
        let min = 1
        let max = t

        // Search for the min from the start
        for (let j = 1; j < t; j++) {
          if (j * (t - j) > dist[i]) {
            // Once we find a winning combination, remember and break
            min = j
            break
          }
        }

        // Search for the max from the end
        for (let j = t - 1; j > 0; j--) {
          if (j * (t - j) > dist[i]) {
            // Once we find a winning combination, remember and break
            max = j
            break
          }
        }

        // Return the size of the range
        return max - min + 1
      })
    }
  }
}
</script>

<style>

</style>
