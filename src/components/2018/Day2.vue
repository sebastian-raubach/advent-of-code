<template>
  <Day :day="2" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Map each row to the count of each letter
      this.letterCounts = input.map(i => {
        // Keep track of the letter counts
        const counts = {}
        i.split('').forEach(l => {
          // Increase or initialize the count
          if (counts[l]) {
            counts[l]++
          } else {
            counts[l] = 1
          }
        })
        // Keep the original
        counts.original = i.split('')
        return counts
      })
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Get the number of words that have a 2-repeat and a 3-repeat
      let twoCount = 0
      let threeCount = 0
      this.letterCounts.forEach(lc => {
        // Filter to the characters with 2 or 3 letters
        twoCount += Object.values(lc).filter(c => c === 2).length > 0 ? 1 : 0
        threeCount += Object.values(lc).filter(c => c === 3).length > 0 ? 1 : 0
      })
      // Sum them together
      this.solutions.partOne = twoCount * threeCount
    },
    solvePartTwo: function () {
      // For each word
      for (let one = 0; one < this.letterCounts.length; one++) {
        // Check each subsequent word
        for (let two = one + 1; two < this.letterCounts.length; two++) {
          // Get the matching characters
          const same = this.sameCharacters(this.letterCounts[one].original, this.letterCounts[two].original)

          // If there's only one that doesn't match
          if (same.length === this.letterCounts[one].original.length - 1) {
            // Get the solution by joining the matches
            this.solutions.partTwo = same.join('')
            return
          }
        }
      }
    },
    /**
     * Gets the characters in the two words that match at each index
     * @param one The first word
     * @param two The second word
     * @returns An array containing the matching letters between the two words
     */
    sameCharacters: function (one, two) {
      const same = []
      for (let i = 0; i < one.length; i++) {
        if (one[i] === two[i]) {
          same.push(one[i])
        }
      }
      return same
    }
  }
}
</script>

<style>

</style>
