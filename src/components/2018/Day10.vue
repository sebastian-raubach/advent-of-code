<template>
  <Day :day="10" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
      <b-button @click="prev">Prev</b-button>
      <b-button @click="next">Next</b-button>
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
      step: 0,
      firstDraw: true
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.step = 0
      this.points = input.map(i => {
        // Split into needed parts
        const parts = i.split('> velocity=<')
        const coords = parts[0].replace('position=<', '').replace(/\s*/g, '').split(',').map(c => +c)
        const velocity = parts[1].replace('>', '').replace(/\s*/g, '').split(',').map(v => +v)

        // Invert y dimension for plotting
        coords[1] = -coords[1]
        velocity[1] = -velocity[1]

        return {
          coords,
          velocity
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    prev: function () {
      // Manually step one timepoint back
      this.step--
      this.drawStep(this.step)
    },
    next: function () {
      // Manually step one timepoint forwards
      this.step++
      this.drawStep(this.step)
    },
    drawStep: function (i) {
      // Create the chart trace
      const traces = [{
        x: this.points.map(p => p.coords[0] + p.velocity[0] * i),
        y: this.points.map(p => p.coords[1] + p.velocity[1] * i),
        mode: 'markers',
        type: 'scatter',
        marker: {
          symbol: 'square',
          size: 20
        }
      }]

      if (this.firstDraw) {
        // If it's the first time the chart is drawn, create it
        this.$plotly.newPlot('partOne', traces, {
          height: 350,
          hovermode: false,
          xaxis: {
            visible: false
          },
          yaxis: {
            visible: false
          }
        }, {
          responsive: true,
          displaylogo: false,
          displayModeBar: false
        })
      } else {
        // Otherwise, update it
        delete traces.mode
        delete traces.type
        this.$plotly.update('partOne', traces, {}, [0])
      }
    },
    solvePartOne: function () {
      // Find the timepoint with the smallest area of the minimal bounding box
      let area = Number.MAX_VALUE

      while (true) {
        // Get the min/max x/y coordinates
        let minX = Number.MAX_VALUE
        let maxX = -Number.MAX_VALUE
        let minY = Number.MAX_VALUE
        let maxY = -Number.MAX_VALUE

        this.points.forEach(p => {
          const x = p.coords[0] + p.velocity[0] * this.step
          const y = p.coords[1] + p.velocity[1] * this.step

          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        })

        // Calculate the current area
        const tempArea = (maxX - minX) * (maxY - minY)

        if (tempArea < area) {
          // If it's smaller, keep it
          area = tempArea
          this.step++
        } else {
          // If it got larger again, quit and decrement the step counter
          this.step--
          break
        }
      }

      // Hack to make the solution show up
      this.solutions.partOne = ''

      // Then draw the chart
      this.$nextTick(() => this.drawStep(this.step))
    },
    solvePartTwo: function () {
      // Part two is just the number of steps it took to get there
      this.solutions.partTwo = this.step
    }
  }
}
</script>

<style scoped>
</style>
