<template>
  <Day :day="7" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split each row on tab and then map the values to numbers
      // this.values = input[0].split('\t').map(i => +i)
      this.allNodes = input.map(r => {
        // Split into node details and children
        const parts = r.split(' -> ')
        // Replace all brackets, then split on space
        const left = parts[0].replace(/\(/g, '').replace(/\)/g, '').split(' ')
        // Split into individual children
        const right = parts.length > 1 ? parts[1].split(', ') : []

        return {
          parent: null,
          name: left[0],
          weight: +left[1],
          children: right
        }
      })

      this.solve()
    },
    solve: function () {
      // Map from name to node
      const mapping = new Map()

      // Add all nodes
      this.allNodes.forEach(n => mapping.set(n.name, n))

      mapping.forEach(node => {
        // If there are children
        if (node.children.length > 0) {
          node.children = node.children.map(c => {
            // Get their mapping and add them instead of their name
            const child = mapping.get(c)
            // Remember the parent
            child.parent = node
            return child
          })
        }
      })

      // Find the root (the one without a parent)
      let root
      mapping.forEach(node => {
        if (node.parent === null) {
          root = node
        }
      })

      this.solutions.partOne = root.name

      // Solve part two by DFS from the source
      this.recurse(root)
    },
    recurse: function (node) {
      if (node.children.length < 1) {
        // If it's a leaf, return its weight
        return node.weight
      } else {
        // Else, compute the weight of each child by recursion
        const childWeights = node.children.map(_ => 0)
        for (let i = 0; i < node.children.length; i++) {
          // Continue recursion for the child
          childWeights[i] = this.recurse(node.children[i])

          // We found the solution further up
          if (isNaN(childWeights[i])) {
            return NaN
          }
        }

        // Check if there's a value that doesn't match the rest in the array
        const wrongIndex = childWeights.findIndex(count => childWeights.filter(x => x === count).length === 1)

        if (wrongIndex !== -1) {
          // Get the diff between it and the next one over
          const diff = childWeights[(wrongIndex + 1) % childWeights.length] - childWeights[wrongIndex]

          // The solution is the original weight of the child plus the diff
          this.solutions.partTwo = node.children[wrongIndex].weight + diff
          return NaN
        } else {
          // Else, just sum up all children and add them to the original weight
          return node.weight + childWeights.reduce((a, b) => a + b, 0)
        }
      }
    }
  }
}
</script>

<style>

</style>
