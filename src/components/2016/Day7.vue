<template>
  <Day :day="7" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
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
      this.solutions.partOne = input.map(i => {
        const parts = i.split('')

        let current = []
        let isBracket = false
        let found = false
        for (let i = 0; i < parts.length; i++) {
          if (parts[i] === '[') {
            isBracket = true
            current = []
          } else if (parts[i] === ']') {
            isBracket = false
            current = []
          } else {
            current.push(parts[i])

            if (current.length > 4) {
              current.shift()
            }
          }

          if (current.length === 4 && current[0] !== current[1] && current.join() === current.concat().reverse().join()) {
            if (isBracket) {
              return 0
            } else {
              found = true
            }
          }
        }

        return found ? 1 : 0
      }).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style>
</style>
