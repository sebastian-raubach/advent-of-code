<template>
  <Day :day="14" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-14.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      memory: {},
      input: [],
      masks: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Initialize everything
      this.memory = {}
      this.input = []
      this.masks = []
      // Loop through input
      input.forEach(i => {
        if (i.indexOf('mask') !== -1) {
          // If it's a mask, parse it
          this.masks.push(i.replace('mask = ', '').split(''))
        } else {
          // Otherwise, split on the equals
          const parts = i.split(' = ')
          // Get the memory index
          const index = +parts[0].replace(/\D/g, '')
          // And get the binary representation of the value
          const value = this.decimalToBinary(+parts[1], 36)
          // Then push the configuration to an array
          this.input.push({
            index: index,
            mask: this.masks[this.masks.length - 1],
            value: value
          })
        }
      })

      this.solvePartOne()

      // Reset the memory
      this.memory = {}
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.input.forEach(i => {
        // Set the memory at the given index to the corrected input
        this.memory[i.index] = parseInt(this.overwriteBits(i.value, i.mask), 2)
      })

      // Sum over all set memory addresses
      this.solutions.partOne = Object.keys(this.memory).map(k => this.memory[k]).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Loop over the input
      this.input.forEach(i => {
        // Convert the index to binary representation
        const addressBits = this.decimalToBinary(i.index, 36).split('')
        const mask = i.mask

        // First replace all mask 1's
        for (let x = 0; x < mask.length; x++) {
          if (mask[x] === '1') {
            addressBits[x] = '1'
          }
        }

        // Keep track of all final addresses
        const finalAddresses = []
        // Get the number of Xs in the mask
        const numberOfXs = mask.filter(x => x === 'X').length

        // Loop through all 2^#Xs combinations
        for (let x = 0; x < Math.pow(2, numberOfXs); x++) {
          // Convert the number to a binary
          // This gives for #X = 2
          // 00, 01, 10, 11
          // For #X = 3 this results in
          // 000, 001, 010, 011, 100, 101, 110, 111
          // We then use these bits from right to left to fill the Xs in the address
          const bin = this.decimalToBinary(x, numberOfXs)

          // Copy the current address
          const copy = JSON.parse(JSON.stringify(addressBits))

          // Walk through the current address from the right, replacing the positions where the mask has an X with the binary representation of the current loop
          let position = 0
          for (let y = addressBits.length - 1; y >= 0; y--) {
            if (mask[y] === 'X') {
              copy[y] = bin[bin.length - 1 - position]
              position++
            }
          }

          // Push the address index
          finalAddresses.push(parseInt(copy.join(''), 2))
        }

        // Replace all memory indices with the value
        finalAddresses.forEach(f => {
          this.memory[f] = parseInt(i.value, 2)
        })
      })

      // Sum over all set memory addresses
      this.solutions.partTwo = Object.keys(this.memory).map(k => this.memory[k]).reduce((a, b) => a + b)
    },
    /**
     * Converts the given decimal to its binary reprentation enforcing a length of at least `length`
     * @param dec The decimal number to convert
     * @param length The minimal length of the binary string representation
     * @returns The binary string representation of the decimal input with at least the specified length
     */
    decimalToBinary: function (dec, length) {
      let result = (dec >>> 0).toString(2)
      while (result.length < length) {
        result = '0' + result
      }

      return result
    },
    /**
     * Overwrites the positions in the input with the mask bits skipping `X` positions
     * @param input The input to replace on
     * @param mask The mask to replace with
     * @returns The replaced input
     */
    overwriteBits: function (input, mask) {
      return input.split('').map((bit, index) => mask[index] === 'X' ? bit : mask[index]).join('')
    }
  }
}
</script>

<style>

</style>
