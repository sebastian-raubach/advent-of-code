<template>
  <Day :day="2" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      // Map the letters to numbers, cause they're easier to work with (comparison, modulo and all that)
      mapping: {
        A: 0,
        B: 1,
        C: 2,
        X: 0,
        Y: 1,
        Z: 2
      }
    }
  },
  methods: {
    modulo: function (a, b) {
      return ((a % b) + b) % b
    },
    onInputChanged: function (input) {
      // Sum up the scores for each game (split left and right, then map to the corresponding number and calculate the score)
      this.solutions.partOne = input.map(i => i.split(' ')).map(s => this.scores(this.mapping[s[0]], this.mapping[s[1]])).reduce((a, b) => a + b)
      this.solutions.partTwo = input.map(i => i.split(' ')).map(s => this.scores2(this.mapping[s[0]], this.mapping[s[1]])).reduce((a, b) => a + b)
    },
    scores: function (a, b) {
      // Base score
      let result = b + 1
      if (a === b) {
        // Draw
        result += 3
      } else {
        if (b - a === 1) {
          // Win
          result += 6
        } else if (a - b === 2) {
          // Win
          result += 6
        }
      }

      return result
    },
    scores2: function (a, b) {
      let result = 0

      if (b === 1) {
        // Draw, just take score of a
        result += 3 + a + 1
      } else if (b === 0) {
        // Need to lose
        result += 0 + this.modulo((a - 1), 3) + 1
      } else {
        // Need to win
        result += 6 + this.modulo((a + 1), 3) + 1
      }

      return result
    }
  }
}
</script>

<style>

</style>
