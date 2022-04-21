<template>
  <Day :day="9" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      const cities = new Set()
      const routes = input.map(r => {
        const [points, distance] = r.split(' = ')
        const [source, target] = points.split(' to ')

        cities.add(source)
        cities.add(target)

        return {
          points: [source, target],
          distance: +distance
        }
      })

      let min = Number.MAX_SAFE_INTEGER
      let max = 0
      // For each possible starting position
      cities.forEach(c => {
        // Get the min and max distance required to visit all cities
        min = Math.min(this.recurse(c, routes, [], Array.from(cities), Math.min), min)
        max = Math.max(this.recurse(c, routes, [], Array.from(cities), Math.max), max)
      })

      this.solutions.partOne = min
      this.solutions.partTwo = max
    },
    recurse: function (current, routes, visited, remaining, agg) {
      // Add current to visited and remove it from remaining
      visited.push(current)
      remaining = remaining.filter(r => r !== current)

      // If there are unvisited cities remining
      if (remaining.length > 0) {
        // Get all the possible distances from here
        const distances = []

        routes.filter(r => {
          // Get routes that connect to the current location but the target hasn't been visited yet
          return (r.points[0] === current && !visited.includes(r.points[1])) || (r.points[1] === current && !visited.includes(r.points[0]))
        })
          .forEach(r => {
            // Add the distance to the array assuming we travel along this route and continue recursively
            distances.push(this.recurse(r.points.filter(p => p !== current)[0], routes, visited.concat(), remaining.concat(), agg) + r.distance)
          })

        // Return the aggregate (min or max) of all distances
        return agg(...distances)
      } else {
        // If there is nowhere left to travel, return 0 distance
        return 0
      }
    }
  }
}
</script>

<style>

</style>
