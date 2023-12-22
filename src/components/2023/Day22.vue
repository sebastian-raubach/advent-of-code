<template>
  <Day :day="22" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div ref="partOne" />
    </template>
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
      const parts = input.map((i, ii) => {
        // Parse start and end points
        const [start, end] = i.split('~')
        const [sx, sy, sz] = start.split(',').map(Number)
        const [ex, ey, ez] = end.split(',').map(Number)
        return {
          start: { x: sx, y: sy, z: sz },
          end: { x: ex, y: ey, z: ez },
          below: [],
          above: [],
          name: `${ii}`
        }
      })

      // Sort them by z,y,x order so the lowest ones come first
      parts.sort((a, b) => Math.min(a.start.z, a.end.z) - Math.min(b.start.z, b.end.z) ||
                           Math.min(a.start.y, a.end.y) - Math.min(b.start.y, b.end.y) ||
                           Math.min(a.start.z, a.end.x) - Math.min(b.start.z, b.end.x))

      this.drop(parts, true)

      const nameMap = {}
      parts.forEach(p => {
        nameMap[p.name] = p
      })

      // Solution one are all those parts that either have no other parts resting on them or those where every brick resting on them also rests on another.
      this.solutions.partOne = parts.filter(p => p.above.length === 0 || p.above.every(op => nameMap[op].below.length > 1)).length

      // Take a copy of the current state
      const copy = JSON.stringify(parts)
      this.solutions.partTwo = parts.map(p => {
        // Remove the current brick
        const parsed = JSON.parse(copy).filter(op => p.name !== op.name)
        return this.drop(parsed, false)
      }).reduce((a, b) => a + b)

      // Plot the result of part 1
      this.$nextTick(() => this.plot(parts))
    },
    getPoints: function (p) {
      // Get the 8 coordinates that make up the brick.
      return [
        { x: p.start.x, y: p.start.y, z: p.start.z },
        { x: p.end.x + 1, y: p.start.y, z: p.start.z },
        { x: p.start.x, y: p.end.y + 1, z: p.start.z },
        { x: p.end.x + 1, y: p.end.y + 1, z: p.start.z },
        { x: p.start.x, y: p.start.y, z: p.end.z + 1 },
        { x: p.end.x + 1, y: p.start.y, z: p.end.z + 1 },
        { x: p.start.x, y: p.end.y + 1, z: p.end.z + 1 },
        { x: p.end.x + 1, y: p.end.y + 1, z: p.end.z + 1 }
      ]
    },
    plot: function (parts) {
      this.$plotly.purge(this.$refs.partOne)

      const traces = []

      let maxZ = 0
      parts.forEach(p => {
        const points = this.getPoints(p)
        maxZ = Math.max(maxZ, Math.max(...points.map(p => p.z)))
        traces.push({
          x: points.map(pp => pp.x),
          y: points.map(pp => pp.y),
          z: points.map(pp => pp.z),
          alphahull: 0,
          opacity: 1,
          type: 'mesh3d'
        })
      })

      this.$plotly.newPlot(this.$refs.partOne, traces, {
        height: maxZ * 10,
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 10
          }
        },
        autosize: true,
        automargin: false,
        showlegend: false,
        margin: { t: 10, b: 40, l: 50, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      }, {
        responsive: true,
        displaylogo: false
      })
    },
    drop: function (parts, cacheUpDown) {
      const dropped = new Set()
      parts.forEach(p => {
        while (p.start.z > 1 && p.end.z > 1) {
          // Get all the potential collisions
          const getZ = parts.filter(op => Math.max(op.start.z, op.end.z) === Math.min(p.start.z, p.end.z) - 1)

          // Remember the ones it touches below
          const touching = this.getTouching(p, getZ)
          if (cacheUpDown) {
            p.below = touching.map(t => t.name)
            // Remember this one is above the others
            touching.forEach(t => t.above.push(p.name))
          }

          if (touching.length > 0) {
            return
          }

          // Decrement
          p.start.z--
          p.end.z--
          // Remember that this one was dropped for part 2 counts
          dropped.add(p.name)
        }
      })
      return dropped.size
    },
    onSegment: function (p, q, r) {
      return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)
    },
    orientation: function (p, q, r) {
      const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

      if (val === 0) {
        return 0 // collinear
      } else {
        return (val > 0) ? 1 : 2 // clock or counterclock wise
      }
    },
    intersect: function (p1, q1, p2, q2) {
      // Find the four orientations needed for general and special cases
      const o1 = this.orientation(p1, q1, p2)
      const o2 = this.orientation(p1, q1, q2)
      const o3 = this.orientation(p2, q2, p1)
      const o4 = this.orientation(p2, q2, q1)

      // General case
      if (o1 !== o2 && o3 !== o4) {
        return true
      }

      // Special Cases
      // p1, q1 and p2 are collinear and p2 lies on segment p1q1
      if (o1 === 0 && this.onSegment(p1, p2, q1)) {
        return true
      }
      // p1, q1 and q2 are collinear and q2 lies on segment p1q1
      if (o2 === 0 && this.onSegment(p1, q2, q1)) {
        return true
      }
      // p2, q2 and p1 are collinear and p1 lies on segment p2q2
      if (o3 === 0 && this.onSegment(p2, p1, q2)) {
        return true
      }
      // p2, q2 and q1 are collinear and q1 lies on segment p2q2
      if (o4 === 0 && this.onSegment(p2, q1, q2)) {
        return true
      }

      return false // Doesn't fall in any of the above cases
    },
    getTouching: function (above, potential) {
      return potential.filter(p => this.intersect(above.start, above.end, p.start, p.end))
    }
  }
}
</script>

<style>
</style>
