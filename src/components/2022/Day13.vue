<template>
  <Day :day="13" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'

const CONTINUE = 0
const RIGHT = 1
const WRONG = 2

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
      // Keep track of the left and right inputs
      const left = []
      const right = []

      for (let i = 1; i < input.length; i += 3) {
        // Parse them using JSON.parse() into JSON
        left.push(JSON.parse(input[i - 1]))
        right.push(JSON.parse(input[i]))
      }

      // Sum up the indices
      let sum = 0
      for (let i = 0; i < left.length; i++) {
        // Check whether they are in order
        const result = this.check(left[i], right[i])

        if (result === RIGHT) {
          // If so, add the index
          sum += i + 1
        }
      }

      // Solution for part one is the sum
      this.solutions.partOne = sum

      // Now concatenate all packets together and add the two dividers
      const allPackets = left.concat(right).concat([[[2]], [[6]]])

      // Then sort the packets using our implementation and map them to their string representation
      const mapped = allPackets.sort((a, b) => this.check(a, b) === RIGHT ? -1 : 1).map(p => JSON.stringify(p))

      // Now search for the divider packets and multiply their indices together
      this.solutions.partTwo = (mapped.indexOf('[[2]]') + 1) * (mapped.indexOf('[[6]]') + 1)
    },
    check: function (left, right) {
      // Check for both whether they are arrays
      const lIsArray = Array.isArray(left)
      const rIsArray = Array.isArray(right)

      if (left === undefined) {
        // If the left is undefined, this means that the containing array ran out of items, it's in the right order
        return RIGHT
      } else if (right === undefined) {
        // If the right is undefined, the containing array ran out of items, it's in the wrong order
        return WRONG
      }

      if (!lIsArray && !rIsArray) {
        // If both aren't arrays => they're numbers
        if (left === right) {
          // Same number, keep looking
          return CONTINUE
        } else {
          // Left number is smaller than right
          return left < right ? RIGHT : WRONG
        }
      } else if (lIsArray && rIsArray) {
        // If both are arrays, iterate through them
        const max = Math.max(left.length, right.length)
        for (let i = 0; i < max; i++) {
          // For each pair, check them recursively
          const result = this.check(left[i], right[i])

          if (result !== CONTINUE) {
            // We found a result (either RIGHT or WRONG), therefore, return it
            return result
          }
        }

        // If we didn't find a result, tell the recursion source to keep looking
        return CONTINUE
      } else if (!lIsArray && rIsArray) {
        // If the left isn't an array, make it one
        return this.check([left], right)
      } else if (lIsArray && !rIsArray) {
        // If the right isn't an array, make it one
        return this.check(left, [right])
      }
    }
  }
}
</script>

<style>
</style>
