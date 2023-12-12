<template>
  <Day :day="11" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      const grid = input.map(i => i.split(''))

      // Parse all the galaxies
      const points = []
      grid.forEach((row, ri) => {
        row.forEach((col, ci) => {
          if (col === '#') {
            points.push({ x: ci, y: ri })
          }
        })
      })

      // Get all the extension points for rows and columns
      const extensions = this.getExtensionPoints(grid)

      // Solve both parts by adjusting the points by extension factors
      this.solutions.partOne = this.solve(points, extensions, 1)
      this.solutions.partTwo = this.solve(points, extensions, 999_999)
    },
    solve: function (points, extensions, factor) {
      // Adjust the points by the factor extension
      const adjusted = JSON.parse(JSON.stringify(points))
      adjusted.forEach(p => {
        const dx = extensions.cols.filter(c => c < p.x).length
        const dy = extensions.rows.filter(r => r < p.y).length

        p.x += dx * factor
        p.y += dy * factor
      })

      // Calculate the manhattan distance between all pairs of points, then sum up
      let result = 0
      for (let a = 0; a < adjusted.length; a++) {
        for (let b = a + 1; b < adjusted.length; b++) {
          result += Math.abs(adjusted[a].x - adjusted[b].x) + Math.abs(adjusted[a].y - adjusted[b].y)
        }
      }
      return result
    },
    getExtensionPoints: function (grid) {
      // Remember the columns and rows that need to be extended
      const result = {
        rows: [],
        cols: []
      }

      for (let row = 0; row < grid.length; row++) {
        // Check if the row is empty
        if (grid[row].every(c => c === '.')) {
          result.rows.push(row)
        }
      }
      for (let col = 0; col < grid[0].length; col++) {
        // Check if the column is empty
        let allDot = true
        for (let row = 0; row < grid.length; row++) {
          if (grid[row][col] !== '.') {
            allDot = false
            break
          }
        }

        if (allDot) {
          result.cols.push(col)
        }
      }

      return result
    }
  }
}
</script>

<style>
</style>
