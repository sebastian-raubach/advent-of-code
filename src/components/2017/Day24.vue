<template>
  <Day :day="24" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      map: null,
      longestBridge: {
        length: 0,
        strength: 0
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const components = input.map(i => i.split('/').map(p => +p))

      this.map = new Map()
      components.forEach(c => {
        // Find the components that fit at the end of the current one
        const matchSecond = components.filter(d => !(c[0] === d[0] && c[1] === d[1])).filter(d => c[1] === d[0] || c[1] === d[1]).map(d => {
          if (c[1] === d[0]) {
            return d
          } else {
            return d.concat().reverse()
          }
        })
        // Find the components that fit at the start of the current one (reverse)
        const matchFirst = components.filter(d => !(c[0] === d[0] && c[1] === d[1])).filter(d => c[0] === d[0] || c[0] === d[1]).map(d => {
          if (c[0] === d[0]) {
            return d
          } else {
            return d.concat().reverse()
          }
        })

        // Store the mapping
        this.map.set(c.join('/'), matchSecond)
        if (c[0] !== c[1]) {
          this.map.set(c.concat().reverse().join('/'), matchFirst)
        }
      })

      this.solutions.partOne = this.recurse(components, [])
      this.solutions.partTwo = this.longestBridge.strength
    },
    recurse: function (components, used) {
      let max = 0
      if (used.length === 0) {
        // Find the roots
        const roots = components.filter(i => i[0] === 0 || i[1] === 0).map(i => i[1] === 0 ? i.concat().reverse() : i)
        roots.forEach(r => {
          // For each, start the recursion and keep the max
          max = Math.max(max, this.recurse(components, [r]))
        })
      } else {
        // Find the matching elements that haven't been used yet
        const matches = this.findMatches(used)

        if (matches.length === 0) {
          // If there aren't any, sum up the result and return it
          const sum = used.map(u => u[0] + u[1]).reduce((a, b) => a + b, 0)

          if ((used.length > this.longestBridge.length) || (used.length === this.longestBridge.length && sum > this.longestBridge.strength)) {
            this.longestBridge = {
              length: used.length,
              strength: sum
            }
          }

          return sum
        } else {
          // Else, for each match
          matches.forEach(m => {
            // Take a copy of the used elements
            const arr = used.concat()
            // Add the match
            arr.push(m)
            // And continue the recursion
            max = Math.max(max, this.recurse(components, arr))
          })
        }
      }

      return max
    },
    findMatches: function (used) {
      // Get the current component
      const current = used[used.length - 1]
      // Keep track of all the used ones
      const usedStrings = new Set()
      used.forEach(u => {
        usedStrings.add(`${u[0]}/${u[1]}`)
        usedStrings.add(`${u[1]}/${u[0]}`)
      })

      // Get the matches from the map
      const matches = this.map.get(current.join('/'))

      // And return only those matches that haven't been used yet
      return matches.filter(c => !usedStrings.has(`${c[0]}/${c[1]}`) && !usedStrings.has(`${c[1]}/${c[0]}`))
    }
  }
}
</script>

<style scoped>
</style>
