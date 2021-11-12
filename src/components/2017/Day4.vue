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
      this.solutions.partOne = this.phrases.filter(p => {
        const set = new Set()

        p.forEach(w => set.add(w))

        return set.size === p.length
      }).length
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.phrases.filter(p => {
        for (let i = 0; i < p.length; i++) {
          for (let j = i + 1; j < p.length; j++) {
            if (this.areAnagram(p[i], p[j])) {
              return false
            }
          }
        }

        return true
      }).length
    },
    areAnagram: function (one, two) {
      return one.split('').sort().join('') === two.split('').sort().join('')
    }
  }
}
</script>

<style>

</style>
