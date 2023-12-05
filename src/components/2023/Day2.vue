<template>
  <Day :day="2" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      limits: {
        red: 12,
        green: 13,
        blue: 14
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const pattern = /Game (?<game>\d+): (?<dice>.+)/
      let p1 = 0
      let p2 = 0
      input.forEach(i => {
        const res = i.match(pattern).groups

        const game = +res.game
        const sets = res.dice.split('; ').map(t => t.split(', ').map(d => {
          const parts = d.split(' ')
          return {
            color: parts[1],
            count: +parts[0]
          }
        }))

        if (!sets.some(s => s.some(d => d.count > this.limits[d.color]))) {
          p1 += game
        }

        const maxs = {
          red: 0,
          green: 0,
          blue: 0
        }

        sets.forEach(s => {
          s.forEach(d => {
            maxs[d.color] = Math.max(maxs[d.color], d.count)
          })
        })

        console.log(maxs)

        p2 += maxs.red * maxs.green * maxs.blue
      })

      this.solutions.partOne = p1
      this.solutions.partTwo = p2
    }
  }
}
</script>

<style>

</style>
