<template>
  <Day :day="4" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
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
      const rooms = input.map(i => {
        // Parse the input
        const index = i.lastIndexOf('-')
        const letters = i.substring(0, index)
        const second = i.substring(index + 1, i.length)

        const [sector, checksum] = second.replaceAll(']', '').split('[')

        // Return the original letter sequence, the split letters without dashes, the sector and the checksum
        return {
          original: letters.split(''),
          letters: letters.replaceAll('-', '').split(''),
          sector: +sector,
          checksum: checksum
        }
      })

      const correctRooms = rooms.filter(r => {
        // Get the letter counts
        const counts = {}
        r.letters.forEach(l => {
          if (!counts[l]) {
            counts[l] = 0
          }
          counts[l]++
        })

        // Generate the checksum by sorting
        const checksum = Object.keys(counts).sort((a, b) => {
          if (counts[a] === counts[b]) {
            return a.localeCompare(b)
          } else {
            return counts[b] - counts[a]
          }
        }).join('').substring(0, 5)

        // Compare checksums
        return checksum === r.checksum
      })

      // Solution part one is the sum of sector ids from correct rooms
      this.solutions.partOne = correctRooms.map(r => r.sector).reduce((a, b) => a + b, 0)
      // Solution part two is the sector id of the room that after caesar shift by sector id contains the word 'northpole'
      this.solutions.partTwo = correctRooms.filter(r => this.shiftLetters(r.original, r.sector).join('').indexOf('northpole') !== -1)[0].sector
    },
    shiftLetters: function (arr, shift) {
      // Map each letter using caesar shify by the room sector.
      // We're only using lowercase letters, so use 97 from the ASCII table as the base
      return arr.map(a => String.fromCharCode(((a.charCodeAt() - 97 + shift) % 26) + 97))
    }
  }
}
</script>

<style scoped>
</style>
