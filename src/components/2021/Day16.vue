<template>
  <Day :day="16" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const binary = []

      // Convert the input into a binary array. First, convert hex to binary. Then pad to 4 digits, then push onto the array
      input[0].split('').forEach(c => parseInt(c, 16).toString(2).padStart(4, '0').split('').forEach(b => binary.push(b)))

      // Calculate the tree structure
      const root = this.parsePacket(binary)

      // Part one is the sum of version numbers
      this.solutions.partOne = this.sumVersions(root)
      // Part two is the total value based on the type id
      this.solutions.partTwo = this.getTotal(root)
    },
    sumVersions: function (node) {
      // Recursively calculate the version number sum as the sum of this version plus the sum of child versions
      return node.version + node.packets.map(p => this.sumVersions(p)).reduce((a, b) => a + b, 0)
    },
    getTotal: function (node) {
      // Calculate the total for each child packet
      const subTotals = node.packets.map(p => this.getTotal(p))
      // Then reduce them together using the rules
      switch (node.typeId) {
        case 0:
          return subTotals.reduce((a, b) => a + b, 0)
        case 1:
          return subTotals.reduce((a, b) => a * b, 1)
        case 2:
          return Math.min(...subTotals)
        case 3:
          return Math.max(...subTotals)
        case 4:
          return node.value
        case 5:
          return subTotals[0] > subTotals[1] ? 1 : 0
        case 6:
          return subTotals[0] < subTotals[1] ? 1 : 0
        case 7:
          return subTotals[0] === subTotals[1] ? 1 : 0
        default:
          return 0
      }
    },
    parsePacket: function (binary) {
      // Create a new packet
      const packet = {
        version: parseInt(parseInt(binary.slice(0, 3).join(''), 2).toString(10)),
        typeId: parseInt(parseInt(binary.slice(3, 6).join(''), 2).toString(10)),
        packets: [],
        endIndex: 0,
        value: 0
      }

      switch (packet.typeId) {
        case 4: {
          // Literal packet
          // Get the data part of the binary string
          const num = binary.slice(6, binary.length)
          // Check how many full parts there are in total
          const parts = Math.floor(num.length / 5)
          // Keep track of the digits
          let digits = ''
          // Run through each chunk
          let index = 0
          for (; index < parts * 5; index += 5) {
            // Get the digit
            digits += num.slice(index + 1, index + 5).join('')

            // If the first bit was a zero, stop
            if (num[index] === '0') {
              break
            }
          }

          // The value us the decimal of the binary
          packet.value = parseInt(parseInt(digits, 2).toString(10))

          // Set the end index
          packet.endIndex = 6 + index + 5

          break
        }
        default: {
          // Operator
          // Check if it's a length or a count specification
          const isLength = parseInt(binary[6]) === 0

          if (isLength) {
            // Get the length of the bit array
            const len = parseInt(parseInt(binary.slice(7, 7 + 15).join(''), 2).toString(10))
            let index = 0
            // While we haven't reaached the end yet
            while (index < len) {
              // Parse the child packet
              const subPacket = this.parsePacket(binary.slice(22 + index, 22 + len))

              // Remember it
              packet.packets.push(subPacket)

              // Adjust the index
              index += subPacket.endIndex
            }

            // Remember the end index of THIS packet
            packet.endIndex = 22 + index
          } else {
            // Get the number of child packets
            const number = parseInt(parseInt(binary.slice(7, 7 + 11).join(''), 2).toString(10))
            let index = 0
            // Iterate through them
            for (let p = 0; p < number; p++) {
              const subPacket = this.parsePacket(binary.slice(18 + length + index, binary.length))

              // Remember it
              packet.packets.push(subPacket)

              // Adjust the index
              index += subPacket.endIndex
            }

            // Remember the end index of THIS packet
            packet.endIndex = 18 + index
          }

          break
        }
      }

      return packet
    }
  }
}
</script>

<style>
</style>
