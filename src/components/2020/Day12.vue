<template>
  <Day :day="12" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="plotly-chart" id="partOneChart" />
    </template>
    <template v-slot:partTwo>
      <div class="plotly-chart" id="partTwoChart" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mapGetters } from 'vuex'
import { createColorGradient } from '@/util/color'
import { mod } from '@/util/math'

export default {
  components: {
    Day
  },
  computed: {
    ...mapGetters([
      'storeDarkMode'
    ])
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      colorGradient: createColorGradient('#eeeeee', '#c0392b', 1000),
      operationsOne: {
        // N, S, E and W just adjust the x and y position
        N: (pos, op) => { pos.y += op.value },
        S: (pos, op) => { pos.y -= op.value },
        E: (pos, op) => { pos.x += op.value },
        W: (pos, op) => { pos.x -= op.value },
        // L turns the ship counter-clockwise modulo 360
        L: (pos, op) => { pos.angle = mod(pos.angle - op.value, 360) },
        // R turns the ship clockwise modulo 360
        R: (pos, op) => { pos.angle = mod(pos.angle + op.value, 360) },
        // F Uses either N, E, S or W depending on the current angle
        F: (pos, op) => {
          switch (pos.angle) {
            case 0:
              this.operationsOne.N(pos, op)
              break
            case 90:
              this.operationsOne.E(pos, op)
              break
            case 180:
              this.operationsOne.S(pos, op)
              break
            case 270:
              this.operationsOne.W(pos, op)
              break
          }
        }
      },
      operationsTwo: {
        // N, S, E and W move the waypoint x and y positions
        N: (pos, way, op) => { way.y += op.value },
        S: (pos, way, op) => { way.y -= op.value },
        E: (pos, way, op) => { way.x += op.value },
        W: (pos, way, op) => { way.x -= op.value },
        // L rotates the waypoint around the ship counter-clockwise
        L: (pos, way, op) => {
          let tmp
          switch (op.value) {
            case 90:
              tmp = way.x
              way.x = -way.y
              way.y = tmp
              break
            case 180:
              way.x = -way.x
              way.y = -way.y
              break
            case 270:
              tmp = way.x
              way.x = way.y
              way.y = -tmp
              break
          }
          // Update angle
          pos.angle = mod(pos.angle - op.value, 360)
        },
        // R rotates the waypoint around the ship clockwise
        R: (pos, way, op) => {
          let tmp
          switch (op.value) {
            case 90:
              tmp = way.x
              way.x = way.y
              way.y = -tmp
              break
            case 180:
              way.x = -way.x
              way.y = -way.y
              break
            case 270:
              tmp = way.x
              way.x = -way.y
              way.y = tmp
              break
          }
          pos.angle = mod(pos.angle + op.value, 360)
         },
        // F moves the ship in the direction of the waypoint multiplied by the value
        F: (pos, way, op) => {
          pos.x += op.value * way.x
          pos.y += op.value * way.y
        }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.directions = input.map(i => {
        // Get the number
        const value = +i.replace(/[a-zA-Z]+/g, '')
        // Get the letter
        const inst = i.replace(/\d*/g, '')

        // Save as object
        return {
          instruction: inst,
          value: value
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Ship starting position
      const ship = {
        x: 0,
        y: 0,
        angle: 90
      }

      // Keep track of the points for the chart
      const points = []
      points.push({
        x: ship.x,
        y: ship.y
      })
      // For each of the directions
      this.directions.forEach(i => {
        // Use the operation mapping to resolve it
        this.operationsOne[i.instruction](ship, i)
        // Remember the new point for the chart
        points.push({
          x: ship.x,
          y: ship.y
        })
      })

      // Get the solution as the manhattan distance
      this.solutions.partOne = Math.abs(ship.x) + Math.abs(ship.y)

      // Draw the chart
      this.drawPath(points, 'partOneChart')
    },
    solvePartTwo: function () {
      // The ship starting position
      const ship = {
        x: 0,
        y: 0,
        angle: 90
      }
      // The waypoint starting position (distance from the ship)
      const way = {
        x: 10,
        y: 1
      }

      // Keep track of all points for the chart
      const points = []
      points.push({
        x: ship.x,
        y: ship.y
      })

      // For each direction
      this.directions.forEach(i => {
        // Use the mapping to resolve the direction
        this.operationsTwo[i.instruction](ship, way, i)
        // Add the point for the chart
        points.push({
          x: ship.x,
          y: ship.y
        })
      })

      // Get the solution as the manhattan distance
      this.solutions.partTwo = Math.abs(ship.x) + Math.abs(ship.y)

      // Draw the chart
      this.drawPath(points, 'partTwoChart')
    },
    drawPath: function (points, id) {
      // Keep track of all lines
      const shapes = []
      // Calculate min and max in each dimension for the axes
      let xMin = points[0].x
      let yMin = points[0].y
      let xMax = points[0].x
      let yMax = points[0].y

      for (let i = 1; i < points.length; i++) {
        // Calculate the color based on the gradient
        const color = this.colorGradient[Math.floor((i - 1) * this.colorGradient.length / points.length)]
        // Add the new line
        shapes.push({
          type: 'line',
          x0: points[i - 1].x,
          y0: points[i - 1].y,
          x1: points[i].x,
          y1: points[i].y,
          line: {
            color: color,
            width: 3
          }
        })

        xMin = Math.min(xMin, points[i].x)
        yMin = Math.min(yMin, points[i].y)
        xMax = Math.max(xMax, points[i].x)
        yMax = Math.max(yMax, points[i].y)
      }

      const layout = {
        shapes: shapes,
        xaxis: {
          range: [xMin, xMax],
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          range: [yMin, yMax],
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      }

      this.$nextTick(() => {
        // Purge the old chart and add the new one
        this.$plotly.purge(id)
        this.$plotly.newPlot(id, null, layout, {
          responsive: true,
          staticPlot: true,
          displayModeBar: false
        })
      })
    }
  }
}
</script>

<style scoped>
.plotly-chart {
  height: 400px;
}
</style>
