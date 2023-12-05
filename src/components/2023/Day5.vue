<template>
  <Day :day="5" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { mapGetters } from 'vuex'

import Plotly from 'plotly.js-dist-min'
import { VIRIDIS } from '@/util/color'

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
  methods: {
    onInputChanged: function (input) {
      const seeds = input[0].split(': ')[1].split(' ').map(Number)
      const mapping = []

      let current = []
      for (let i = 2; i < input.length; i++) {
        if (input[i] === '') {
          mapping.push(current)
          current = []
          i++
        } else {
          const [destination, source, size] = input[i].split(' ').map(Number)
          current.push({
            from: source,
            to: destination,
            size: size
          })
        }
      }

      mapping.push(current)

      const traces = []
      this.solutions.partOne = seeds.map(s => {
        const result = this.solve(mapping, s)
        traces.push(result.trace)
        return result.value
      }).sort((a, b) => a - b)[0]

      this.$nextTick(() => this.plot(traces))

      let min = Number.MAX_SAFE_INTEGER
      for (let i = 1; i < seeds.length; i += 2) {
        const start = seeds[i - 1]
        const size = seeds[i]
        for (let j = 0; j < size; j++) {
          min = Math.min(min, this.solve(mapping, start + j).value)
        }
      }

      this.solutions.partTwo = min
    },
    plot: function (data) {
      Plotly.purge('partOne')

      const dims = ['seeds', 'seeds-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location']
      const colors = VIRIDIS

      const traces = [{
        type: 'parcoords',
        line: {
          color: [],
          colorscale: colors.map((c, i) => [i / (colors.length - 1), c])
        },
        dimensions: dims.map(d => {
          return {
            label: d,
            values: [],
            range: [Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER]
          }
        })
      }]

      data.forEach(d => {
        d.forEach((p, i) => {
          const dim = traces[0].dimensions[i]
          dim.values.push(p)
          dim.range[0] = Math.min(dim.range[0], p)
          dim.range[1] = Math.max(dim.range[1], p)
        })
      })

      data.forEach(d => {
        const v = d[d.length - 1]
        const dim = traces[0].dimensions[traces[0].dimensions.length - 1]

        traces[0].line.color.push((v - dim.range[0]) / (dim.range[1] - dim.range[0]))
      })

      Plotly.newPlot('partOne', traces, {
        height: 600,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          title: { text: 'Ranking', font: { color: this.storeDarkMode ? 'white' : 'black' } },
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        }
      }, {
        responsive: true,
        displaylogo: false
      })
    },
    solve: function (mapping, s) {
      let current = s
      const trace = [s]
      for (let i = 0; i < mapping.length; i++) {
        for (let j = 0; j < mapping[i].length; j++) {
          const rule = mapping[i][j]
          if (current >= rule.from && current <= rule.from + rule.size) {
            current = rule.to + Math.abs(current - rule.from)
            break
          }
        }

        trace.push(current)
      }
      return {
        value: current,
        trace: trace
      }
    }
  }
}
</script>

<style>

</style>
