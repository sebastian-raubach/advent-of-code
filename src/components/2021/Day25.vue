<template>
  <Day :day="25" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mod } from '@/util/math'

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
      let grid = input.map(i => i.split(''))

      let counter = 0
      let movement = true
      while (movement) {
        movement = false
        let gridCopy = grid.map(r => r.map(_ => '.'))

        for (let y = 0; y < grid.length; y++) {
          for (let x = 0; x < grid[y].length; x++) {
            const cell = grid[y][x]

            if (cell === '>') {
              if (grid[y][mod(x + 1, grid[y].length)] === '.') {
                gridCopy[y][mod(x + 1, grid[y].length)] = '>'
                x++
                movement = true
              } else {
                gridCopy[y][x] = '>'
              }
            } else {
              gridCopy[y][x] = grid[y][x]
            }
          }
        }

        grid = gridCopy
        gridCopy = grid.map(r => r.map(_ => '.'))

        for (let x = 0; x < grid[0].length; x++) {
          for (let y = 0; y < grid.length; y++) {
            const cell = grid[y][x]

            if (cell === 'v') {
              if (grid[mod(y + 1, grid.length)][x] === '.') {
                gridCopy[mod(y + 1, grid.length)][x] = 'v'
                y++
                movement = true
              } else {
                gridCopy[y][x] = 'v'
              }
            } else {
              gridCopy[y][x] = grid[y][x]
            }
          }
        }

        counter++
        grid = gridCopy
      }

      this.solutions.partOne = counter
    }
  }
}
</script>

<style scoped>
</style>
