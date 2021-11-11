<template>
  <Day :day="3" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      this.grid = input.map(i => i.split('\t').map(v => +v))
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
    },
    solvePartTwo: function () {
    }
  }
}
</script>

<style>

</style>
