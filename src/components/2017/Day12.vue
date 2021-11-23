<template>
  <Day :day="12" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      const nodes = new Map()

      input.forEach(i => {
        // Split into source and targets
        const parts = i.split(' <-> ')
        // Parse the source
        const left = +parts[0]
        // Parse the targets
        const right = parts[1].split(', ').map(p => +p)

        let source
        // If the source node hasn't already been created, do so
        if (!nodes.has(left)) {
          source = {
            name: left,
            neighbors: new Set()
          }
        } else {
          source = nodes.get(left)
        }

        // For each of the targets
        right.forEach(r => {
          let target
          // If the target node hasn't already been created, do so
          if (!nodes.has(r)) {
            target = {
              name: r,
              neighbors: new Set()
            }
          } else {
            target = nodes.get(r)
          }

          // Add the connection to each
          target.neighbors.add(source)
          source.neighbors.add(target)

          // Store the target back in the map
          nodes.set(r, target)
        })

        // Store the source back in the map
        nodes.set(left, source)
      })

      // We do a DFS from the first node
      // Keep track of visited nodes
      let neighborhood = new Set()
      // Recurse through all neighbors
      this.recurseNeighbors(nodes, 0, neighborhood)
      // The solution is the size of the visited nodes
      this.solutions.partOne = neighborhood.size

      // Reset for part two
      neighborhood = new Set()
      // Count the groups
      let groups = 0
      // Iterate over all nodes
      nodes.forEach((node, name) => {
        // If it has been visited, ignore it, since it's already part of a group
        if (neighborhood.has(name)) {
          return
        }

        // Otherwise, recurse through all its neighbors with DFS
        this.recurseNeighbors(nodes, name, neighborhood)
        // And increase the group counter
        groups++
      })

      this.solutions.partTwo = groups
    },
    recurseNeighbors: function (nodes, current, visited) {
      // If we've visited this one before, return
      if (visited.has(current)) {
        return
      }

      // Mark as visited
      visited.add(current)

      // Recurse through all neighbors
      nodes.get(current).neighbors.forEach(n => this.recurseNeighbors(nodes, n.name, visited))
    }
  }
}
</script>

<style scoped>
</style>
