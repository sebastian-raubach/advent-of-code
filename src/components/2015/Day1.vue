<template>
  <Day :day="1" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split the input and map them all to either 1 or -1 based on the bracket
      const parts = input[0].split('').map(c => c === '(' ? 1 : -1)
      // Reduce the array by summing it up
      this.solutions.partOne = parts.reduce((a, b) => a + b)

      // Now get the first instance of going into the basement
      let totalFloor = 0
      for (let i = 0; i < parts.length; i++) {
        totalFloor += parts[i]

        if (totalFloor < 0) {
          this.solutions.partTwo = i + 1
          // Remember to stop here
          break
        }
      }
    }
  }
}
</script>

<style>

</style>
