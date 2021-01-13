<template>
  <Day :day="17" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-18-code border">
<code v-html="gridOne" />
      </pre>
    </template>
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
      gridOne: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const clay = []
      input.forEach(i => {
        const parts = i.split(', ')
        const one = parts[0].split('=')
        const two = parts[1].split('=')
        one[1] = +one[1]
        two[1] = two[1].split('..').map(d => +d)

        if (one[0] === 'x') {
          for (let y = two[1][0]; y <= two[1][1]; y++) {
            clay.push({
              x: one[1],
              y: y
            })
          }
        } else {
          for (let x = two[1][0]; x <= two[1][1]; x++) {
            clay.push({
              x: x,
              y: one[1]
            })
          }
        }
      })

      const xRange = [500, 500]
      const yRange = [0, 0]

      clay.forEach(c => {
        xRange[0] = Math.min(xRange[0], c.x)
        xRange[1] = Math.max(xRange[1], c.x)
        yRange[0] = Math.min(yRange[0], c.y)
        yRange[1] = Math.max(yRange[1], c.y)
      })
      xRange[0]--
      xRange[1]++
      yRange[0]--
      yRange[1]++

      this.grid = []
      for (let y = 0; y < yRange[1] - yRange[0]; y++) {
        const row = []
        for (let x = 0; x < xRange[1] - xRange[0]; x++) {
          row.push('.')
        }
        this.grid.push(row)
      }

      clay.forEach(c => {
        c.x -= xRange[0]
        c.y -= yRange[0]
        this.grid[c.y][c.x] = '#'
      })

      this.spring = {
        x: 500 - xRange[0],
        y: 0 - yRange[0]
      }
      this.grid[this.spring.y][this.spring.x] = 'x'

      this.solvePartOne()
      this.solvePartTwo()
    },
    print: function () {
      let result = ''
      for (let y = 0; y < this.grid.length; y++) {
        result += this.grid[y].join('')
        result += '<br/>'
      }
      return result
    },
    goDown: function (current) {
      const valid = ['#', '~']

      while (true) {
        // Continue downwards as long as we haven't hit clay yet
        const next = { x: current.x, y: current.y + 1 }
        if (this.grid[next.y][next.x] === '.') {
          this.grid[next.y][next.x] = '|'
          current = next
        } else {
          const left = current
          const right = current

          // Find the left boundary
          while (valid.includes(this.grid[left.y + 1][left.x - 1])) {
            if (this.grid[left.y][left.x - 1] === '#') {
              break
            }
            left.x--
            this.grid[left.y][left.x] = '~'
          }
          // Find the right boundary
          while (valid.includes(this.grid[right.y + 1][right.x + 1])) {
            if (this.grid[right.y][right.x + 1] === '#') {
              break
            }
            right.x++
            this.grid[right.y][right.x] = '~'
          }

          break
        }
      }
    },
    solvePartOne: function () {
      this.goDown(this.spring)

      this.gridOne = this.print()
      this.solutions.partOne = 'TODO'
    },
    solvePartTwo: function () {
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
</style>
