<template>
  <Day :day="11" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      forbidden: ['i', 'o', 'l']
    }
  },
  methods: {
    onInputChanged: function (input) {
      let curr = input[0].split('').reverse()

      let valid = false
      while (!valid) {
        curr = this.increment(curr)
        valid = this.checkPassword(curr.concat().reverse())
      }

      this.solutions.partOne = curr.concat().reverse().join('')

      valid = false
      while (!valid) {
        curr = this.increment(curr)
        valid = this.checkPassword(curr.concat().reverse())
      }

      this.solutions.partTwo = curr.concat().reverse().join('')
    },
    checkPassword: function (pass) {
      // Check if it contains forbidden characters
      if (pass.some(c => this.forbidden.includes(c))) {
        return false
      }
      // Check if a sequence of increasing characters is found
      let sequenceFound = false
      for (let i = 2; i < pass.length; i++) {
        if (this.isNext(pass[i - 2], pass[i - 1], 1) && this.isNext(pass[i - 1], pass[i], 1)) {
          sequenceFound = true
          break
        }
      }
      if (!sequenceFound) {
        return false
      }
      // Check if it has at least two different non-overlapping pairs of letters
      const dups = []
      for (let i = 1; i < pass.length; i++) {
        if (pass[i - 1] === pass[i]) {
          dups.push({
            index: i - 1,
            letter: pass[i]
          })
        }
      }
      return dups.some(d => dups.filter(p => Math.abs(d.index - p.index) > 1 && d.letter !== p.letter).length > 0)
    },
    increment: function (arr) {
      let index = 0

      const temp = arr.concat()
      while (true) {
        temp[index] = this.incrementLetter(temp[index])

        if (temp[index] === 'a') {
          index++

          if (index === temp.length) {
            temp.push('a')
            return temp
          }
        } else {
          return temp
        }
      }
    },
    isNext: function (a, b, dist) {
      return String.fromCharCode(a.charCodeAt(0) + dist) === b
    },
    incrementLetter: function (char) {
      if (char === 'z') {
        return 'a'
      } else {
        return String.fromCharCode(char.charCodeAt(0) + 1)
      }
    }
  }
}
</script>

<style>

</style>
