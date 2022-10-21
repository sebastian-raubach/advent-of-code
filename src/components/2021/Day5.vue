<template>
  <Day :day="5" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" width="800" height="500" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="800" height="500" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createColorGradient } from '@/util/color'

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
      const points = []
      input.forEach(r => {
        const coords = r.split(' -> ').map(c => c.split(',').map(i => +i))
        if (coords[0][0] === coords[1][0]) {
          // Same x
          coords.sort((a, b) => a[1] - b[1])
          for (let i = 0; i <= coords[1][1] - coords[0][1]; i++) {
            points.push({
              x: coords[0][0],
              y: coords[0][1] + i,
              diag: false
            })
          }
        } else if (coords[0][1] === coords[1][1]) {
          // Same y
          coords.sort((a, b) => a[0] - b[0])
          for (let i = 0; i <= coords[1][0] - coords[0][0]; i++) {
            points.push({
              x: coords[0][0] + i,
              y: coords[0][1],
              diag: false
            })
          }
        } else {
          // Diagonal
          // Sort by x
          coords.sort((a, b) => a[0] - b[0])
          // Then determine delta x and y
          const deltaX = Math.sign(coords[1][0] - coords[0][0])
          const deltaY = Math.sign(coords[1][1] - coords[0][1])

          for (let i = 0; i <= coords[1][0] - coords[0][0]; i++) {
            points.push({
              x: coords[0][0] + deltaX * i,
              y: coords[0][1] + deltaY * i,
              diag: true
            })
          }
        }
      })

      const map = new Map()
      // Only use points that aren't diagonal
      this.solutions.partOne = points.filter(p => !p.diag).map(p => this.addToMap(p, map)).filter(p => p > 0).length
      this.$nextTick(() => this.draw(map, 'partOne'))

      const map2 = new Map()
      // Use all points this time
      this.solutions.partTwo = points.map(p => this.addToMap(p, map2)).filter(p => p > 0).length
      this.$nextTick(() => this.draw(map2, 'partTwo'))
    },
    addToMap: function (p, map) {
      const c = `${p.x},${p.y}`
      if (map.has(c)) {
        // Increase the counter
        const oldValue = map.get(c)
        map.set(c, oldValue + 1)

        // Count how many have 2 or more
        if (oldValue === 1) {
          return 1
        } else {
          return 0
        }
      } else {
        map.set(c, 1)
        return 0
      }
    },
    draw: function (map, id) {
      let minX = Number.MAX_SAFE_INTEGER
      let maxX = -Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxY = -Number.MAX_SAFE_INTEGER
      let maxV = 0

      map.forEach((value, key) => {
        const coords = key.split(',').map(c => +c)
        minX = Math.min(minX, coords[0])
        minY = Math.min(minY, coords[1])
        maxX = Math.max(maxX, coords[0])
        maxY = Math.max(maxY, coords[1])
        maxV = Math.max(maxV, value)
      })

      const gradient = createColorGradient('#C4E538', '#006266', maxV)

      // Initialise the canvas
      const canvas = document.getElementById(id)
      const ctx = canvas.getContext('2d')
      // Set the canvas size
      canvas.width = minX + maxX
      canvas.height = minY + maxY

      map.forEach((value, key) => {
        const coords = key.split(',').map(c => +c)

        ctx.fillStyle = gradient[value - 1]
        ctx.fillRect(coords[0], coords[1], 1, 1)
      })
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 800px;
  width: 100%;
}
</style>
