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
      this.memory = {}
      this.input = []
      this.masks = []
      input.forEach(i => {
        if (i.indexOf('mask') !== -1) {
          this.masks.push(i.replace('mask = ', ''))
        } else {
          const parts = i.split(' = ')
          const index = +parts[0].replace(/\D/g, '')
          const value = this.decimalToBinary(+parts[1], 36)
          this.input.push({
            index: index,
            mask: this.masks[this.masks.length - 1],
            value: value
          })
        }
      })

      this.solvePartOne()

      this.memory = {}
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.input.forEach(i => {
        this.memory[i.index] = parseInt(this.overwriteBits(i.value, i.mask), 2)
      })

      this.solutions.partOne = Object.keys(this.memory).map(k => this.memory[k]).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      this.input.forEach(i => {
        const addressBits = this.decimalToBinary(i.index, 36)
        const addressBitsSplit = addressBits.split('')
        const mask = i.mask.split('')

        // First replace all mask 1's
        for (let x = 0; x < mask.length; x++) {
          if (mask[x] === '1') {
            addressBitsSplit[x] = '1'
          }
        }

        const finalAddresses = []
        const numberOfXs = mask.filter(x => x === 'X').length

        for (let x = 0; x < Math.pow(2, numberOfXs); x++) {
          const bin = this.decimalToBinary(x, 36)

          const copy = JSON.parse(JSON.stringify(addressBitsSplit))

          let position = 0
          for (let y = addressBitsSplit.length - 1; y >= 0; y--) {
            if (mask[y] === 'X') {
              copy[y] = bin[bin.length - 1 - position]
              position++
            }
          }

          finalAddresses.push(parseInt(copy.join(''), 2))
        }

        finalAddresses.forEach(f => {
          this.memory[f] = parseInt(i.value, 2)
        })
      })

      this.solutions.partTwo = Object.keys(this.memory).map(k => this.memory[k]).reduce((a, b) => a + b)
    },
    decimalToBinary: function (dec, length) {
      let result = (dec >>> 0).toString(2)
      while (result.length < length) {
        result = '0' + result
      }

      return result
    },
    overwriteBits: function (input, mask) {
      const splitMask = mask.split('')
      return input.split('').map((bit, index) => splitMask[index] === 'X' ? bit : splitMask[index]).join('')
    }
  }
}
</script>

<style>

</style>
