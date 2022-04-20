<template>
  <Day :day="5" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
    onInputChanged: function (words) {
      const badStrings = ['ab', 'cd', 'pq', 'xy']
      const vowels = ['a', 'e', 'i', 'o', 'u']

      this.solutions.partOne = words.filter(w => {
        const parts = w.split('')

        // Filter out the bad strings first
        if (badStrings.some(b => w.inludes(b))) {
          return false
        }
        // Filter out the words that don't contain at least three vowels
        if (parts.filter(p => vowels.includes(p)).length < 3) {
          return false
        }
        // Check for duplicate letters
        for (let i = 1; i < parts.length; i++) {
          if (parts[i] === parts[i - 1]) {
            return true
          }
        }
        // Otherwise return false
        return false
      }).length

      this.solutions.partTwo = words.filter(w => {
        const parts = w.split('')

        let gapFound = false
        for (let i = 2; i < parts.length; i++) {
          if (parts[i] === parts[i - 2]) {
            gapFound = true
            break
          }
        }
        if (!gapFound) {
          return false
        }

        for (let i = 1; i < parts.length; i++) {
          const sub = `${parts[i - 1]}${parts[i]}`
          if (w.indexOf(sub, i + 1) !== -1) {
            return true
          }
        }
        return false
      }).length
    }
  }
}
</script>

<style>

</style>
