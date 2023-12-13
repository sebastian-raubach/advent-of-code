<template>
  <Day :day="13" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { transpose } from '@/util/math'

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
      const grids = []
      // Cache the rows of each grid
      let cache = []

      input.forEach(i => {
        if (i === '') {
          // Push the cached rows as well as their transposed equivalents on the array
          grids.push({
            rows: cache,
            cols: transpose(cache.map(c => c.split(''))).map(r => r.join(''))
          })
          cache = []
        } else {
          cache.push(i)
        }
      })
      grids.push({
        rows: cache,
        cols: transpose(cache.map(c => c.split(''))).map(r => r.join(''))
      })

      // Remember part 1 solutions
      const memory = []

      this.solutions.partOne = grids.map(g => {
        // Check if there's a mirror in the rows
        const row = this.findMirror(g.rows)
        // Check if there's a mirror in the columns
        const col = this.findMirror(g.cols)

        // Remember for part 2
        memory.push({
          row: row,
          col: col
        })

        // Return the result
        return col + row * 100
      }).reduce((a, b) => a + b, 0)

      this.solutions.partTwo = grids.map((g, gIndex) => {
        // Split into matrix
        const matrix = g.rows.map(r => r.split(''))
        const transposed = transpose(matrix)

        // Find the row and column indices that - when swapped - result in a different mirror
        let overallCol = 0
        let overallRow = 0

        // Go through the whole matrix
        outer: for (let y = 0; y < matrix.length; y++) {
          for (let x = 0; x < matrix[y].length; x++) {
            // Toggle the cell
            const original = matrix[y][x]
            matrix[y][x] = original === '.' ? '#' : '.'
            transposed[x][y] = matrix[y][x]

            // Try and see if there's a mirror in the swapped matrix or the transposed version (ignoring the original mirror from the memory)
            const row = this.findMirror(matrix.map(r => r.join('')), memory[gIndex].row)
            const col = this.findMirror(transposed.map(r => r.join('')), memory[gIndex].col)

            // Match found
            if ((row !== 0 || col !== 0)) {
              // Remember the indices, then break out of loop
              overallRow = row
              overallCol = col
              break outer
            }

            matrix[y][x] = original
            transposed[x][y] = original
          }
        }

        // Return the result
        return overallCol + overallRow * 100
      }).reduce((a, b) => a + b, 0)
    },
    findMirror: function (grid, ignoreIndex = null) {
      // Starting from index 1
      for (let i = 1; i < grid.length; i++) {
        // Compare to i-1 and see if they're identical (and it's not an index we should ignore)
        if (grid[i - 1] === grid[i] && i !== ignoreIndex) {
          // Check it's actually a mirror by checking the neighboring indices as well
          const isMirror = this.isMirror(grid, i)

          if (isMirror) {
            // Return index of mirror
            return i
          }
        }
      }

      // Return 0 to get the correct result when calculating
      return 0
    },
    isMirror: function (grid, index) {
      // Assume it's a mirror
      let result = true
      let i = 0

      while (true) {
        if (!grid[index - i - 1] || !grid[index + i]) {
          // If we run out of the array bounds, just stop looking
          break
        }

        if (grid[index - i - 1] !== grid[index + i]) {
          // If we find a pair that doesn't match, remember and break
          result = false
          break
        }

        // Check further outside
        i++
      }

      return result
    }
  }
}
</script>

<style>
</style>
