<template>
  <Day :day="10" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      },
      open: ['(', '[', '{', '<'],
      close: [')', ']', '}', '>']
    }
  },
  methods: {
    onInputChanged: function (input) {
      const data = input.map(r => r.split(''))

      let score = 0
      const syntaxScore = [3, 57, 1197, 25137]
      const autoScore = [1, 2, 3, 4]

      const sequence = data.map(d => {
        // Keep track of the opening brackets we have seen
        const stack = []

        for (let i = 0; i < d.length; i++) {
          // Check if it is a closing bracket
          const index = this.close.indexOf(d[i])

          if (index !== -1) {
            // If so, pop the last opening one from the stack
            const opp = stack.pop()
            // If the closing one doesn't match the opposite of the popped opening one
            if (d[i] !== this.close[this.open.indexOf(opp)]) {
              // Increase the score
              score += syntaxScore[index]
              // Return an empty array to indicate that this is corrupt
              return []
            }
          } else {
            // Otherwise, it's an opening bracket, so add it to the stack
            stack.push(d[i])
          }
        }

        return stack
      })

      this.solutions.partOne = score

      // Now calculate the scores per row for all non-corrupt ones, then sort
      const values = sequence.filter(s => s.length > 0)
        .map(s => {
          // Score total
          let total = 0
          // From back to front
          for (let i = s.length - 1; i >= 0; i--) {
            // Get the last one
            const curr = s.pop()
            // Check if it's an opening one
            const index = this.open.indexOf(curr)
            if (index !== -1) {
              // Get the matching closing bracket
              const opp = this.close[this.open.indexOf(curr)]

              // Adjust the score
              total *= 5
              total += autoScore[this.close.indexOf(opp)]
            }
          }

          return total
        }).sort((a, b) => a - b)

      // Get the one in the middle
      this.solutions.partTwo = values[Math.floor(values.length / 2)]
    }
  }
}
</script>

<style>

</style>
