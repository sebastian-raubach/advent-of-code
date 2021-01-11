<template>
  <Day :day="12" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      this.startGrid = input[0].split(': ')[1].split('').map(c => c === '#')
      input.shift()
      input.shift()
      this.rules = input.map(r => {
        const parts = r.split(' => ')
        const positions = parts[0].split('').map(c => c === '#')
        const result = parts[1] === '#'

        return {
          positions,
          result
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solve: function (generations) {
      let startIndex = 0

      // Take a copy as the previous grid
      let prevGrid = this.startGrid.concat()
      // For each generation
      for (let gen = 1; gen <= generations; gen++) {
        // Take a copy to store the new values
        const tempGrid = prevGrid.concat()
        // Pad them with '.'/false if necessary
        while (tempGrid.indexOf(true) < 5) {
          // Adjust the start index so we know where the original 0 index is
          startIndex++
          tempGrid.unshift(false)
        }
        while (tempGrid.lastIndexOf(true) > tempGrid.length - 6) {
          tempGrid.push(false)
        }

        // Store the result
        const targetGrid = tempGrid.concat()

        // Go through all positions
        for (let pos = 2; pos < tempGrid.length - 3; pos++) {
          // Get the important positions
          const [ll, l, c, r, rr] = tempGrid.slice(pos - 2, pos + 3)
          // Find the rule that matches
          const newValue = this.rules.filter(rule => rule.positions[0] === ll && rule.positions[1] === l && rule.positions[2] === c && rule.positions[3] === r && rule.positions[4] === rr).map(r => r.result)[0]

          if (newValue === undefined || newValue === false) {
            // If there is no matching rule (example) or the the rule says it should be dead, set to false
            targetGrid[pos] = false
          } else {
            // Otherwise, use the new value
            targetGrid[pos] = newValue
          }
        }

        // Store for next iteration
        prevGrid = targetGrid.concat()
      }

      // Sum up indices
      let sum = 0
      for (let i = 0; i < prevGrid.length; i++) {
        const index = i - startIndex
        if (prevGrid[i]) {
          sum += index
        }
      }

      return sum
    },
    solvePartOne: function () {
      this.solutions.partOne = this.solve(20)
    },
    solvePartTwo: function () {
      // For part 2 I ran the first few hundred generations to see if there's any pattern.
      // After about 200 I noticed that the difference between two generations is constant.
      // We can exploit this by searching for this repeat and then calculating the total by
      // Using the last result before the repeat and then adding the diff times the number
      // Of remaining iterations to it.

      // Keep track of all the diffs between runs
      const diffs = []
      // Start at 1 generation
      let gen = 1
      // Track the result of the previous generation
      let prev = 0
      // While there aren't yet 10 entries in the diffs OR they aren't all the same
      while (diffs.length < 10 || diffs.some(d => d !== diffs[0])) {
        // Solve for the next generation
        const curr = this.solve(gen++)
        // Store the diff
        diffs.push(curr - prev)
        // Remember previous result
        prev = curr

        // Only keep the last 10 diffs
        if (diffs.length > 10) {
          diffs.shift()
        }
      }

      // At this point the last ten diffs were the same, meaning we reached a point where the increase is identical in each run
      // Therefore, calculate the result as the remaining gems times the diff + the last result before the diff repeat
      this.solutions.partTwo = (50000000000 - gen + 11) * diffs[0] + this.solve(gen - 11)
    }
  }
}
</script>

<style>

</style>
