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
          elves.push(sum)
          sum = 0
        } else {
          sum += +i
        }
      })

      elves.sort((a, b) => b - a)

      console.log(elves)

      this.solutions.partOne = elves[0]
      this.solutions.partTwo = elves[0] + elves[1] + elves[2]
    }
  }
}
</script>

<style>

</style>
