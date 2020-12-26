<template>
  <Day :day="3" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Keep track of the grid cells and their occurances
      this.cells = new Map()
      // Keep track of the claims
      this.claims = []
      input.forEach(i => {
        // Get the claim definition
        const info = i.split(' @ ')[1].split(': ')
        // Parse the position
        const position = info[0].split(',').map(c => +c)
        // Parse the size
        const size = info[1].split('x').map(c => +c)

        // Remember the claim
        this.claims.push({
          position,
          size
        })

        // Iterate through all cells within the claim
        for (let x = position[0]; x < position[0] + size[0]; x++) {
          for (let y = position[1]; y < position[1] + size[1]; y++) {
            // Construct a key
            const key = `${x},${y}`

            if (this.cells.has(key)) {
              // If it exists, increase its count
              this.cells.set(key, this.cells.get(key) + 1)
            } else {
              // Else initialize it with 1
              this.cells.set(key, 1)
            }
          }
        }
      })
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Count the number of cells that occur more than once
      let counter = 0
      this.cells.forEach((value, key) => {
        if (value > 1) {
          counter++
        }
      })
      // Which is the solution for part one
      this.solutions.partOne = counter
    },
    solvePartTwo: function () {
      // Iterate through all claims
      for (let index = 0; index < this.claims.length; index++) {
        // Check if all cells within the claim only occur once
        let allOne = true
        const c = this.claims[index]
        // Iterate through all cells
        outer:for (let x = c.position[0]; x < c.position[0] + c.size[0]; x++) {
          for (let y = c.position[1]; y < c.position[1] + c.size[1]; y++) {
            // Construct the key
            const key = `${x},${y}`

            // Check if it occurs more than once
            if (this.cells.get(key) > 1) {
              // In which case, continue with the next claim
              allOne = false
              break outer
            }
          }
        }

        if (allOne) {
          // We found the claim that occupies a unique space
          this.solutions.partTwo = index + 1
          return
        }
      }
    }
  }
}
</script>

<style>

</style>
