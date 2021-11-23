<template>
  <Day :day="16" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      moves: {
        spin: (arr, x) => {
          // Move the end to the start
          const toMove = arr.splice(-x)
          return toMove.concat(arr)
        },
        exchange: (arr, x, y) => {
          // Swap by index
          const temp = arr[x]
          arr[x] = arr[y]
          arr[y] = temp
          return arr
        },
        partner: (arr, x, y) => {
          // Swap by value
          const a = arr.indexOf(x)
          const b = arr.indexOf(y)

          const temp = arr[a]
          arr[a] = arr[b]
          arr[b] = temp
          return arr
        }
      }
    }
  },
  methods: {
    solvePartOne: function (moves) {
      // Get the original array
      let arr = 'abcdefghijklmnop'.split('')

      // Do a single dance
      arr = this.dance(arr, moves)

      this.solutions.partOne = arr.join('')
    },
    solvePartTwo: function (moves) {
      let arr = 'abcdefghijklmnop'.split('')
      const startPosition = arr.join('')
      for (let i = 0; i < 1_000_000_000; i++) {
        arr = this.dance(arr, moves)

        // If we have gotten to the start again
        if (arr.join('') === startPosition) {
          // Increase the loop counter appropriately
          i += (Math.floor(1_000_000_000 / (i + 1)) - 1) * (i + 1)
        }
      }

      this.solutions.partTwo = arr.join('')
    },
    onInputChanged: function (input) {
      // Get the dance moves
      const moves = input[0].split(',')

      this.solvePartOne(moves)
      this.solvePartTwo(moves)
    },
    dance: function (arr, moves) {
      moves.forEach(i => {
        if (i.startsWith('s')) {
          arr = this.moves.spin(arr, +(i.substring(1)))
        } else if (i.startsWith('x')) {
          const parts = i.substring(1).split('/').map(i => +i)
          arr = this.moves.exchange(arr, parts[0], parts[1])
        } else if (i.startsWith('p')) {
          const parts = i.substring(1).split('/')
          arr = this.moves.partner(arr, parts[0], parts[1])
        }
      })

      return arr
    }
  }
}
</script>

<style scoped>
</style>
