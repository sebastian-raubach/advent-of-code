<template>
  <Day :day="5" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split into characters
      this.letters = input[0].split('')
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Create a copy of the input
      const copy = this.letters.concat()

      // Then get the solution
      this.solutions.partOne = this.doReaction(copy)
    },
    solvePartTwo: function () {
      // Get all characters
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

      // Keep track of the minimum
      let min = Number.MAX_VALUE
      alphabet.forEach(a => {
        // For each letter, remove it from the input
        const copy = this.letters.concat().filter(l => l !== a && l !== a.toUpperCase())

        // Then run the reaction
        const length = this.doReaction(copy)

        // And store the minimum
        min = Math.min(min, length)
      })

      this.solutions.partTwo = min
    },
    /**
     * Runs the reaction for the given input. Returns the length of the remaining sequence
     * @param letters The input sequence
     * @returns The length of the remaining reaction
     */
    doReaction: function (letters) {
      // Current position
      let position = 0

      // While we haven't reached the end
      while (position < letters.length) {
        // If this one and its neighbor can react
        if (this.canReact(letters[position], letters[position + 1])) {
          // Remove them
          letters.splice(position, 2)
          // And go back a step
          position--
        } else {
          // Otherwise move forwards
          position++
        }
      }

      return letters.length
    },
    /**
     * Checks whether the two letters can react.
     * @param one The first letter
     * @param two The second letter
     * @returns `true` if they can react, `false` otherwise
     */
    canReact: function (one, two) {
      // If either is undefined, return false
      if (one === undefined || two === undefined) {
        return false
      }
      const oneUC = this.isUpperCase(one)
      const twoUC = this.isUpperCase(two)
      // If they are the same letter and one is upper and the other lower case, return true
      return one.toLowerCase() === two.toLowerCase() && ((oneUC && !twoUC) || (!oneUC && twoUC))
    },
    /**
     * Checks whether a letter is upper case.
     * @param letter The letter to check
     * @returns `true` if it is upper case, `false` otherwise
     */
    isUpperCase: function (letter) {
      return letter === letter.toUpperCase()
    }
  }
}
</script>

<style>

</style>
