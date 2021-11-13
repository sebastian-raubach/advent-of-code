<template>
  <Day :day="4" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split each row on tab and then map the values to the individual words
      this.phrases = input.map(i => i.split(' '))

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.solutions.partOne = this.validCount(this.phrases.concat())
    },
    solvePartTwo: function () {
      let phrases = this.phrases.concat()
      // Sort each word in the phrase, then do the same as part one.
      phrases = phrases.map(w => w.map(c => c.split('').sort().join('')))
      this.solutions.partTwo = this.validCount(phrases)
    },
    validCount: function (phrases) {
      return phrases.filter(p => {
        // Get the unique ones
        const set = new Set()
        p.forEach(w => set.add(w))

        // Unique count same as original count? Then keep it as valid.
        return set.size === p.length
      }).length
    }
  }
}
</script>

<style>

</style>
