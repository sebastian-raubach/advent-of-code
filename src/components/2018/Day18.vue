<template>
  <Day :day="18" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-18-code border">
<code v-html="gridOne" />
      </pre>
    </template>
    <template v-slot:partTwo>
      <pre class="day-18-code border">
<code v-html="gridTwo" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

const GROUND = '.'
const TREE = '|'
const LUMBER = '#'

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
      neighbors: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
      map: {
        '.': 'ground',
        '|': 'tree',
        '#': 'lumber'
      },
      gridOne: null,
      gridTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.gridOne = null
      this.grid = input.map(i => i.split(''))
      this.solvePartOne()
      this.solvePartTwo()
    },
    run: function (grid) {
      // Take a copy of the grid
      const temp = JSON.parse(JSON.stringify(grid))

      // Iteratr through it
      for (let y = 0; y < temp.length; y++) {
        for (let x = 0; x < temp[y].length; x++) {
          // Keep track of neighbor counts per type
          const neighbors = {
            tree: 0,
            lumber: 0,
            ground: 0
          }

          // Count them
          this.neighbors.forEach(n => {
            if (grid[y + n[1]]) {
              neighbors[this.map[grid[y + n[1]][x + n[0]]]]++
            }
          })

          // Adjust based on current value and neighbors
          switch (grid[y][x]) {
            case GROUND:
              if (neighbors.tree >= 3) {
                temp[y][x] = TREE
              }
              break
            case TREE:
              if (neighbors.lumber >= 3) {
                temp[y][x] = LUMBER
              }
              break
            case LUMBER:
              if (neighbors.lumber < 1 || neighbors.tree < 1) {
                temp[y][x] = GROUND
              }
              break
          }
        }
      }

      return temp
    },
    solvePartOne: function () {
      // Take a copy of the grid
      let prev = JSON.parse(JSON.stringify(this.grid))
      // Run 10 time steps
      for (let i = 0; i < 10; i++) {
        const temp = this.run(prev)

        prev = temp
      }

      // Count types
      const counts = {
        tree: 0,
        lumber: 0,
        ground: 0
      }
      for (let y = 0; y < prev.length; y++) {
        for (let x = 0; x < prev[y].length; x++) {
          counts[this.map[prev[y][x]]]++
        }
      }

      // Set solution
      this.solutions.partOne = counts.tree * counts.lumber
      this.gridOne = this.print(prev)
    },
    solvePartTwo: function () {
      // Initial setip
      const LIMIT = 1000000000
      let round = 0
      // Keep track of seen configurations
      const memory = new Map()

      let prev = JSON.parse(JSON.stringify(this.grid))
      // While we haven't finished yet
      while (round < LIMIT) {
        // Do a step
        let temp = this.run(prev)
        round++

        // Get configuration
        const string = JSON.stringify(temp)

        if (memory.has(string)) {
          // Configuration exists? Get it and calculate the loop length
          const match = memory.get(string)
          const loopLength = round - match

          // Then jump using the loop length
          while (round < LIMIT) {
            round += loopLength
          }
          // Adjust for offset
          round -= loopLength

          // Then run the remaining iterations manually again
          for (let t = 0; t < LIMIT - round; t++) {
            temp = this.run(temp)

            prev = temp
          }

          // Calculate counts
          const counts = {
            tree: 0,
            lumber: 0,
            ground: 0
          }

          for (let y = 0; y < prev.length; y++) {
            for (let x = 0; x < prev[y].length; x++) {
              counts[this.map[prev[y][x]]]++
            }
          }

          // Set result
          this.solutions.partTwo = counts.tree * counts.lumber
          this.gridTwo = this.print(prev)

          return
        } else {
          // If we haven't seen this configuration yet, remember and continue
          memory.set(string, round)
        }

        prev = temp
      }
    },
    print: function (grid) {
      let result = ''
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (grid[y][x] === TREE) {
            result += '<span class="day-18-tree">|</span>'
          } else if (grid[y][x] === LUMBER) {
            result += '<span class="day-18-lumber">#</span>'
          } else {
            result += grid[y][x]
          }
        }
        result += '<br/>'
      }
      return result
    }
  }
}
</script>

<style>
.day-18-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 50vh;
}
.day-18-tree {
  background-color:#27ae60;
  color: #2c3e50;
}
.day-18-lumber {
  background-color: #2980b9;
  color: #2c3e50;
}
</style>
