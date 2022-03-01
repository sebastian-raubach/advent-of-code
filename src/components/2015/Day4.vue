<template>
  <Day :day="4" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'

const md5 = require('md5')

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
      const bits = input[0]

      let i = 0
      while (true) {
        const checksum = md5(`${bits}${i}`)

        if (checksum.startsWith('00000')) {
          this.solutions.partOne = i
          break
        }

        i++
      }
      while (true) {
        const checksum = md5(`${bits}${i}`)

        if (checksum.startsWith('000000')) {
          this.solutions.partTwo = i
          break
        }

        i++
      }
    }
  }
}
</script>

<style>

</style>
