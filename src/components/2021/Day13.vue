<template>
  <Day :day="13" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="300" height="100" />
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
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      let grid = new Set()
      const folds = []

      let isFolds = false

      input.forEach(i => {
        if (i.length < 1) {
          isFolds = true
          return
        }

        if (isFolds) {
          const [dir, coord] = i.replace('fold along ', '').split('=')

          folds.push({
            dir: dir,
            coord: +coord
          })
        } else {
          const [x, y] = i.split(',').map(c => +c)

          grid.add(`${x},${y}`)
        }
      })

      grid = this.fold(grid, folds[0])
      this.solutions.partOne = grid.size

      for (let i = 1; i < folds.length; i++) {
        grid = this.fold(grid, folds[i])
      }

      this.solutions.partTwo = ''

      this.$nextTick(() => this.plot(grid))
    },
    fold: function (grid, fold) {
      const result = new Set()

      grid.forEach(c => {
        const [x, y] = c.split(',').map(i => +i)

        if (fold.dir === 'x') {
          if (x > fold.coord) {
            result.add(`${fold.coord - (x - fold.coord)},${y}`)
          } else {
            result.add(c)
          }
        } else {
          if (y > fold.coord) {
            result.add(`${x},${fold.coord - (y - fold.coord)}`)
          } else {
            result.add(c)
          }
        }
      })

      return result
    },
    plot: function (grid) {
      let minX = Number.MAX_SAFE_INTEGER
      let maxX = -Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxY = -Number.MAX_SAFE_INTEGER

      grid.forEach(c => {
        const [x, y] = c.split(',').map(i => +i)
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      })

      // Initialise the canvas
      const canvas = document.getElementById('partTwo')
      const ctx = canvas.getContext('2d')
      // Set the canvas size
      canvas.width = (minX + maxX + 1) * 5
      canvas.height = (minY + maxY + 1) * 5

      grid.forEach(c => {
        const [x, y] = c.split(',').map(i => +i)

        ctx.fillStyle = 'gray'
        ctx.fillRect(x * 5, y * 5, 5, 5)
      })
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 100px;
  width: 100%;
}
</style>
