<template>
  <Day :day="4" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      this.solutions = {
        partOne: null,
        partTwo: null
      }
      const numbers = input[0].split(',').map(i => +i)

      const grids = []
      let current = []

      // Parse the grids
      for (let i = 2; i < input.length; i++) {
        if (input[i].length < 1) {
          grids.push(current)
          current = []
        } else {
          current.push(input[i].trim().split(/\s+/).map(n => {
            return {
              n: +n,
              m: false
            }
          }))
        }
      }

      grids.push(current)

      // Remember which grids are complete
      const gridsComplete = grids.map(_ => false)

      for (let i = 0; i < numbers.length; i++) {
        // Mark the numbers and get back the sum of non-marked values or `undefined` if not complete
        const complete = this.markNumber(grids, numbers[i])
        // Check if any of them are actually complete
        const anyComplete = complete.filter(g => g)

        if (anyComplete.length > 0 && !this.solutions.partOne) {
          // If at least one is complete and we've not found solution 1 yet, this is it
          this.solutions.partOne = anyComplete[0] * numbers[i]
          // Mark as complete
          gridsComplete[complete.indexOf(anyComplete[0])] = true
        } else {
          // Otherwise, check if all are now complete
          let allComplete = true
          // Get the index of the last one
          let lastIndex = -1
          for (let g = 0; g < grids.length; g++) {
            // Check if this one is also complete
            allComplete &= complete[g] !== undefined
            // If it wasn't complete before, but it is now
            if (!gridsComplete[g] && complete[g]) {
              // Remember the index
              lastIndex = g
              // Mark as complete
              gridsComplete[g] = true
            }
          }

          // If all are complete after this iteration, we found our solution 2
          if (allComplete) {
            this.solutions.partTwo = complete[lastIndex] * numbers[i]
            break
          }
        }
      }
    },
    markNumber: function (grids, number) {
      return grids.map(g => {
        g.forEach(r => {
          r.forEach(n => {
            // Change the marked state
            n.m |= n.n === number
          })
        })

        return this.isComplete(g)
      })
    },
    isComplete: function (grid) {
      // Check if any row or column is complete
      const rowComplete = grid.filter(r => r.filter(r => r.m).length === r.length).length > 0
      const colComplete = grid[0].filter((c, index) => grid.filter(r => r[index].m).length === grid.length).length > 0

      if (rowComplete || colComplete) {
        // Calculate the sum of all non-marked items
        return grid.reduce((prev, row) => prev + row.map(c => c.m ? 0 : c.n).reduce((a, b) => a + b), 0)
      } else {
        return undefined
      }
    }
  }
}
</script>

<style>

</style>
