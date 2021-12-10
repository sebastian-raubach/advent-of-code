<template>
  <Day :day="5" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
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
      const current = input[0]

      let i = 0
      const passwordOne = []
      const passwordTwo = [null, null, null, null, null, null, null, null]
      while (passwordOne.length < 8 || passwordTwo.includes(null)) {
        const checksum = md5(`${current}${i}`)

        if (checksum.startsWith('00000')) {
          const pos = checksum.charAt(5)
          const val = checksum.charAt(6)

          if (passwordOne.length < 8) {
            passwordOne.push(pos)
          }

          if (!isNaN(pos)) {
            const p = +pos

            if (p >= 0 && p < passwordTwo.length && passwordTwo[p] === null) {
              passwordTwo[p] = val
            }
          }
        }
        i++
      }
      this.solutions.partOne = passwordOne.join('')
      this.solutions.partTwo = passwordTwo.join('')
    }
  }
}
</script>

<style scoped>
</style>
