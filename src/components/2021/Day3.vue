<template>
  <Day :day="3" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const bits = input.map(i => i.split('').map(b => +b))

      this.solvePartOne(bits)
      this.solvePartTwo(bits)
    },
    solvePartOne: function (bits) {
      // Get the bit count per position
      const bitCount = this.getBitCount(bits)
      // Calculate gamma and epsilon
      const gamma = parseInt(bitCount.map(b => Math.floor(b / (bits.length / 2))).join(''), 2)
      const epsilon = parseInt(bitCount.map(b => 1 - Math.floor(b / (bits.length / 2))).join(''), 2)

      // Get the product for solution part one
      this.solutions.partOne = gamma * epsilon
    },
    solvePartTwo: function (bits) {
      // Take a copy of the array for each
      let oxygen = bits.concat()
      let co2 = bits.concat()

      // Iterate over all positions
      for (let i = 0; i < bits[0].length; i++) {
        if (oxygen.length > 1) {
          // Calculate the bit count for oxygen
          const oxBc = this.getBitCount(oxygen)
          // Calculate the most common bit at this position
          const mcb = Math.floor(oxBc[i] / (oxygen.length / 2))
          // Filter so we only keep the ones we want
          oxygen = this.filter(oxygen, mcb, i)
        }
        if (co2.length > 1) {
          // Calculate the bit count for co2
          const coBc = this.getBitCount(co2)
          // Calculate the least common bit at this position
          const lcb = 1 - Math.floor(coBc[i] / (co2.length / 2))
          // Filter so we only keep the ones we want
          co2 = this.filter(co2, lcb, i)
        }
      }

      this.solutions.partTwo = parseInt(oxygen[0].join(''), 2) * parseInt(co2[0].join(''), 2)
    },
    filter: function (arr, comp, i) {
      // Remember the indices to delete
      const toDelete = []
      arr.forEach((o, index) => {
        // Remove it if it's not the bit we want
        if (o[i] !== comp) {
          toDelete.push(index)
        }
      })
      // If we are about to delete them all, remove the last one so we keep at least one
      if (toDelete.length === arr.length) {
        toDelete.pop()
      }
      // Filter out the ones we no longer want
      return arr.filter((o, index) => toDelete.indexOf(index) === -1)
    },
    getBitCount: function (arrs) {
      // Reduce the arrays to a single array with the count of 1 bits per dimension
      return arrs.reduce((a, b) => a.map((v, i) => v + b[i]), new Array(arrs[0].length).fill(0))
    }
  }
}
</script>

<style>

</style>
