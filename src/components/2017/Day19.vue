<template>
  <Day :day="19" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      directions: {
        s: (pos) => pos.y++,
        w: (pos) => pos.x--,
        n: (pos) => pos.y--,
        e: (pos) => pos.x++
      },
      opposites: {
        s: 'n',
        w: 'e',
        n: 's',
        e: 'w'
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the grid
      const grid = input.map(r => r.split(''))

      // Current position
      const current = {
        x: grid[0].indexOf('|'),
        y: 0,
        direction: 's'
      }

      // Remember the letters
      const letters = []

      // Count the steps
      let stepCounter = 0
      while (true) {
        stepCounter++
        // Move
        this.directions[current.direction](current)

        // Get the next cell
        const cell = grid[current.y][current.x]

        // If we ended up in empty space, then this is the end
        if (cell === ' ') {
          this.solutions.partOne = letters.join('')
          this.solutions.partTwo = stepCounter
          return
        }

        if (cell.match(/[a-zA-Z]/i)) {
          // If it's a letter
          letters.push(cell)
        } else if (cell === '+') {
          // If it's a corner, change direction
          current.direction = this.adjustDirection(current, grid)

          // We found a solution if there's nowhere to turn
          if (current.direction === null) {
            this.solutions.partOne = letters.join('')
            this.solutions.partTwo = stepCounter
            return
          }
        }
      }
    },
    adjustDirection: function (pos, grid) {
      const neighbors = Object.keys(this.directions)
                              .filter(d => d !== this.opposites[pos.direction]) // Use all directions except where we came from
                              .map(d => {
                                // Get the coordinates in those directions
                                const np = { x: pos.x, y: pos.y, direction: d }
                                this.directions[d](np)
                                return np
                              })
                              .filter(n => {
                                // Only keep valid coordinates
                                if (n.y > grid.length - 1 || n.y < 0 || n.x < 0 || n.x > grid[n.y].length) {
                                  return false
                                }
                                // And only those that aren't empty space
                                return grid[n.y][n.x] !== ' '
                              })

      // Return the first neighbor if found
      if (neighbors.length > 0) {
        return neighbors[0].direction
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
</style>
