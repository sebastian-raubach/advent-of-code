<template>
  <div>
    <h1>Statistics</h1>
    <h2>Input</h2>
    <p>Paste your private leaderboard API JSON into this text area to see some stats.</p>
    <b-form @submit.prevent>
      <b-form-group label="JSON API input" label-for="json" description="The JSON API output of a leaderboard.">
        <b-form-textarea v-model="input" rows=5 id="json" />
      </b-form-group>
    </b-form>

    <template v-if="json">
      <h2>Stats overview</h2>
      <p>Hover over the stars to see the timestamps for part 1 and part 2 as well as the user's ranking for the day.</p>
      <b-table table-class="star-table mt-3" :items="json" :fields="fields" stacked="sm" sort-by="local_score" :sort-desc="true">
        <template #cell(days)="data">
          <template v-for="day in tasks" >
            <span :key="`${data.id}-${day}`" v-b-tooltip.body.html="getTooltip(day, data.item.completion_day_level[day])" class="star star-gold" v-if="data.item.completion_day_level[day] && data.item.completion_day_level[day][2]">★</span>
            <span :key="`${data.id}-${day}`" v-b-tooltip.body.html="getTooltip(day, data.item.completion_day_level[day])" class="star star-silver" v-else-if="data.item.completion_day_level[day] && data.item.completion_day_level[day][1]">★</span>
            <span :key="`${data.id}-${day}`" class="star star-none" v-else>☆</span>
          </template>
        </template>
      </b-table>
    </template>

    <template v-if="userTraces">
      <h2>Points over time</h2>
      <div id="timeline-chart" class="my-3" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      input: null,
      tasks: Array.from(Array(25).keys()).map(i => i + 1),
      fields: [{
        key: 'name',
        label: 'Name',
        sortable: true
      }, {
        key: 'local_score',
        label: 'Score',
        sortable: true
      }, {
        key: 'stars',
        label: 'Stars',
        sortable: true
      }, {
        key: 'days',
        label: 'Days',
        class: 'stars'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ]),
    json: function () {
      if (this.input) {
        try {
          const parsed = JSON.parse(this.input)

          return Object.keys(parsed.members).map(m => parsed.members[m]).sort((a, b) => a.local_score - b.local_score).filter(user => user.stars > 0)
        } catch (err) {
          return null
        }
      } else {
        return null
      }
    },
    userTraces: function () {
      if (this.json) {
        return this.json.map(user => {
          let cumulative = 0
          const values = []
          values.push(cumulative)
          for (let day = 0; day < this.tasks.length; day++) {
            if (user.completion_day_level[day + 1]) {
              const partOneTimestamp = user.completion_day_level[day + 1][1] ? +user.completion_day_level[day + 1][1].get_star_ts : null
              const partTwoTimestamp = user.completion_day_level[day + 1][2] ? +user.completion_day_level[day + 1][2].get_star_ts : null

              if (partOneTimestamp) {
                const partOneIndex = this.sortedUsersPerDay[day].partOne.indexOf(partOneTimestamp)
                cumulative += this.json.length - partOneIndex
              }
              if (partTwoTimestamp) {
                const partTwoIndex = this.sortedUsersPerDay[day].partTwo.indexOf(partTwoTimestamp)
                cumulative += this.json.length - partTwoIndex
              }

              if (partOneTimestamp || partTwoTimestamp) {
                values.push(cumulative)
              }
            }
          }

          return values
        })
      } else {
        return null
      }
    },
    sortedUsersPerDay: function () {
      if (this.json) {
        return this.tasks.map(d => {
          const dailyTimesOne = this.json.map(p => {
            if (p.completion_day_level[d] && p.completion_day_level[d][1]) {
              return +p.completion_day_level[d][1].get_star_ts
            } else {
              return null
            }
          })
          const dailyTimesTwo = this.json.map(p => {
            if (p.completion_day_level[d] && p.completion_day_level[d][2]) {
              return +p.completion_day_level[d][2].get_star_ts
            } else {
              return null
            }
          })

          dailyTimesOne.sort()
          dailyTimesTwo.sort()

          return {
            partOne: dailyTimesOne,
            partTwo: dailyTimesTwo
          }
        })
      } else {
        return null
      }
    }
  },
  watch: {
    darkMode: function () {
      this.$nextTick(() => this.updateChart())
    },
    userTraces: function () {
      this.$nextTick(() => this.updateChart())
    }
  },
  methods: {
    updateChart: function () {
      this.$plotly.purge('timeline-chart')

      const traces = this.userTraces.map((ut, ui) => {
        return {
          x: ut.map((v, i) => i),
          y: ut,
          name: this.json[ui].name,
          mode: 'lines+markers'
        }
      })

      this.$plotly.newPlot('timeline-chart', traces, {
        height: 350 + this.userTraces.length / 5 * 10,
        margin: { t: 10, b: 10, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          title: { text: 'Points', font: { color: this.darkMode ? 'white' : 'black' } },
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        },
        legend: {
          bgcolor: 'rgba(0,0,0,0)',
          orientation: 'h',
          traceorder: 'reversed',
          font: { color: this.darkMode ? 'white' : 'black' }
        }
      }, {
        responsive: true,
        displaylogo: false
      })
    },
    getTooltip: function (day, data) {
      let result = `<p>Day ${day}</p>`
      if (data[1] && data[1].get_star_ts) {
        result += `<p>Part 1: ${new Date(+data[1].get_star_ts * 1000).toLocaleString()} Position: ${this.sortedUsersPerDay[day - 1].partOne.indexOf(+data[1].get_star_ts) + 1}</p>`
      }
      if (data[2] && data[2].get_star_ts) {
        result += `<p>Part 2: ${new Date(+data[2].get_star_ts * 1000).toLocaleString()} Position: ${this.sortedUsersPerDay[day - 1].partTwo.indexOf(+data[2].get_star_ts) + 1}</p>`
      }
      return result
    }
  }
}
</script>

<style>
.star-table td.stars div {
  word-break: break-all;
  cursor: default;
}
.star {
  font-size: 1.3em;
}
.star-gold {
  color: #fbc531;
}
.star-silver {
  color: #7f8fa6;
}
.star-none {
  color: #dcdde1;
}
</style>
