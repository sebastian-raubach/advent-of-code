<template>
  <Day :day="3" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
    </template>
    <template v-slot:partTwo>
      <div id="partTwo" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mapGetters } from 'vuex'

export default {
  components: {
    Day
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ])
  },
  watch: {
    darkMode: function () {
      if (this.solutions.partOne !== null) {
        this.draw([this.traces.partOne], 'partOne')
        this.draw(this.traces.partTwo, 'partTwo')
      }
    }
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      traces: {
        partOne: {
          x: [],
          y: []
        },
        partTwo: [{
          x: [],
          y: []
        }, {
          x: [],
          y: []
        }]
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.traces = {
        partOne: {
          x: [],
          y: []
        },
        partTwo: [{
          x: [],
          y: []
        }, {
          x: [],
          y: []
        }]
      }

      // Define the movements
      const dirs = {
        '>': curr => curr.x++,
        '<': curr => curr.x--,
        '^': curr => curr.y--,
        v: curr => curr.y++
      }

      // Split the input into bits
      const parts = input[0].split('')
      // Remember locations we've been to
      const memory = new Set()

      // Current location
      const curr = {
        x: 0,
        y: 0
      }
      // Add the origin
      memory.add('0,0')
      parts.forEach(p => {
        // For each bit in the input, move in the direction
        dirs[p](curr)
        // Then remember the new position
        memory.add(`${curr.x},${curr.y}`)

        // Remember for drawing
        this.traces.partOne.x.push(curr.x)
        this.traces.partOne.y.push(curr.y)
      })

      // The answer is the number of unique positions
      this.solutions.partOne = memory.size
      this.$nextTick(() => this.draw([this.traces.partOne], 'partOne'))

      // For part two, lets have two positions
      const santa = {
        x: 0,
        y: 0
      }
      const robo = {
        x: 0,
        y: 0
      }

      // Clear the memory
      memory.clear()
      // Add the origin again
      memory.add('0,0')
      parts.forEach((p, i) => {
        // For each bit in the input, move either santa or the robot depending on the index, then remember the new location
        if (i % 2 === 0) {
          dirs[p](santa)
          memory.add(`${santa.x},${santa.y}`)

          this.traces.partTwo[0].x.push(santa.x)
          this.traces.partTwo[0].y.push(santa.y)
        } else {
          dirs[p](robo)
          memory.add(`${robo.x},${robo.y}`)

          this.traces.partTwo[1].x.push(robo.x)
          this.traces.partTwo[1].y.push(robo.y)
        }
      })

      // The answe is the number of unique positions again
      this.solutions.partTwo = memory.size
      this.$nextTick(() => this.draw(this.traces.partTwo, 'partTwo'))
    },
    draw: function (traces, id) {
      this.$plotly.purge(id)

      const tr = JSON.parse(JSON.stringify(traces))
      tr.forEach(t => {
        t.mode = 'lines'
        t.type = 'scatter'
      })

      this.$plotly.newPlot(id, tr, {
        height: 400,
        hovermode: 'closest',
        showlegend: false,
        margin: { t: 10, b: 20, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        }
      }, {
        responsive: true,
        displaylogo: false
      })
    }
  }
}
</script>

<style scoped>
</style>
