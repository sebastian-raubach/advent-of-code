<template>
  <Day :day="2" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
      <div id="partTwo" />
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
      mod: {
        forward: (current, x) => { current.x += x },
        down: (current, y) => { current.y += y },
        up: (current, y) => { current.y -= y }
      },
      mod2: {
        forward: (current, x) => {
          current.x += x
          current.y += current.aim * x
        },
        down: (current, y) => { current.aim += y },
        up: (current, y) => { current.aim -= y }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input
      const mods = input.map(i => {
        const parts = i.split(' ')
        return {
          mod: parts[0],
          value: +parts[1]
        }
      })

      // Keep track of the current position
      let curr = {
        x: 0,
        y: 0
      }

      // For plotting
      let trace = {
        x: [],
        y: [],
        mode: 'lines+markers'
      }
      // Make the adjustments
      mods.forEach(m => {
        this.mod[m.mod](curr, m.value)
        trace.x.push(curr.x)
        trace.y.push(curr.y)
      })

      // Get the solution
      this.solutions.partOne = curr.x * curr.y

      this.plot('partOne', trace)

      // Reset
      curr = {
        x: 0,
        y: 0,
        aim: 0
      }

      trace = {
        x: [],
        y: [],
        mode: 'lines+markers'
      }

      // Make the adjustments
      mods.forEach(m => {
        this.mod2[m.mod](curr, m.value)
        trace.x.push(curr.x)
        trace.y.push(curr.y)
      })

      // Get the solution
      this.solutions.partTwo = curr.x * curr.y

      this.plot('partTwo', trace)
    },
    plot: function (id, trace) {
      this.$nextTick(() => {
        this.$plotly.newPlot(id, [trace], {
          height: 350,
          xaxis: { title: 'Horizontal position' },
          yaxis: { title: 'Depth' }
        }, {
          responsive: true,
          displaylogo: false
        })
      })
    }
  }
}
</script>

<style>

</style>
