<template>
  <Day :day="9" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      const result = [0, 0]
      input.forEach(i => {
        const numbers = i.split(' ').map(Number)
        const temp = this.solve(numbers)

        result[0] += numbers[0] - temp[0]
        result[1] += numbers[numbers.length - 1] + temp[1]
      })
      this.solutions.partOne = result[1]
      this.solutions.partTwo = result[0]
    },
    solve: function (arr) {
      const dist = []

      for (let i = 1; i < arr.length; i++) {
        dist.push(arr[i] - arr[i - 1])
      }

      if (dist.every(d => d === 0)) {
        return [0, 0]
      } else {
        const temp = this.solve(dist)
        return [dist[0] - temp[0], dist[dist.length - 1] + temp[1]]
      }
    }
  }
}
</script>

<style>
</style>
