<template>
  <Day :day="2" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const p1 = {
        x: 0,
        y: 0
      }
      const p2 = {
        x: 0,
        y: 0,
        aim: 0
      }

      // For plotting
      const traces = [{
        x: [],
        y: [],
        mode: 'lines+markers'
      }, {
        x: [],
        y: [],
        mode: 'lines+markers'
      }]

      // Make the adjustments
      mods.forEach(m => {
        this.mod[m.mod](p1, m.value)
        this.mod2[m.mod](p2, m.value)
        traces[0].x.push(p1.x)
        traces[0].y.push(p1.y)
        traces[1].x.push(p2.x)
        traces[1].y.push(p2.y)
      })

      // Get the solution
      this.solutions.partOne = p1.x * p1.y
      this.solutions.partTwo = p2.x * p2.y

      this.plot('partOne', traces[0])
      this.plot('partTwo', traces[1])
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
