<template>
  <Day :day="1" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
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
      if (this.trace.x.length > 0) {
        this.plot()
      }
    }
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      directions: ['N', 'E', 'S', 'W'],
      move: {
        N: (curr, amount) => { curr[1] += amount },
        E: (curr, amount) => { curr[0] += amount },
        S: (curr, amount) => { curr[1] -= amount },
        W: (curr, amount) => { curr[0] -= amount }
      },
      trace: {
        x: [],
        y: []
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const directions = input[0].split(', ').map(i => {
        return {
          turn: i.substring(0, 1),
          move: +i.substring(1, i.length)
        }
      })

      this.trace = {
        x: [],
        y: []
      }

      this.solutions = {
        partOne: null,
        partTwo: null
      }

      // Keep track of the current position
      const curr = {
        pos: [0, 0],
        dir: 'N'
      }

      // Remember visited positions
      const memory = new Set()

      // For each instruction
      directions.forEach(d => {
        // Keep a copy of the current position before moving
        const prev = {
          pos: curr.pos.concat()
        }

        // Based on the turn, calculate the direction delta
        const delta = d.turn === 'R' ? 1 : -1
        // Adjust the direction accordingly
        curr.dir = this.directions[this.mod((this.directions.indexOf(curr.dir) + delta), this.directions.length)]
        // Move in the new direction
        this.move[curr.dir](curr.pos, d.move)

        const match = this.walk(prev.pos, curr.pos, memory)
        // If we haven't found solution part two yet
        if (!this.solutions.partTwo) {
          // Check if there's a previously visited coordinate on the just walked path
          this.solutions.partTwo = match
        }
      })

      // Solution part one is the manhattan distance between the origin and the target
      this.solutions.partOne = Math.abs(curr.pos[0]) + Math.abs(curr.pos[1])

      this.$nextTick(() => this.plot())
    },
    walk: function (a, b, mem) {
      this.trace.x.push(b[0])
      this.trace.y.push(b[1])

      // Check whether it's x or y coordinate that's different
      const index = a[0] !== b[0] ? 0 : 1

      // Calculate min and max
      const minX = Math.min(a[index], b[index])
      const maxX = Math.max(a[index], b[index])

      // Iterate between min and max
      for (let i = minX + 1; i < maxX; i++) {
        const coords = index === 0 ? `${i},${a[1]}` : `${a[0]},${i}`

        if (mem.has(coords)) {
          // If visited before, return manhattan distance
          return Math.abs(i) + Math.abs(a[1 - index])
        } else {
          // Else add to memory
          mem.add(coords)
        }
      }
    },
    plot: function () {
      this.$plotly.purge('partOne')

      const traces = [this.trace]

      this.$plotly.newPlot('partOne', traces, {
        height: 250,
        margin: { t: 10, b: 20, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          tickfont: { color: this.darkMode ? 'white' : 'black' },
          gridcolor: this.darkMode ? '#111111' : '#eeeeee'
        },
        yaxis: {
          title: { text: 'Ranking', font: { color: this.darkMode ? 'white' : 'black' } },
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

<style>

</style>
