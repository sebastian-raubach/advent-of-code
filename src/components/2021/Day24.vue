<template>
  <Day :day="24" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      this.solutions.partOne = this.solve(input, true)
      this.solutions.partTwo = this.solve(input, false)
    },
    solve: function (input, biggest) {
      const final = Array(14)
      const stack = []

      for (let i = 0; i < 14; i += 1) {
        const xAdd = parseInt(input[18 * i + 5].split(' ')[2])
        const yAdd = parseInt(input[18 * i + 15].split(' ')[2])
        if (xAdd > 0) {
          stack.push([yAdd, i])
        } else {
          const s = stack.pop()
          const [yAdd, yIndex] = [s[0], s[1]]
          let toAdd
          if (biggest) {
            toAdd = 9
            while (toAdd + yAdd + xAdd > 9) toAdd--
          } else {
            toAdd = 1
            while (toAdd + yAdd + xAdd < 1) {
              toAdd++
            }
          }
          final[yIndex] = toAdd
          final[i] = toAdd + yAdd + xAdd
        }
      }
      return final.join('')
    }
  }
}
</script>

<style scoped>
</style>
