<template>
  <Day :day="9" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      const tokens = input[0].split('')

      // Create the tree
      const root = this.parseGroup(tokens, 1)

      // Calculate the score starting from the root
      this.solutions.partOne = this.calculateScores(root, 0)
      // Calculate the length of garbage starting from the root
      this.solutions.partTwo = this.calculateGarbage(root)
    },
    calculateGarbage: function (group) {
      // Start by counting the garbage of this group
      let total = group.garbage.length

      group.children.forEach(c => {
        // Then add the garbage of all children recursively
        total += this.calculateGarbage(c)
      })

      return total
    },
    calculateScores: function (group, parentScore) {
      // Increase the score based on the parent score
      group.score = parentScore + 1

      let totalScore = group.score
      group.children.forEach(c => {
        // Then sum together all the child scores recursively
        const childScore = this.calculateScores(c, group.score)
        totalScore += childScore
      })

      return totalScore
    },
    parseGroup: function (tokens, startIndex) {
      // Keep track of the index
      let index = startIndex
      // Keep track of whether we are looking at garbage or noe
      let isGarbage = false
      // Keep track of the current group
      const group = {
        startIndex: startIndex,
        endIndex: null,
        score: 0,
        children: [],
        garbage: ''
      }
      while (true) {
        // Get the next character
        const token = tokens[index]

        if (isGarbage) {
          // If it's garbage
          if (token === '!') {
            // Skip the next token if we observe a "!"
            index++
          } else if (token === '>') {
            // This is the end of the garbage
            isGarbage = false
          } else {
            // Keep track of any garbage tokens that aren't skipped or the starting and ending bracket
            group.garbage += token
          }
        } else {
          if (token === '{') {
            // Parse the child group
            const childGroup = this.parseGroup(tokens, index + 1)
            group.children.push(childGroup)
            // Adjust the index to start again from the end of the last child group
            index = childGroup.endIndex
          } else if (token === '<') {
            // We have observed the start of garbage
            isGarbage = true
          } else if (token === '}') {
            // Update the end of this group
            group.endIndex = index
            return group
          }
        }

        // Go to the next token
        index++
      }
    }
  }
}
</script>

<style>

</style>
