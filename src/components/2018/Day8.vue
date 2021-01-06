<template>
  <Day :day="8" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split into numbers and parse
      this.numbersOne = input[0].split(' ').map(c => +c)
      this.numbersTwo = this.numbersOne.concat()

      this.solvePartOne()
      this.solvePartTwo()
    },
    parseNodesOne: function () {
      // Get child and meta count
      const childCount = this.numbersOne.shift()
      const metaCount = this.numbersOne.shift()

      // Sum over all children
      let sum = 0
      for (let child = 0; child < childCount; child++) {
        // Get their sums
        sum += this.parseNodesOne()
      }

      // Add the meta entries for this node
      for (let meta = 0; meta < metaCount; meta++) {
        sum += this.numbersOne.shift()
      }

      return sum
    },
    parseNodesTwo: function () {
      // Get child and meta count
      const childCount = this.numbersTwo.shift()
      const metaCount = this.numbersTwo.shift()

      // Sum up
      let sum = 0
      if (childCount > 0) {
        // If there are children, get their sums
        const children = []
        for (let child = 0; child < childCount; child++) {
          children.push(this.parseNodesTwo())
        }
        // Get the meta numbers
        const meta = []
        for (let i = 0; i < metaCount; i++) {
          meta.push(this.numbersTwo.shift())
        }

        // Use the numbers as indices and sum the values up
        meta.forEach(c => {
          const index = c - 1
          if (index >= 0 && index < children.length) {
            sum += children[index]
          }
        })
      } else {
        // Otherwise, just sum up the meta entries
        for (let m = 0; m < metaCount; m++) {
          sum += this.numbersTwo.shift()
        }
      }

      return sum
    },
    solvePartOne: function () {
      this.solutions.partOne = this.parseNodesOne()
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.parseNodesTwo()
    }
  }
}
</script>

<style>

</style>
