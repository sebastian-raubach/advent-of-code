<template>
  <Day :day="4" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" ref="partOne" />
    </template>
  </Day>
</template>

<script>
import { mapGetters } from 'vuex'
import Day from '@/components/Day'

let mapped = null

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
  computed: {
    ...mapGetters([
      'storeDarkMode'
    ])
  },
  watch: {
    storeDarkMode: function () {
      this.plot()
    }
  },
  methods: {
    onInputChanged: function (input) {
      const pattern = /(?<ls>\d+)-(?<le>\d+),(?<rs>\d+)-(?<re>\d+)/
      mapped = input.map(i => {
        const matched = i.match(pattern).groups
        return {
          ls: +matched.ls,
          le: +matched.le,
          rs: +matched.rs,
          re: +matched.re
        }
      })

      // Part one is the count of rows where one is contained in the other
      this.solutions.partOne = mapped.filter(m => (m.ls >= m.rs && m.le <= m.re) || (m.rs >= m.ls && m.re <= m.le)).length
      // Part two is the count of rows where one is contained in the other or where they overlap
      this.solutions.partTwo = mapped.filter(m => (m.ls >= m.rs && m.le <= m.re) || (m.rs >= m.ls && m.re <= m.le) || (m.ls <= m.rs && m.le >= m.rs) || (m.ls <= m.re && m.le >= m.re)).length

      this.$nextTick(() => this.plot())
    },
    plot: function () {
      this.$plotly.purge(this.$refs.partOne)

      const traces = []

      let y = 0
      mapped.forEach(m => {
        const lDist = m.le - m.ls
        const rDist = m.re - m.rs

        if (lDist < rDist) {
          traces.push({
            x: [m.rs, m.re],
            y: [y, y],
            mode: 'lines+markers',
            type: 'scatter',
            line: { color: '#3498db' },
            marker: { color: '#3498db' }
          })
          traces.push({
            x: [m.ls, m.le],
            y: [y, y],
            mode: 'lines+markers',
            type: 'scatter',
            line: { color: '#e74c3c' },
            marker: { color: '#e74c3c' }
          })
        } else {
          traces.push({
            x: [m.ls, m.le],
            y: [y, y],
            mode: 'lines+markers',
            type: 'scatter',
            line: { color: '#e74c3c' },
            marker: { color: '#e74c3c' }
          })
          traces.push({
            x: [m.rs, m.re],
            y: [y, y],
            mode: 'lines+markers',
            type: 'scatter',
            line: { color: '#3498db' },
            marker: { color: '#3498db' }
          })
        }

        y += 2
      })

      this.$plotly.newPlot(this.$refs.partOne, traces, {
        height: traces.length * 4,
        autosize: true,
        automargin: false,
        hovermode: 'closest',
        showlegend: false,
        margin: { t: 10, b: 40, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          title: { text: 'Section', font: { color: this.storeDarkMode ? 'white' : 'black' } },
          tickfont: { color: this.storeDarkMode ? 'white' : 'black' },
          gridcolor: this.storeDarkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          showgrid: false,
          showzeroline: false,
          showticklabels: false
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
