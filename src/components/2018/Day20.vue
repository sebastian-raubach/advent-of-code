<template>
  <Day :day="20" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      directions: {
        N: (pos) => pos.y--,
        E: (pos) => pos.x++,
        S: (pos) => pos.y++,
        W: (pos) => pos.x--
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Split into parts, removing the "^" and "$"
      this.regex = input[0].split('').slice(1, input[0].length - 1)
      this.solve()
    },
    solve: function () {
      // Start at the origin
      let current = {
        x: 0,
        y: 0
      }
      let xy = `${current.x},${current.y}`

      // Keep track of path
      const stack = []
      // Keep track of minimal door numbers to get to x,y
      const dist = new Map()

      // 0 doors to get to the start - duh
      dist.set(xy, 0)

      // Iterate through the input
      this.regex.forEach((char, index) => {
        let next
        let prevDist
        // Switch based on the character
        switch (char) {
          case '(':
            // Opening brackets mean a branch, add to the stack
            stack.push({
              x: current.x,
              y: current.y
            })
            break
          case ')':
            // Closing brackets mean popping from the stack
            current = stack.pop()
            break
          case '|':
            // Use, but don't remove the last element in the stack
            current = stack[stack.length - 1]
            break
          default:
            // Otherwise, define a new node
            next = {
              x: current.x,
              y: current.y
            }
            // Modify its position based on the direction
            this.directions[char](next)

            // Get the distance to the previous (current) one
            xy = `${next.x},${next.y}`
            prevDist = dist.get(`${current.x},${current.y}`)

            if (dist.has(xy)) {
              // If there is a distance value for this new position, take the minimum
              dist.set(xy, Math.min(dist.get(xy), prevDist + 1))
            } else {
              // Otherwise use the previous plus one
              dist.set(xy, prevDist + 1)
            }

            // Go to the next position
            current = next
            break
        }
      })

      // The maximum door number is the maximal distance we have observed
      this.solutions.partOne = Math.max(...dist.values())
      // Since we kept track of the shortest distances to each position, just filter based on that
      this.solutions.partTwo = [...dist.values()].filter(v => v >= 1000).length
    }
  }
}
</script>

<style>

</style>
