<template>
  <Day :day="6" :solutions="solutions" @input-changed="onInputChanged">
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
      groupAnswers: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.groupAnswers = []
      let currentGroup = {
        counter: 0,
        letters: {}
      }

      // For each line in the input
      input.forEach(line => {
        // If it's a blank line
        if (line.length === 0) {
          // Push the current group
          this.groupAnswers.push(currentGroup)
          // Reset the group
          currentGroup = {
            counter: 0,
            letters: {}
          }
        } else {
          // Else increase the counter
          currentGroup.counter++
          // Then go through all the letters for the current passenger
          line.split('').forEach(c => {
            if (currentGroup.letters[c]) {
              // If it has been seen before, increase the counter
              currentGroup.letters[c]++
            } else {
              // Otherwise, remember it
              currentGroup.letters[c] = 1
            }
          })
        }
      })

      // Remember to push the last group
      this.groupAnswers.push(currentGroup)

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Map the groups to their length (answers) and then sum them up
      this.solutions.partOne = this.groupAnswers.map(g => Object.keys(g.letters).length).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Map the groups to the number of answers that have been answered by all and then sum them up
      this.solutions.partTwo = this.groupAnswers.map(g => Object.keys(g.letters).filter(k => g.letters[k] === g.counter).length).reduce((a, b) => a + b)
    }
  }
}
</script>

<style>

</style>
