<template>
  <Day :day="23" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      let maxR = 0
      let max = null
      const points = input.map(i => {
        const parts = i.split('>, r=')
        const coords = parts[0].replace('pos=<', '').split(',').map(c => +c)
        const r = +parts[1]
        const p = {
          x: coords[0],
          y: coords[1],
          z: coords[2],
          r: r
        }

        if (r > maxR) {
          maxR = r
          max = p
        }

        return p
      })

      this.solutions.partOne = points.filter(p => this.manhattan(p, max) <= max.r).length
    },
    manhattan: function (a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)
    }
  }
}
</script>

<style>

</style>
