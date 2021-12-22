<template>
  <Day :day="22" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      const onCount = new Set()

      const cubes = []

      input.forEach(i => {
        const [onOff, rule] = i.split(' ')

        const coords = rule.split(',').map(d => d.split('=')[1].split('..').map(c => +c))

        // Let's do part one naively
        if (coords[0][1] < -50 || coords[0][0] > 50 || coords[1][1] < -50 || coords[1][0] > 50 || coords[2][1] < -50 || coords[2][0] > 50) {
          // Skip rules that are completely outside the inner box
        } else {
          // Then iterate over all coordinates in the inner box
          for (let x = coords[0][0]; x <= coords[0][1]; x++) {
            for (let y = coords[1][0]; y <= coords[1][1]; y++) {
              for (let z = coords[2][0]; z <= coords[2][1]; z++) {
                // Ignore coordinates in valid rules, but outside of the  inner box
                if (x >= -50 && x <= 50 && y >= -50 && y <= 50 && z >= -50 && z <= 50) {
                  // Get coords
                  const dot = `${x},${y},${z}`

                  // Flip on/off
                  if (onOff === 'on' && !onCount.has(dot)) {
                    onCount.add(dot)
                  } else if (onOff === 'off' && onCount.has(dot)) {
                    onCount.delete(dot)
                  }
                }
              }
            }
          }
        }

        // Remember the cube for part two
        cubes.push({
          on: onOff === 'on',
          xMin: coords[0][0],
          xMax: coords[0][1],
          yMin: coords[1][0],
          yMax: coords[1][1],
          zMin: coords[2][0],
          zMax: coords[2][1]
        })
      })

      // Part one is the number of coordinates still in the set (on)
      this.solutions.partOne = onCount.size

      // Part two, remember all cubes and their on/off status
      let resultingCubes = []
      // For each of the input cubes
      cubes.forEach(c => {
        // Keep track of any sub-cubes that we see due to intersection
        const newCubes = []

        // If this one is on, remember it straight away
        if (c.on) {
          newCubes.push(c)
        }

        // Then for each one that we remembered before
        resultingCubes.forEach(oc => {
          // Get the intersection (flip on/off)
          const intersection = this.intersect(c, oc, !oc.on)

          if (intersection) {
            // Remember the intersection
            newCubes.push(intersection)
          }
        })

        // Remember the new cubes
        resultingCubes = resultingCubes.concat(newCubes)
      })

      // The solution is the sum of all the volumes (depending on their on/off status)
      this.solutions.partTwo = resultingCubes.reduce((a, b) => a + this.volume(b) * (b.on ? 1 : -1), 0)
    },
    volume: function (c) {
      // Get the volume (remember the inclusivity of the edges (+1))
      return (c.xMax - c.xMin + 1) * (c.yMax - c.yMin + 1) * (c.zMax - c.zMin + 1)
    },
    intersect: function (a, b, on) {
      // If they don't overlap in any dimension, return null
      if (a.xMin > b.xMax || a.xMax < b.xMin || a.yMin > b.yMax || a.yMax < b.yMin || a.zMin > b.zMax || a.zMax < b.zMin) {
        return null
      }
      // Else return the intersection
      return {
        on: on,
        xMin: Math.max(a.xMin, b.xMin),
        xMax: Math.min(a.xMax, b.xMax),
        yMin: Math.max(a.yMin, b.yMin),
        yMax: Math.min(a.yMax, b.yMax),
        zMin: Math.max(a.zMin, b.zMin),
        zMax: Math.min(a.zMax, b.zMax)
      }
    }
  }
}
</script>

<style scoped>
</style>
