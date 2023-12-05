<template>
  <Day :day="3" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" :width="canvas.width" :height="canvas.height" />
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
      canvas: {
        width: 1000,
        height: 1000
      },
      grid: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const numbers = []
      const symbols = []

      this.grid = input.map(i => i.split(''))

      this.grid.forEach((parts, y) => {
        const i = parts.join('')
        let xStart = null
        for (let x = 0; x < parts.length; x++) {
          if (parts[x] === '.') {
            // Dot
            if (xStart !== null) {
              numbers.push({
                xStart: xStart,
                xEnd: x - 1,
                y: y,
                value: +i.substring(xStart, x)
              })
              xStart = null
            }

            continue
          } else if (parts[x] === `${+parts[x]}`) {
            // Number
            if (xStart === null) {
              xStart = x
            }
          } else {
            // Symbol
            if (xStart !== null) {
              numbers.push({
                xStart: xStart,
                xEnd: x - 1,
                y: y,
                value: +i.substring(xStart, x)
              })
              xStart = null
            }

            symbols.push({ x, y, touching: [], symbol: parts[x] })
          }
        }

        if (xStart !== null) {
          numbers.push({
            xStart: xStart,
            xEnd: i.length - 1,
            y: y,
            value: +i.substring(xStart, i.length)
          })
          xStart = null
        }
      })

      this.solutions.partOne = numbers.map(n => {
        let touches = false
        symbols.forEach(s => {
          if ((Math.abs(s.y - n.y) <= 1) && (s.x >= n.xStart - 1) && (s.x <= n.xEnd + 1)) {
            touches ||= true
            s.touching.push(n)
          }
        })

        return touches ? n.value : 0
      }).reduce((a, b) => a + b, 0)

      this.solutions.partTwo = symbols.map(s => {
        if (s.symbol === '*' && s.touching.length === 2) {
          return s.touching[0].value * s.touching[1].value
        } else {
          return 0
        }
      }).reduce((a, b) => a + b, 0)

      this.$nextTick(() => this.draw(symbols, numbers))
    },
    draw: function (symbols, numbers) {
      // Initialise the canvas
      const canvas = document.getElementById('partOne')
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 1

      const factor = 10

      this.canvas = {
        width: this.grid[0].length * factor,
        height: this.grid.length * factor
      }

      this.$nextTick(() => {
        ctx.fillStyle = '#2c3e50'
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        numbers.forEach(n => {
          ctx.fillStyle = '#006266'
          ctx.fillRect(n.xStart * factor, n.y * factor, factor * (n.xEnd - n.xStart + 1), factor)
        })

        symbols.forEach(s => {
          if (s.symbol === '*' && s.touching.length === 2) {
            ctx.fillStyle = '#FFC312'
            ctx.fillRect(s.x * factor, s.y * factor, factor, factor)
            ctx.fillStyle = '#A3CB38'
            s.touching.forEach(t => {
              ctx.fillRect(t.xStart * factor, t.y * factor, factor * (t.xEnd - t.xStart + 1), factor)
            })
          } else {
            ctx.fillStyle = '#EE5A24'
            ctx.fillRect(s.x * factor, s.y * factor, factor, factor)
          }
        })
      })
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow: auto;
  height: 1000px;
  width: 100%;
}
</style>
