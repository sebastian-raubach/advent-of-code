<template>
  <Day :day="5" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split each row on tab and then map the values to numbers
      this.values = input.map(i => +i)

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      let index = 0
      let counter = 0
      const array = this.values.concat()

      while (true) {
        counter++

        const value = array[index]
        array[index]++
        index += value

        if (index < 0 || index > array.length - 1) {
          this.solutions.partOne = counter
          return
        }
      }
    },
    solvePartTwo: function () {
      let index = 0
      let counter = 0
      const array = this.values.concat()

      while (true) {
        counter++

        const value = array[index]
        if (value >= 3) {
          array[index]--
        } else {
          array[index]++
        }
        index += value

        if (index < 0 || index > array.length - 1) {
          this.solutions.partTwo = counter
          return
        }
      }
    }
  }
}
</script>

<style>

</style>
