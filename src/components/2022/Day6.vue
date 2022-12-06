<template>
  <Day :day="6" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const chars = input[0].split('')

      this.solutions.partOne = this.solve(chars, 4)
      this.solutions.partTwo = this.solve(chars, 14)
    },
    solve: function (chars, size) {
      for (let i = size; i < chars.length; i++) {
        const set = new Set(chars.slice(i - size, i))
        if (set.size === size) {
          return i
        }
      }
    }
  }
}
</script>

<style>
</style>
