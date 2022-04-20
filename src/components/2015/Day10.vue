<template>
  <Day :day="10" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      let curr = input[0].split('').map(c => +c)

      // Do it 40 times for part one
      for (let i = 0; i < 40; i++) {
        curr = this.process(curr)
      }
      this.solutions.partOne = curr.length

      // Then 10 more times for part two
      for (let i = 40; i < 50; i++) {
        curr = this.process(curr)
      }
      this.solutions.partTwo = curr.length
    },
    process: function (arr) {
      // Get the first one
      let curr = arr[0]
      // Remember the result
      const result = []
      // Set the same-digit-counter to 1
      let counter = 1

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === curr) {
          // If we see the same digit as before, increment counter
          counter++
        } else {
          // Once we see a different letter, push the counter and the digit on the array
          result.push(counter)
          result.push(curr)
          // Then start with the next one
          curr = arr[i]
          counter = 1
        }
      }

      // Remember to push once more at the end
      result.push(counter)
      result.push(curr)

      return result
    }
  }
}
</script>

<style>

</style>
