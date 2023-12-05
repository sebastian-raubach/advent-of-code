<template>
  <Day :day="16" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const pattern = /Valve (?<source>[A-Z]{2}) has flow rate=(?<rate>\d+); tunnel[s]? lead[s]? to valve[s]? (?<targets>[A-Z,\s]+)/

      const map = new Map()

      input.forEach(i => {
        const g = i.match(pattern).groups

        const valve = {
          name: g.source,
          rate: +g.rate,
          targets: g.targets.split(', '),
          isOpen: true
        }

        map.set(valve.name, valve)
      })

      map.forEach(valve => {
        valve.targets = valve.targets.map(t => map.get(t))
      })

      // let current = map.get('AA')
      // let countdown = 30
      // while (map.values().filter(v => v.isOpen === false && v.rate > 0)) {
      //   const next = current.targets.filter(t => t.isOpen === false).sort((a, b) => a.rate - b.rate)[0]
      // }
    }
  }
}
</script>

<style>
</style>
