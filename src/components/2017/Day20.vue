<template>
  <Day :day="20" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      // Parse the input
      const parsed = input.map((i, index) => {
        // Split into p, v, a
        const parts = i.split(', ').map(p => {
          // Split each one into the numbers
          const bits = p.replace('>', '').split('=<')[1].split(',')

          return {
            x: +bits[0],
            y: +bits[1],
            z: +bits[2]
          }
        })

        return {
          id: index,
          p: parts[0],
          v: parts[1],
          a: parts[2]
        }
      })

      // Take a copy
      let data = JSON.parse(JSON.stringify(parsed))
      // Keep track of the min index
      let min = 0
      for (let i = 0; i < 500; i++) {
        // Mininum distance this round
        let minDist = Number.MAX_SAFE_INTEGER
        data.forEach(d => {
          // Move it
          this.move(d)
          // Then calculate distance
          const distance = this.dist(d.p)

          // Keep if smaller
          if (distance < minDist) {
            minDist = distance
            min = d.id
          }
        })
      }
      this.solutions.partOne = min

      // Take a copy
      data = JSON.parse(JSON.stringify(parsed))

      for (let i = 0; i < 500; i++) {
        // Keep track of positions
        const positions = {}
        data.forEach(d => {
          // Move it
          this.move(d)

          // Get the position
          const pos = `${d.p.x},${d.p.y},${d.p.z}`
          // Increase or create the counter for this position
          let prev = positions[pos]
          if (!prev) {
            prev = 0
          }
          prev++
          positions[pos] = prev
        })

        // Only keep those that have a unique position
        data = data.filter(d => positions[`${d.p.x},${d.p.y},${d.p.z}`] < 2)
      }

      this.solutions.partTwo = data.length
    },
    move: function (a) {
      a.v = this.add(a.v, a.a)
      a.p = this.add(a.p, a.v)
    },
    dist: (a) => Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z),
    match: (a, b) => a.x === b.x && a.y === b.y && a.z === b.z,
    add: (a, b) => { return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z } }
  }
}
</script>

<style scoped>
</style>
