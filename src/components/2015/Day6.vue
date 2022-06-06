<template>
  <Day :day="6" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="1000" height="1000" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="1000" height="1000" />
      </div>
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
      partOne: {
        'turn off': (grid, x, y) => { grid[y][x] = 0 },
        toggle: (grid, x, y) => { grid[y][x] = 1 - grid[y][x] },
        'turn on': (grid, x, y) => { grid[y][x] = 1 }
      },
      partTwo: {
        'turn off': (grid, x, y) => { grid[y][x] = Math.max(0, grid[y][x] - 1) },
        toggle: (grid, x, y) => { grid[y][x] += 2 },
        'turn on': (grid, x, y) => { grid[y][x]++ }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Create the grid. Use an actual 2d array instead of a Map here, because the size is fixed.
      const gridOne = new Array(1000).fill(0).map(() => new Array(1000).fill(0))
      const gridTwo = new Array(1000).fill(0).map(() => new Array(1000).fill(0))

      const pattern = /(?<method>.+) (?<blX>\d+),(?<blY>\d+) through (?<trX>\d+),(?<trY>\d+)/
      input.forEach(i => {
        const matched = i.match(pattern).groups

        for (let y = +matched.blY; y <= +matched.trY; y++) {
          for (let x = +matched.blX; x <= +matched.trX; x++) {
            this.partOne[matched.method](gridOne, x, y)
            this.partTwo[matched.method](gridTwo, x, y)
          }
        }
      })

      this.solutions.partOne = gridOne.map(r => r.filter(c => c).length).reduce((a, b) => a + b)
      this.solutions.partTwo = gridTwo.map(r => r.reduce((a, b) => a + b)).reduce((a, b) => a + b)

      this.$nextTick(() => {
        this.draw('partOne', gridOne)
        this.draw('partTwo', gridTwo)
      })
    },
    draw: function (id, data) {
      // Initialise the canvas
      const canvas = document.getElementById(id)
      const ctx = canvas.getContext('2d')

      let max = 0
      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
          max = Math.max(max, data[y][x])
        }
      }

      const gradient = this.createColorGradient('#006266', '#C4E538', max + 1)

      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
          ctx.fillStyle = data[y][x] === 0 ? 'black' : gradient[data[y][x]]
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow-x: auto;
  overflow-y: hidden;
  height: 1000px;
  width: 100%;
}
</style>
