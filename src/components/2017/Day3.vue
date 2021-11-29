<template>
  <Day :day="3" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      dir: {
        R: (curr) => curr.x++,
        U: (curr) => curr.y++,
        L: (curr) => curr.x--,
        D: (curr) => curr.y--
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Split each row on tab and then map the values to numbers
      const target = +input[0]
      this.solvePartOne(target)
      this.solvePartTwo(target)
    },
    solvePartOne: function (target) {
      // Get the side length at the layer where the target is
      const size = Math.ceil(Math.sqrt(target))
      // Get the radius from there
      const center = Math.ceil((size - 1) / 2)
      this.solutions.partOne = Math.max(0, center - 1 + Math.abs(center - target % size))
    },
    solvePartTwo: function (target) {
      const grid = {
        '0,0': 1
      }

      const dirs = ['R', 'U', 'L', 'D']
      let dirInd = 0
      let length = 1
      const curr = {
        x: 0,
        y: 0
      }
      while (true) {
        for (let step = 0; step < 2; step++) {
          for (let i = 0; i < length; i++) {
            this.dir[dirs[dirInd]](curr)
            const newValue = this.neighborSum(curr, grid)
            grid[`${curr.x},${curr.y}`] = newValue

            if (newValue > target) {
              this.solutions.partTwo = newValue
              return
            }
          }
          dirInd = (dirInd + 1) % dirs.length
        }
        length++
      }
    },
    neighborSum: function (curr, grid) {
      const neighbors = [
        { x: curr.x + 1, y: curr.y },
        { x: curr.x + 1, y: curr.y + 1 },
        { x: curr.x, y: curr.y + 1 },
        { x: curr.x - 1, y: curr.y + 1 },
        { x: curr.x - 1, y: curr.y },
        { x: curr.x - 1, y: curr.y - 1 },
        { x: curr.x, y: curr.y - 1 },
        { x: curr.x + 1, y: curr.y - 1 }
      ]

      return neighbors.map(n => grid[`${n.x},${n.y}`] || 0).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style>

</style>
