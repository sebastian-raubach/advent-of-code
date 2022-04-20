<template>
  <Day :day="8" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
/* eslint-disable no-eval */
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
      // Naughty naughty eval!
      // this.solutions.partOne = input.map(i => i.length - eval(i).length).reduce((a, b) => a + b)
      // this.solutions.partTwo = input.map(i => JSON.stringify(i).length - i.length).reduce((a, b) => a + b)

      let partOne = 0
      let partTwo = 0

      input.forEach(str => {
        let escaping = false

        // The actual length without escaping or unescaping
        const totalLength = str.length
        // Encoded, take the original and add 4 for the two \"
        let encodedLength = str.length + 4
        // For the unencoded/cleaned one, start at 0
        let cleanLength = 0

        // Go through them all except the starting and ending quote
        for (let x = 1; x < str.length - 1; x++) {
          const char = str[x]

          // If we are currently escaping (we have encountered a backslash before)
          if (escaping) {
            // Stop that
            escaping = false

            // If it's a hexadecimal character
            if (char === 'x') {
              // Jump two spaces
              x += 2
            } else {
              // Else, increase the encoded length
              encodedLength++
            }
          } else if (char === '\\') {
            // If we encounter a backslash, increase the encoded length
            encodedLength++
            // Start the escape sequence and continue
            escaping = true
            continue
          }

          // Increment clean if we haven't encountered a slash
          cleanLength++
        }

        partOne += totalLength - cleanLength
        partTwo += encodedLength - totalLength
      })

      this.solutions.partOne = partOne
      this.solutions.partTwo = partTwo
    }
  }
}
</script>

<style>

</style>
