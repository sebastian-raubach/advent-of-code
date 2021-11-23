<template>
  <Day :day="10" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      const list = Array.from(Array(256).keys())
      // Split into numbers separated by commas for part one
      const lengths = input[0].split(',').map(l => +l.trim())
      // Split into individual characters, map to ASCII, then add the five extra numbers
      const bitLenths = input[0].split('').map(l => l.charCodeAt(0)).concat([17, 31, 73, 47, 23])

      this.solutions.partOne = this.solvePartOne(list.concat(), lengths.concat())
      this.solutions.partTwo = this.solvePartTwo(list.concat(), bitLenths.concat())
    },
    solvePartOne: function (list, lengths) {
      let startIndex = 0
      let skipSize = 0

      // For each length
      lengths.forEach(l => {
        // Invert the section
        this.invert(list, startIndex, l)
        // Adjust the start index
        startIndex += l + skipSize
        // Increase the skip size
        skipSize++
      })

      // Result is first and second entry multiplied
      return list[0] * list[1]
    },
    solvePartTwo: function (list, lengths) {
      let startIndex = 0
      let skipSize = 0

      // Run it 64 times
      for (let round = 0; round < 64; round++) {
        lengths.forEach(l => {
          this.invert(list, startIndex, l)
          startIndex += l + skipSize
          skipSize++
        })
      }

      // XOR 16 blocks of 16 numbers together
      const xors = []
      for (let i = 0; i < list.length; i = i + 16) {
        let value = list[i]

        for (let j = 1; j < 16; j++) {
          value = value ^ list[i + j]
        }

        xors.push(value)
      }

      // The result is each part converted to hexadecimal, the concatenated together
      return xors.map(x => {
        let s = x.toString(16)
        // Make sure every part is 2 letters long
        if (s.length < 2) {
          s = `0${s}`
        }
        return s
      }).reduce((a, b) => `${a}${b}`, '')
    },
    invert: function (list, start, length) {
      // Take a copy of the original
      const listCopy = list.concat()
      // Get the start index (mind the modulo)
      start = start % list.length

      // Then iterate forwards
      for (let i = 0; i < length; i++) {
        // And set the index (including modulo) to the inverted bit (including modulo)
        list[(start + i) % list.length] = listCopy[(start + length - i - 1) % list.length]
      }
    }
  }
}
</script>

<style>

</style>
