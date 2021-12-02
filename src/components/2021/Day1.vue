<template>
  <Day :day="1" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const numbers = input.map(i => +i)

      // Map the indices to 0 or 1 depending on whether they're larger than the previous one, then sum up
      this.solutions.partOne = numbers.map((n, i) => (i > 0 && n > numbers[i - 1]) ? 1 : 0).reduce((a, b) => a + b)

      let counter = 0
      for (let i = 1; i < numbers.length - 2; i++) {
        // Get the first and second sum
        const a = numbers.slice(i - 1, i + 2).reduce((a, b) => a + b)
        const b = numbers.slice(i, i + 3).reduce((a, b) => a + b)

        // Compare
        if (b > a) {
          counter++
        }
      }

      this.solutions.partTwo = counter
    }
  }
}
</script>

<style>

</style>
