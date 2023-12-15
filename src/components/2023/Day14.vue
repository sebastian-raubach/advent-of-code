<template>
  <Day :day="14" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
    rotateLeft: function (array) {
      const result = []
      array.forEach((a, i) => {
        a.forEach((b, j, bb) => {
          result[bb.length - j - 1] = result[bb.length - j - 1] || []
          result[bb.length - j - 1][i] = b
        })
      })
      return result
    },
    rotateRight: function (array) {
      const result = []
      array.forEach((a, i, aa) => {
        a.forEach((b, j) => {
          result[j] = result[j] || []
          result[j][aa.length - i - 1] = b
        })
      })
      return result
    },
    onInputChanged: function (input) {
      // Parse grid
      this.grid = input.map(i => i.split(''))
      // Rotate to the left
      let northLeft = this.rotateLeft(this.grid)
      // Tilt by splitting, sorting and joining
      northLeft = this.tilt(northLeft)
      // Rotate back
      this.grid = this.rotateRight(northLeft)
      // Calculate result
      const height = this.grid.length
      this.solutions.partOne = this.grid.map((row, y) => row.map((c, x) => c === 'O' ? height - y : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

      // Read grid again
      this.grid = input.map(i => i.split(''))
      let cache = {}
      const spinCycles = 1_000_000_000
      let cycle = 0
      // Rotate it left twice, so that North is pointing down
      this.grid = this.rotateLeft(this.grid)
      this.grid = this.rotateLeft(this.grid)

      while (cycle < spinCycles) {
        // Take a copy
        let temp = this.grid.map(row => row.concat())
        // Rotate if four times (first rotation will make North face left so we can tilt it)
        for (let r = 0; r < 4; r++) {
          temp = this.rotateRight(temp)
          // Then tilt
          temp = this.tilt(temp)
        }
        this.grid = temp
        // Stringify for cache comparison
        const stringified = JSON.stringify(temp)
        cycle++

        if (cache[stringified]) {
          // If we've seen this configuration before
          const cycleLength = cycle - cache[stringified]
          // Advance the cycle by as many times as it fits into the cycleLength
          cycle += Math.floor((spinCycles - cycle) / cycleLength) * cycleLength
          // Then clear the cache
          cache = {}
        } else {
          // Else add to the cache
          cache[stringified] = cycle
        }
      }

      // Rotate back so that North is up again
      this.grid = this.rotateRight(this.grid)
      this.grid = this.rotateRight(this.grid)
      // Calculate result
      this.solutions.partTwo = this.grid.map((row, y) => row.map((c, x) => c === 'O' ? height - y : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
    },
    tilt: function (grid) {
      // We achieve the tilt by splitting each row on "#"s, then sorting each section which will sort "O"s before "."s, then join back together with "#"s.
      return grid.map(row => {
        const parts = row.join('').split('#')
        return parts.map(p => p.split('').sort((a, b) => b.localeCompare(a)).join('')).join('#').split('')
      })
    }
  }
}
</script>

<style>
</style>
