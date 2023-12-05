<template>
  <Day :day="24" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      neighbors: [[1, 0], [-1, 0], [1, -1], [0, -1], [0, 1], [-1, 1]],
      directions: {
        e: pos => {
          pos[0]++
        },
        se: pos => {
          pos[1]++
        },
        sw: pos => {
          pos[0]--
          pos[1]++
        },
        w: pos => {
          pos[0]--
        },
        nw: pos => {
          pos[1]--
        },
        ne: pos => {
          pos[0]++
          pos[1]--
        }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // For each line in the input
      this.tiles = input.map(line => {
        const parsed = []
        // Keep parsing directions
        while (true) {
          // Get the direction that matches the first letters
          const directions = Object.keys(this.directions).filter(d => line.indexOf(d) === 0)
          // If there isn't one, return the parsed result
          if (!directions || directions.length < 1) {
            return parsed
          }
          // Else, add it to the array
          parsed.push(directions[0])
          // And remove it from the start of the string
          line = line.replace(directions[0], '')
        }
      })
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.blackTiles = new Set()

      this.tiles.forEach(t => {
        // Start at the origin
        const pos = [0, 0]
        // For each direction
        t.forEach(d => {
          // Adjust the position
          this.directions[d](pos)
        })
        // Produce the key
        const stringified = `${pos[0]},${pos[1]}`
        // If it's alive, flip it to dead. Otherwise, set it to alive
        if (this.blackTiles.has(stringified)) {
          this.blackTiles.delete(stringified)
        } else {
          this.blackTiles.add(stringified)
        }
      })

      // Count the number of black (alive) tiles
      this.solutions.partOne = this.blackTiles.size
    },
    solvePartTwo: function () {
      // For each of the 100 days
      for (let day = 0; day < 100; day++) {
        // Run one iteration
        this.blackTiles = this.iterate()
      }

      // Count the number of alive cells
      this.solutions.partTwo = this.blackTiles.size
    },
    iterate: function () {
      const tempTiles = new Set()

      // Split each tile into x and y
      const split = [...this.blackTiles].map(t => t.split(',').map(i => +i))
      // Find min and max per dimension
      const minX = Math.min(...split.map(t => t[0]))
      const maxX = Math.max(...split.map(t => t[0]))
      const minY = Math.min(...split.map(t => t[1]))
      const maxY = Math.max(...split.map(t => t[1]))

      // Check the grid from min-1 to max+1 in each dimension
      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
          const stringified = `${x},${y}`

          // Filter the neighbors to those that are alive/black
          const activeNeighbors = this.neighbors.filter(n => {
            // Adjust the position
            const np = stringified.split(',').map((v, i) => +v + n[i])
            // Calculate the new key
            const nk = `${np[0]},${np[1]}`

            return this.blackTiles.has(nk)
          }).length

          // Check if this one is alive
          const alive = this.blackTiles.has(stringified)

          if (alive && (activeNeighbors === 1 || activeNeighbors === 2)) {
            // If we're currently alive, stay alive if we have 1 or 2 active neighbors
            tempTiles.add(stringified)
          } else if (!alive && activeNeighbors === 2) {
            // If we aren't alive, become alive if we have two active neighbors
            tempTiles.add(stringified)
          }
        }
      }

      return tempTiles
    }
  }
}
</script>

<style>

</style>
