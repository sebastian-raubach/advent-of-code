<template>
  <Day :day="17" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-17.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      neighborsThree: [
        [-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, 0, -1], [-1, 0, 0], [-1, 0, 1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
        [0, -1, -1], [0, -1, 0], [0, -1, 1], [0, 0, -1], [0, 0, 1], [0, 1, -1], [0, 1, 0], [0, 1, 1],
        [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, 0, -1], [1, 0, 0], [1, 0, 1], [1, 1, -1], [1, 1, 0], [1, 1, 1]
      ],
      neighborsFour: [
        [-1, -1, -1, -1], [-1, -1, -1, 0], [-1, -1, -1, 1], [-1, -1, 0, -1], [-1, -1, 0, 0], [-1, -1, 0, 1], [-1, -1, 1, -1], [-1, -1, 1, 0], [-1, -1, 1, 1],
        [-1, 0, -1, -1], [-1, 0, -1, 0], [-1, 0, -1, 1], [-1, 0, 0, -1], [-1, 0, 0, 0], [-1, 0, 0, 1], [-1, 0, 1, -1], [-1, 0, 1, 0], [-1, 0, 1, 1],
        [-1, 1, -1, -1], [-1, 1, -1, 0], [-1, 1, -1, 1], [-1, 1, 0, -1], [-1, 1, 0, 0], [-1, 1, 0, 1], [-1, 1, 1, -1], [-1, 1, 1, 0], [-1, 1, 1, 1],
        [0, -1, -1, -1], [0, -1, -1, 0], [0, -1, -1, 1], [0, -1, 0, -1], [0, -1, 0, 0], [0, -1, 0, 1], [0, -1, 1, -1], [0, -1, 1, 0], [0, -1, 1, 1],
        [0, 0, -1, -1], [0, 0, -1, 0], [0, 0, -1, 1], [0, 0, 0, -1], [0, 0, 0, 1], [0, 0, 1, -1], [0, 0, 1, 0], [0, 0, 1, 1],
        [0, 1, -1, -1], [0, 1, -1, 0], [0, 1, -1, 1], [0, 1, 0, -1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, -1], [0, 1, 1, 0], [0, 1, 1, 1],
        [1, -1, -1, -1], [1, -1, -1, 0], [1, -1, -1, 1], [1, -1, 0, -1], [1, -1, 0, 0], [1, -1, 0, 1], [1, -1, 1, -1], [1, -1, 1, 0], [1, -1, 1, 1],
        [1, 0, -1, -1], [1, 0, -1, 0], [1, 0, -1, 1], [1, 0, 0, -1], [1, 0, 0, 0], [1, 0, 0, 1], [1, 0, 1, -1], [1, 0, 1, 0], [1, 0, 1, 1],
        [1, 1, -1, -1], [1, 1, -1, 0], [1, 1, -1, 1], [1, 1, 0, -1], [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, -1], [1, 1, 1, 0], [1, 1, 1, 1]
      ]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.input = input.map(i => i.split('').map(c => c === '#'))
      this.solvePartOne()
      this.solvePartTwo()
    },
    generateInitialArrayThree: function (input, size) {
      const lg = []
      for (let z = 0; z < 2 * size + 1; z++) {
        const xys = Array.apply(null, Array(2 * size + input.length)).map(a => Array.apply(null, Array(2 * size + input.length)).map(a => false))
        for (let y = size; y < size + input.length; y++) {
          const xs = Array.apply(null, Array(2 * size + input[y - size].length)).map(a => false)
          for (let x = size; x < size + input[y - size].length; x++) {
            xs[x] = z === size ? input[y - size][x - size] : false
          }
          xys[y] = xs
        }
        lg[z] = xys
      }

      return lg
    },
    generateInitialArrayFour: function (input, size) {
      const lg = []
      for (let z = 0; z < 2 * size + 1; z++) {
        const wxys = Array.apply(null, Array(2 * size + input.length)).map(a => Array.apply(null, Array(2 * size + input.length)).map(a => Array.apply(null, Array(2 * size + input.length)).map(a => false)))
        for (let y = 0; y < 2 * size + 1; y++) {
          const wxs = Array.apply(null, Array(2 * size + input.length)).map(a => Array.apply(null, Array(2 * size + input.length)).map(a => false))
          for (let x = size; x < size + input.length; x++) {
            const ws = Array.apply(null, Array(2 * size + input[x - size].length)).map(a => false)
            for (let w = size; w < size + input[x - size].length; w++) {
              ws[w] = z === size && y === size ? input[x - size][w - size] : false
            }
            wxs[x] = ws
          }
          wxys[y] = wxs
        }
        lg[z] = wxys
      }

      return lg
    },
    doIterationThree: function (grid) {
      const tempGrid = JSON.parse(JSON.stringify(grid))
      for (let z = 0; z < grid.length; z++) {
        for (let y = 0; y < grid[z].length; y++) {
          for (let x = 0; x < grid[z][y].length; x++) {
            const cell = grid[z][y][x]

            const activeNeighbors = this.neighborsThree.map(n => grid[z + n[0]] && grid[z + n[0]][y + n[1]] && grid[z + n[0]][y + n[1]][x + n[2]]).reduce((a, b) => a + b)

            if (cell) {
              tempGrid[z][y][x] = activeNeighbors === 2 || activeNeighbors === 3
            } else {
              tempGrid[z][y][x] = activeNeighbors === 3
            }
          }
        }
      }
      return tempGrid
    },
    doIterationFour: function (grid) {
      const tempGrid = JSON.parse(JSON.stringify(grid))
      for (let z = 0; z < grid.length; z++) {
        for (let y = 0; y < grid[z].length; y++) {
          for (let x = 0; x < grid[z][y].length; x++) {
            for (let w = 0; w < grid[z][y][x].length; w++) {
              const cell = grid[z][y][x][w]

              const activeNeighbors = this.neighborsFour.map(n => grid[z + n[0]] && grid[z + n[0]][y + n[1]] && grid[z + n[0]][y + n[1]][x + n[2]] && grid[z + n[0]][y + n[1]][x + n[2]][w + n[3]]).reduce((a, b) => a + b)

              if (cell) {
                tempGrid[z][y][x][w] = activeNeighbors === 2 || activeNeighbors === 3
              } else {
                tempGrid[z][y][x][w] = activeNeighbors === 3
              }
            }
          }
        }
      }
      return tempGrid
    },
    countActiveCellsThree: function (grid) {
      return grid.map(xy => {
        return xy.map(x => {
          return x.map(v => {
            return v === true ? 1 : 0
          }).reduce((a, b) => a + b)
        }).reduce((a, b) => a + b)
      }).reduce((a, b) => a + b)
    },
    countActiveCellsFour: function (grid) {
      return grid.map(wxy => {
        return wxy.map(wx => {
          return wx.map(w => {
            return w.map(v => {
              return v === true ? 1 : 0
            }).reduce((a, b) => a + b)
          }).reduce((a, b) => a + b)
        }).reduce((a, b) => a + b)
      }).reduce((a, b) => a + b)
    },
    solvePartOne: function () {
      let curGrid = this.generateInitialArrayThree(this.input, 6)

      for (let it = 0; it < 6; it++) {
        curGrid = this.doIterationThree(curGrid)
      }

      // Get the number of active cells
      this.solutions.partOne = this.countActiveCellsThree(curGrid)
    },
    solvePartTwo: function () {
      let curGrid = this.generateInitialArrayFour(this.input, 7)

      for (let it = 0; it < 6; it++) {
        curGrid = this.doIterationFour(curGrid)
      }

      // Get the number of active cells
      this.solutions.partTwo = this.countActiveCellsFour(curGrid)
    }
  }
}
</script>

<style>

</style>
