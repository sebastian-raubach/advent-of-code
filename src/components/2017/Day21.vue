<template>
  <Day :day="21" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      const rules = new Map()

      input.forEach(i => {
        const parts = i.split(' => ')
        rules.set(parts[0], parts[1])
      })

      // const grid = [['.', '#', '.'], ['.', '.', '#'], ['#', '#', '#']]
      let grid = '.#./..#/###'

      for (let it = 0; it < 2; it++) {
        const split = this.splitGrid(grid)
        const replaced = split.map(s => this.toArray(rules.get(this.findRule(rules, this.alterations(this.toString(s))))))
        grid = this.joinGrid(replaced)
        console.log(grid)
      }

      // const string = this.toString(grid)
      // const alterations = this.alterations(string)
      // const matches = this.findRule(rules, alterations)

      // console.log(matches)

      // console.log(this.splitGrid('##.##./#..#../....../##.##./#..#../......'))
    },
    countBits: (input) => input.split('').filter(i => i === '#').length,
    toArray: (input) => input.split('/').map(r => r.split('')),
    toString: (input) => input.map(r => r.join('')).join('/'),
    flipH: (input) => input.split('/').map(r => r.split('').reverse().join('')).join('/'),
    flipV: (input) => input.split('/').reverse().join('/'),
    findRule: (rules, alterations) => alterations.filter(a => rules.has(a))[0],
    joinGrid: function (parts) {
      const l = parts[0].length
      const result = Array.from(Array(l)).map(_ => Array.from(Array(l)))

      parts.forEach((p, i) => {
        const yGrid = i / l
        const xGrid = i % l

        for (let y = 0; y < p.length; y++) {
          for (let x = 0; x < p.length; x++) {
            result[yGrid * l + y][xGrid * l + x] = p[y][x]
          }
        }
      })

      return result
    },
    splitGrid: function (grid) {
      const arr = this.toArray(grid)
      const size = arr.length
      const l = (size % 2 === 0) ? 2 : 3

      const results = []
      for (let yGrid = 0; yGrid < size / l; yGrid++) {
        for (let xGrid = 0; xGrid < size / l; xGrid++) {
          // Now parse the individual grid
          const sub = []
          for (let y = 0; y < l; y++) {
            const row = []
            for (let x = 0; x < l; x++) {
              row.push(arr[yGrid * l + y][xGrid * l + x])
            }
            sub.push(row)
          }
          results.push(sub)
        }
      }
      return results
    },
    alterations: function (input) {
      let rotations = []

      const arr = this.toArray(input)
      rotations.push(arr)
      for (let i = 0; i < 3; i++) {
        rotations.push(this.rotate90(rotations[i]))
      }

      rotations = rotations.map(r => this.toString(r))

      // For each rotation, add the flips
      rotations.forEach(r => {
        rotations.push(this.flipH(r))
        rotations.push(this.flipV(r))
      })

      return rotations
    },
    rotate90: function (arr) {
      // Take a copy for the dimensions
      const res = JSON.parse(JSON.stringify(arr))

      for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
          res[y][x] = arr[arr.length - x - 1][y]
        }
      }

      return res
    }
  }
}
</script>

<style scoped>
</style>
