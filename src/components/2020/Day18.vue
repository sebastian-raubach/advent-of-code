<template>
  <Day :day="18" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      numbers: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Remove all spaces, then split into bits
      this.lines = input.map(i => i.replace(/\s*/g, '').split(''))
      this.solvePartOne()
      this.solvePartTwo()
    },
    evaluate: function (line, part) {
      // Keep track of what's going on
      const stack = []

      // Go through the line
      for (let i = 0; i < line.length; i++) {
        // Get the current one
        const el = line[i]
        let res = el

        // If it's a number, parse it
        if (!isNaN(+el)) {
          res = +el
        }

        if (el === '(') {
          // Opening brackets mean we use recursion to solve the inner bit
          const sub = this.evaluate(line.slice(i + 1), part)
          // Remember the result
          res = sub.value
          // Adjust the index by effectively skipping the sub part
          i += sub.length + 1
        } else if (el === ')') {
          // Closing brackets mean we can evaluate the current stack
          const sub = part === 1 ? this.evaluateBitsPartOne(stack) : this.evaluateBitsPartTwo(stack)
          // Return the result
          return {
            value: sub,
            length: i
          }
        }

        // Push the current part
        stack.push(res)
      }

      // Finally, evaluate the whole stack
      const value = part === 1 ? this.evaluateBitsPartOne(stack) : this.evaluateBitsPartTwo(stack)
      // Return the result
      return {
        value: value,
        length: line.length
      }
    },
    evaluateBitsPartOne: function (stack) {
      // Process them in the order they're defined in
      for (let i = 0; i < stack.length; i++) {
        if (stack[i] === '+') {
          // If it's a plus, get previous and next, sum them up and put them back. Asjust the index.
          stack.splice(i - 1, 3, stack[i - 1] + stack[i + 1])
          i -= 1
        }
        if (stack[i] === '*') {
          // If it's a star, get previous and next, multiply them up and put them back. Asjust the index.
          stack.splice(i - 1, 3, stack[i - 1] * stack[i + 1])
          i -= 1
        }
      }

      return stack[0]
    },
    evaluateBitsPartTwo: function (stack) {
      // Additions first
      for (let i = 0; i < stack.length; i++) {
        if (stack[i] === '+') {
          // If it's a plus, get previous and next, sum them up and put them back. Asjust the index.
          stack.splice(i - 1, 3, stack[i - 1] + stack[i + 1])
          i -= 1
        }
      }

      // Then multiplications
      for (let j = 0; j < stack.length; j++) {
        if (stack[j] === '*') {
          // If it's a star, get previous and next, multiply them up and put them back. Asjust the index.
          stack.splice(j - 1, 3, stack[j - 1] * stack[j + 1])
          j -= 1
        }
      }

      return stack[0]
    },
    solvePartOne: function () {
      this.solutions.partOne = this.lines.map(l => this.evaluate(l, 1).value).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.lines.map(l => this.evaluate(l, 2).value).reduce((a, b) => a + b)
    }
  }
}
</script>

<style>

</style>
