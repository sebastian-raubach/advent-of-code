<template>
  <Day :day="14" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <div id="partTwo" />
    </template>
  </Day>
</template>

<script>
import { mapGetters } from 'vuex'
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
      traces: {
        partTwo: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ])
  },
  watch: {
    darkMode: function () {
      this.plot()
    }
  },
  methods: {
    onInputChanged: function (input) {
      const pattern = /(?<name>.+) can fly (?<speed>\d+) km\/s for (?<duration>\d+) seconds, but then must rest for (?<rest>\d+) seconds./
      const reindeer = input.map(i => {
        const res = i.match(pattern)

        return {
          name: res.groups.name,
          speed: +res.groups.speed,
          duration: +res.groups.duration,
          rest: +res.groups.rest,
          score: 0,
          distance: 0
        }
      })

      const time = 2503

      reindeer.forEach(r => {
        r.distance = this.calculateDistance(r, time)
      })
      this.solutions.partOne = reindeer.sort((a, b) => b.distance - a.distance)[0].distance

      const traces = reindeer.map(r => {
        return {
          x: [],
          y: [],
          type: 'scatter',
          mode: 'lines',
          line: { shape: 'hv' },
          name: r.name
        }
      })

      for (let i = 1; i <= time; i++) {
        reindeer.forEach((r, index) => {
          r.distance = this.calculateDistance(r, i)
        })

        const max = Math.max(...reindeer.map(r => r.distance))

        reindeer.forEach((r, index) => {
          if (r.distance === max) {
            r.score++
          }
          traces[index].x.push(i)
          traces[index].y.push(r.score)
        })
      }

      this.traces.partTwo = traces

      this.solutions.partTwo = reindeer.sort((a, b) => b.score - a.score)[0].score

      this.plot()
    },
    calculateDistance: function (r, time) {
      const interval = Math.floor(time / (r.duration + r.rest))
      const remainder = time - interval * (r.duration + r.rest)
      return interval * r.speed * r.duration + Math.min(r.duration, remainder) * r.speed
    },
    plot: function () {
      if (this.traces.partTwo) {
        this.$nextTick(() => {
          this.$plotly.purge('partTwo')

          this.$plotly.newPlot('partTwo', this.traces.partTwo, {
            height: 400,
            hovermode: 'x',
            margin: { t: 10, b: 20, l: 50, r: 0 },
            legend: {
              orientation: 'h',
              font: { color: this.darkMode ? 'white' : 'black' }
            },
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
        })
      }
    }
  }
}
</script>

<style>

</style>
