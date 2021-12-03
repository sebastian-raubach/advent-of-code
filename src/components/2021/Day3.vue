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

      // Get the bit count per position
      const bitCount = this.getBitCount(bits)
      // Calculate gamma and epsilon
      const gamma = parseInt(bitCount.map(b => Math.floor(b / (bits.length / 2))).join(''), 2)
      const epsilon = parseInt(bitCount.map(b => 1 - Math.floor(b / (bits.length / 2))).join(''), 2)

      // Get the product for solution part one
      this.solutions.partOne = gamma * epsilon

      // Take a copy of the array for each
      let oxygen = bits.concat()
      let co2 = bits.concat()

      for (let i = 0; i < bits[0].length; i++) {
        const oxBc = this.getBitCount(oxygen)
        const coBc = this.getBitCount(co2)

        // Calculate mcb and lcb for oxygen and co2 respectively for the now limited set of binary numbers
        const mcb = Math.floor(oxBc[i] / (oxygen.length / 2))
        const lcb = 1 - Math.floor(coBc[i] / (co2.length / 2))

        if (oxygen.length > 1) {
          // Filter out the ones we don't want
          oxygen = this.filter(oxygen, mcb, i)
        }
        if (co2.length > 1) {
          // Filter out the ones we don't want
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
