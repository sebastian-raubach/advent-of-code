<template>
  <Day :day="4" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.parsed = input.map(i => {
        // Split into timestamp and event
        const parts = i.split('] ')
        return {
          // Parse the date
          date: new Date(parts[0].substring(1, parts[0].length)),
          // And store the event
          event: parts[1]
        }
      }).sort((a, b) => a.date - b.date)

      // Keep track of the guard data
      this.guards = {}

      let guardId
      let sleepStart
      let sleepEnd
      // Go through all lines
      for (let i = 0; i < this.parsed.length; i++) {
        const line = this.parsed[i]

        if (line.event.indexOf('Guard ') !== -1) {
          // Parse the guard id
          guardId = +line.event.replace(/\D/g, '')

          if (!this.guards[guardId]) {
            // Then initialize the guard data if it doesn't exist yet
            this.guards[guardId] = {
              total: 0,
              asleep: Array.from(Array(60).keys()).map(i => 0)
            }
          }
        } else if (line.event === 'falls asleep') {
          // Keep track of the start of the asleep interval
          sleepStart = line.date.getMinutes()
        } else if (line.event === 'wakes up') {
          // Stop the asleep interval
          sleepEnd = line.date.getMinutes()

          // Increase all counters for this interval
          for (let min = sleepStart; min < sleepEnd; min++) {
            this.guards[guardId].total++
            this.guards[guardId].asleep[min]++
          }
        }
      }

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Find the guard with the most asleep minutes
      const maxGuard = +Object.keys(this.guards).sort((a, b) => this.guards[b].total - this.guards[a].total)[0]

      let maxMinute = 0
      let maxAmount = 0
      // Then find the minute that this guard spends most asleep
      for (let minute = 0; minute < this.guards[maxGuard].asleep.length; minute++) {
        if (this.guards[maxGuard].asleep[minute] > maxAmount) {
          maxAmount = this.guards[maxGuard].asleep[minute]
          maxMinute = minute
        }
      }

      // The result is the guard id times the minute
      this.solutions.partOne = maxGuard * maxMinute
    },
    solvePartTwo: function () {
      // For each guard
      Object.keys(this.guards).forEach(g => {
        // Find the maximum amount they spend asleep in any minute
        this.guards[g].maxValue = Math.max(...this.guards[g].asleep)
        // Then find the minute which they spend most asleep
        this.guards[g].maxMinute = this.guards[g].asleep.indexOf(this.guards[g].maxValue)
      })

      // Find the guard that has the highest asleep value at any minute
      const maxGuard = +Object.keys(this.guards).sort((a, b) => this.guards[b].maxValue - this.guards[a].maxValue)[0]

      // Then times their id by that minute
      this.solutions.partTwo = maxGuard * this.guards[maxGuard].maxMinute
    }
  }
}
</script>

<style>

</style>
