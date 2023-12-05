<template>
  <Day :day="15" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const sensors = []
      const beacons = []

      const pattern = /Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)/

      let minX = Number.MAX_VALUE
      let maxX = -Number.MAX_VALUE
      input.forEach(i => {
        const g = i.match(pattern).groups

        const s = { x: +g.sx, y: +g.sy }
        const b = { x: +g.bx, y: +g.by }

        const dist = this.manhattan(s, b)

        b.s = s
        s.b = b
        s.r = dist

        sensors.push(s)
        beacons.push(b)

        minX = Math.min(minX, s.x - dist)
        maxX = Math.max(maxX, s.x + dist)
      })

      const y = 2000000

      let counter = 0
      for (let x = minX; x <= maxX; x++) {
        for (const s of sensors) {
          if (beacons.some(b => b.x === x && b.y === y) || sensors.some(s => s.x === x && s.y === y)) {
            continue
          }
          if (this.manhattan({ x, y }, s) <= s.r) {
            counter++
            break
          }
        }
      }
      this.solutions.partOne = counter

      const checked = new Set()

      for (const s of sensors) {
        const min = 0
        const max = 4000000

        let x = s.x
        let y = s.y - s.r - 1
        let dx = 1
        let dy = 1

        while (true) {
          if (!checked.has(`${x},${y}`)) {
            if (x >= min && x <= max && y >= min && y <= max) {
              if (sensors.every(os => this.manhattan({ x, y }, os) > os.r)) {
                this.solutions.partTwo = x * 4000000 + y
                return
              }
            }
            checked.add(`${x},${y}`)
          }

          x += dx
          y += dy

          if (x === s.x) {
            dy = -dy
          }
          if (y === s.y) {
            dx = -dx
          }
          if (x === s.x && y === s.y - s.r - 1) {
            // We've reached the start again
            break
          }
        }

        // for (let x = Math.max(s.x - s.r - 1, min); x <= Math.min(s.x + s.r, max); x++) {
        //   for (let y = Math.max(s.y - s.r - 1, min); y <= Math.min(s.y + s.r, max); y++) {
        //     if (checked.has(`${x},${y}`)) {
        //       continue
        //     } else {
        //       checked.add(`${x},${y}`)
        //       if (this.manhattan({ x, y }, s) === s.r + 1) {
        //         if (sensors.every(os => this.manhattan({ x, y }, os) > os.r)) {
        //           this.solutions.partTwo = `${x},${y}`
        //           return
        //         }
        //       }
        //     }
        //   }
        // }
      }
    },
    manhattan: function (a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }
  }
}
</script>

<style>
</style>
