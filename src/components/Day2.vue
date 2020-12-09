<template>
  <Day :day="2" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged" />
</template>

<script>
import Day from '@/components/Day'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      taskInput: require('@/assets/input/Day-2.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      parsedInput: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.parseInput(input)

      this.solvePartOne()
      this.solvePartTwo()
    },
    parseInput: function (input) {
      this.parsedInput = input.map(i => {
        // First, split on ": " to separate the requirement and the password
        const parts = i.split(': ')
        // Split the requirement on " " to separate the range and the letter
        const passwordReq = parts[0].split(' ')
        // Split the password into its individual letters
        const letters = parts[1].split('')

        // Construct the result
        const result = {
          password: letters,
          requirement: {
            letter: passwordReq[1],
            range: passwordReq[0].split('-')
          },
          letterCount: null
        }

        // Password letter counts
        const letterMap = {}
        // For each letter in the password
        letters.forEach(l => {
          // Either increase its count or create it
          if (letterMap[l]) {
            letterMap[l]++
          } else {
            letterMap[l] = 1
          }
        })
        result.letterCount = letterMap

        return result
      })
    },
    solvePartOne: function () {
      // Map each input row to a boolean value representing if it matches the requirement
      this.solutions.partOne = this.parsedInput.map(i => {
        // Get the letter to count mapping
        const letters = i.letterCount
        // Get the password requirement letter
        const letter = i.requirement.letter
        // And the letter count range
        const range = i.requirement.range

        // Check if the letter exists in the password and if its count is in range
        return letters[letter] && letters[letter] >= range[0] && letters[letter] <= range[1]
      }).filter(p => p).length
    },
    solvePartTwo: function () {
      // Map each input row to a boolean value representing if it matches the requirement
      this.solutions.partTwo = this.parsedInput.map(i => {
        // Get the original password
        const letters = i.password
        // Get the password requirement letter
        const letter = i.requirement.letter
        // Get the indices that should match that letter
        const firstIndex = i.requirement.range[0] - 1
        const lastIndex = i.requirement.range[1] - 1

        // Check if EXACTLY ONE of the positions matches the letter
        return (letters[firstIndex] === letter && letters[lastIndex] !== letter) || (letters[firstIndex] !== letter && letters[lastIndex] === letter)
      }).filter(p => p).length
    }
  }
}
</script>

<style>

</style>
