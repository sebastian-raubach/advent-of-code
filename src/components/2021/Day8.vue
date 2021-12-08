<template>
  <Day :day="8" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      let counter = 0
      const rows = input.map(i => {
        // Split into input and output
        const parts = i.split(' | ')
        const input = parts[0].split(' ').map(o => o.split(''))
        const output = parts[1].split(' ').map(o => o.split(''))

        // Count the ones that have length 2, 3, 4 or 7
        counter += output.filter(o => o.length === 2 || o.length === 4 || o.length === 3 || o.length === 7).length

        return {
          i: input,
          o: output
        }
      })

      // Solution for part one is just that count
      this.solutions.partOne = counter

      // Solution for part two is the sum of the output numbers after mapping
      this.solutions.partTwo = rows.map(r => {
        // For each row, create a mapping of digit (0-9) to the string representation (as an array)
        const mapping = Array.from(10).fill([])

        // Get the unique ones first
        r.i.forEach(bit => {
          if (bit.length === 2) {
            mapping[1] = bit
          } else if (bit.length === 3) {
            mapping[7] = bit
          } else if (bit.length === 4) {
            mapping[4] = bit
          } else if (bit.length === 7) {
            mapping[8] = bit
          }
        })

        // Next check the ones that have 6 bits lit
        r.i.filter(bit => bit.length === 6)
           .forEach(bit => {
          if (this.difference(mapping[1], bit).length === 1) {
            // If the overlap with digit 1 is 1, then it has to be a 6
            mapping[6] = bit
          } else if (this.difference(mapping[4], bit).length === 0) {
            // If there is a complete overlap with the digit 4, then it's a 9
            mapping[9] = bit
          } else {
            // Else it's a 0
            mapping[0] = bit
          }
        })

        // Now we need the top right "|" to differentiate between the next set
        const tr = this.difference(mapping[1], mapping[6])[0]

        // Next check the ones that have 5 bits lit
        r.i.filter(bit => bit.length === 5)
           .forEach(bit => {
          if (this.difference(mapping[1], bit).length === 0) {
            // If it completely overlaps with the 1, then it has to be a 3
            mapping[3] = bit
          } else if (bit.indexOf(tr) !== -1) {
            // If it has the top right bit, then it's a 2
            mapping[2] = bit
          } else {
            // Else, it's a 5
            mapping[5] = bit
          }
        })

        // Now we have the input mapping, translate the output by mapping, then concatenating and converting to a number
        return +r.o.map(o => {
          // For each output digit, check the mapping
          for (let i = 0; i < mapping.length; i++) {
            // Check if they have the same length and they completely overlap
            if (mapping[i].length === o.length && this.difference(mapping[i], o).length === 0) {
              // Then we found a match, return it's index (which is the same as the actual digit)
              return i
            }
          }
        }).join('')
      }).reduce((a, b) => a + b)
    },
    difference: function (a, b) {
      // The difference is those bits from a that aren't in b
      return a.filter(c => b.indexOf(c) === -1)
    }
  }
}
</script>

<style scoped>
</style>
