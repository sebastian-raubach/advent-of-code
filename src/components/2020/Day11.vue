<template>
  <Day :day="11" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
<pre class="day-10-code border"><code v-html="finalSeating.partOne"></code></pre>
    </template>
    <template v-slot:partTwo>
<pre class="day-10-code border"><code v-html="finalSeating.partTwo"></code></pre>
    </template>
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
      },
      finalSeating: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const grid = input.map(i => {
        return i.split('').map(c => c === 'L' ? false : null)
      })

      this.solvePartOne(grid)
      this.solvePartTwo(grid)
    },
    solvePartOne: function (grid) {
      const partOne = this.solve(grid, 4, (grid, row, col, n) => {
        // Get the neighbor row
        const neighborRow = grid[row + n[1]]
        // If it's invalid (outside of the grid), return false
        if (neighborRow === undefined) {
          return false
        }
        // Return true if the neighbor is occupied
        return neighborRow[col + n[0]] === true
      })
      this.solutions.partOne = partOne.count
      this.finalSeating.partOne = partOne.gridSolution
    },
    /**
     * Solves the given seat occupation grid using the given allowed neighbors and the neighborhandler used to get the number of neighbors for a seat
     * @param grid The task input
     * @param allowedNeighbors The number of allowed neighbors per seat before the state switches
     * @param neighborHandler The task part specific handler to determine the number of visible neighbors for a given seat
     * @returns An object of the form: `{ count, gridSolution }` where `count` is the number of occupied seats and `gridSolution` is a formatted representation of the final grid.
     */
    solve: function (grid, allowedNeighbors, neighborHandler) {
      let changeCount = 1
      let occupiedCount = 0
      // List all neighboring cells
      const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

      // While something changed, go on
      while (changeCount > 0) {
        // Reset change count and occupied count
        changeCount = 0
        occupiedCount = 0
        // Take a copy of the grid, because we don't want to make live changes
        const tempGrid = JSON.parse(JSON.stringify(grid))

        // For each row and cell
        for (let row = 0; row < grid.length; row++) {
          for (let col = 0; col < grid[row].length; col++) {
            // Get the current grid cell
            const current = grid[row][col]

            // Only consider seats
            if (current !== null) {
              // Iterate all neighbors and filter only the full seats
              const neighborCount = neighbors.filter(n => neighborHandler(grid, row, col, n)).length

              if (current === true && neighborCount >= allowedNeighbors) {
                // If the current seat is occupied and at least `allowedNeighbors` neighbors are, set it to unoccupied
                changeCount++
                tempGrid[row][col] = false
              } else if (current === false && neighborCount === 0) {
                // If the current seat isn't occupied and there are no neighbors, it is now
                changeCount++
                tempGrid[row][col] = true
              }

              // Increase the count if required
              occupiedCount += tempGrid[row][col] === true ? 1 : 0
            }
          }
        }

        grid = tempGrid
      }

      return {
        count: occupiedCount,
        gridSolution: this.getGridPrinted(grid)
      }
    },
    solvePartTwo: function (grid) {
      const maxDim = Math.max(grid.length, grid[0].length)
      const partTwo = this.solve(grid, 5, (grid, row, col, n) => {
        // Walk into the direction to check all visible neighbors
        for (let times = 1; times < maxDim; times++) {
          // Get the neighbor row
          const neighborRow = grid[row + n[1] * times]
          // If it's invalid (outside of the grid), return false
          if (neighborRow === undefined) {
            return false
          }
          // Get the neighborig cell
          const neighbor = neighborRow[col + n[0] * times]

          // If it's invalid (outside of the grid), return false
          if (neighbor === undefined) {
            return false
          }
          // Else, if it's a seat, return its value
          if (neighbor !== null) {
            return neighbor
          }
        }
        // If no neighbor is found, return false
        return false
      })
      this.solutions.partTwo = partTwo.count
      this.finalSeating.partTwo = partTwo.gridSolution
    },
    getGridPrinted: function (grid) {
      return grid.map(r => r.map(c => c === true ? '<span class="day-10-seat-full">#</span>' : (c === false ? '<span class="day-10-seat-empty">L</span>' : '.')).join('')).join('<br/>')
    }
  }
}
</script>

<style>
.day-10-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 300px;
}
.day-10-seat-full {
  background-color: #2ecc71;
  color: #2c3e50;
}
.day-10-seat-empty {
  background-color: #ecf0f1;
  color: #2c3e50;
}
</style>
