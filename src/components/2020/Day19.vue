<template>
  <Day :day="19" :solutions="solutions" @input-changed="onInputChanged">
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
      this.rules = {}
      this.input = []

      let part = 0
      // For each input
      input.forEach(i => {
        // If it's empty, we've reached the second part
        if (i === '') {
          part++
          return
        }

        if (part === 0) {
          // If we're still in the first half of the input, split on the colon and replace quotes
          const split = i.split(': ').map(p => p.replace(/"/g, ''))
          // Then save the result in a map/object
          this.rules[+split[0]] = split[1]
        } else {
          // If we're in the second half of the input, just keep the input
          this.input.push(i)
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    expandOne: function (current) {
      // If we've reached a letter, simply return
      if (current.length === 1 && isNaN(+current)) {
        return current
      }

      // Split into parts and then map them recursively
      const result = current.split(' ').map(p => {
        if (p === '|') {
          // ORs are simply kept
          return '|'
        } else {
          // Everything else is resolved recursively
          return this.expandOne(this.rules[+p])
        }
      }).join('')

      // Return the result joined back together
      return `(${result})`
    },
    expandTwo: function (current, prevKey, eleven, eight) {
      // If we've come from rule 8
      if (prevKey === 8) {
        // Increase the counter
        eight++

        // Some test runs have shown that 5 is the limit we need
        // If we have reached 5 repetitions, ignore the recursive part and just return the rule without it
        if (eight >= 5) {
          return `(${this.expandTwo(this.rules[42], 42, eleven, eight)})`
        }
      }
      // If we've come from rule 11
      if (prevKey === 11) {
        // Increase the counter
        eleven++

        // Some test runs have shown that 5 is the limit we need
        // If we have reached 5 repetitions, ignore the recursive part and just return the rule without it
        if (eleven >= 5) {
          return `(${this.expandTwo(this.rules[42], 42, eleven, eight)}${this.expandTwo(this.rules[31], 31, eleven, eight)})`
        }
      }

      // The rest is identical to part 1
      if (current.length === 1 && isNaN(+current)) {
        return current
      }

      const result = current.split(' ').map(p => {
        if (p === '|') {
          return '|'
        } else {
          return this.expandTwo(this.rules[+p], +p, eleven, eight)
        }
      }).join('')

      return `(${result})`
    },
    solvePartOne: function () {
      const overallRule = new RegExp('^' + this.expandOne(this.rules[0]) + '$', 'gm')

      this.solutions.partOne = this.input.filter(m => m.match(overallRule)).length
    },
    solvePartTwo: function () {
      // Replace the rules
      this.rules[8] = '42 | 42 8'
      this.rules[11] = '42 31 | 42 11 31'

      // Generate the regex
      const overallRule = new RegExp('^' + this.expandTwo(this.rules[0], 0, 0, 0) + '$', 'gm')

      this.solutions.partTwo = this.input.filter(m => m.match(overallRule)).length
    }
  }
}
</script>

<style>

</style>
