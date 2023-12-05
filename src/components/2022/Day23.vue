<template>
  <Day :day="23" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const elves = new Map()

      const dirs = ['N', 'S', 'W', 'E']
      let dirIndex = 0
      const checkDir = {
        N: (curr) => {
          const canMove = [[0, -1], [-1, -1], [1, -1]].every(d => !elves.has(`${curr[0] + d[0]},${curr[1] + d[1]}`))
          if (canMove) {
            return [curr[0], curr[1] - 1]
          } else {
            return curr
          }
        },
        E: (curr) => {
          const canMove = [[1, -1], [1, 0], [1, 1]].every(d => !elves.has(`${curr[0] + d[0]},${curr[1] + d[1]}`))
          if (canMove) {
            return [curr[0] + 1, curr[1]]
          } else {
            return curr
          }
        },
        S: (curr) => {
          const canMove = [[0, 1], [-1, 1], [1, 1]].every(d => !elves.has(`${curr[0] + d[0]},${curr[1] + d[1]}`))
          if (canMove) {
            return [curr[0], curr[1] + 1]
          } else {
            return curr
          }
        },
        W: (curr) => {
          const canMove = [[-1, -1], [-1, 0], [-1, 1]].every(d => !elves.has(`${curr[0] + d[0]},${curr[1] + d[1]}`))
          if (canMove) {
            return [curr[0] - 1, curr[1]]
          } else {
            return curr
          }
        }
      }
      const noNeighbors = curr => [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]].every(d => !elves.has(`${curr[0] + d[0]},${curr[1] + d[1]}`))

      input.forEach((i, y) => {
        const row = i.split('')

        row.forEach((j, x) => {
          if (j === '#') {
            elves.set(`${x},${y}`, null)
          }
        })
      })

      for (let round = 0; round < 10; round++) {
        const proposed = new Map()
        elves.forEach((value, key) => {
          const position = key.split(',').map(c => +c)

          if (noNeighbors(position)) {
            return
          }

          for (let d = 0; d < 4; d++) {
            const dir = dirs[(dirIndex + d) % dirs.length]
            const next = checkDir[dir](position)

            // It can move this way
            if (position[0] !== next[0] || position[1] !== next[1]) {
              elves.set(key, next)
              const nextString = next.join(',')
              proposed.set(nextString, proposed.has(nextString) ? (proposed.get(nextString) + 1) : 1)
              break
            }
          }
        })

        elves.forEach((value, key) => {
          if (value && (proposed.get(value.join(',')) === 1)) {
            elves.delete(key)
            elves.set(value.join(','), null)
          }
        })

        dirIndex = (dirIndex + 1) % dirs.length

        console.log(JSON.parse(JSON.stringify([...elves.keys()])))
      }

      let minX = Number.MAX_VALUE
      let minY = Number.MAX_VALUE
      let maxX = -minX
      let maxY = -minY

      elves.forEach((value, key) => {
        const [x, y] = key.split(',').map(c => +c)

        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      })

      console.log(minX, maxX, minY, maxY, elves.size)

      this.solutions.partOne = (maxX - minX + 1) * (maxY - minY + 1) - elves.size
    }
  }
}
</script>

<style>
</style>
