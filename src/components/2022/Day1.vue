<template>
  <Day :day="1" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" ref="partOne" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mapGetters } from 'vuex'

let plotData = []

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
      }
    }
  },
  watch: {
    storeDarkMode: function () {
      this.plot()
    }
  },
  methods: {
    onInputChanged: function (input) {
      plotData = []
      const elves = []

      let plotArray = []
      let sum = 0

      input.forEach(i => {
        if (i === '') {
          // If we encounter an empty line, store the sum and reset
          elves.push(sum)
          sum = 0

          // Keep track of the data for the chart
          plotData.push(plotArray)
          plotArray = []
        } else {
          // Otherwise, add to the sum
          sum += +i

          // Add point to chart data
          plotArray.push(+i)
        }
      })

      // Add the last one
      plotData.push(plotArray)
      elves.push(sum)

      // Sort them
      elves.sort((a, b) => b - a)

      // Get the largest value for part one
      this.solutions.partOne = elves[0]
      // Sum up three largest for part two
      this.solutions.partTwo = elves[0] + elves[1] + elves[2]

      // Sort snacks per elf
      plotData.forEach(pd => pd.sort((a, b) => b - a))
      // Sort list of elfs
      plotData.sort((one, two) => {
        const totalA = one.reduce((a, b) => a + b)
        const totalB = two.reduce((a, b) => a + b)
        return totalB - totalA
      })
      this.$nextTick(() => this.plot())
    },
    plot: function () {
      if (!this.$refs.partOne) {
        return
      }

      this.$plotly.purge('partOne')

      const maxTraces = Math.max(...plotData.map(pd => pd.length))

      const traces = []
      for (let i = 0; i < maxTraces; i++) {
        traces.push({
          x: plotData.map((_, j) => j),
          y: plotData.map(pd => pd.length > i ? pd[i] : null),
          type: 'bar',
          name: `Snack ${i + 1}`
        })
      }

      this.$plotly.newPlot('partOne', traces, {
        height: 400,
        hovermode: 'x',
        barmode: 'stack',
        showlegend: false,
        margin: { t: 10, b: 40, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          title: { text: 'Elves', font: { color: this.storeDarkMode ? 'white' : 'black' } },
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          title: { text: 'Calories', font: { color: this.storeDarkMode ? 'white' : 'black' } },
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        }
      }, {
        responsive: true,
        displaylogo: false
      })
    }
  }
}
</script>

<style>

</style>
