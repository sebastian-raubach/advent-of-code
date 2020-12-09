<template>
  <Day :day="7" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-7.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      bagMapping: {},
      reverseMapping: {}
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.bagMapping = {}
      this.reverseMapping = {}

      input.forEach(i => {
        // Replace all occurances of "bag" or "bags" and remove "."s
        i = i.replace(/bag(s)?/g, '').replace(/\./g, '')
        // Split into the parent and child
        const parts = i.split(' contain ')
        // Trim
        const source = parts[0].trim()
        // Split the children
        const targets = parts[1].split(', ').map(s => {
          // Get the number
          let number = s.replace(/\D/g, '')
          // And the color
          const color = s.replace(/[0-9]/g, '')

          // If there is no number assume 0
          if (number.length === 0) {
            number = 0
          }

          // Return the object
          return {
            color: color.trim(),
            quantity: +number
          }
        })

        // Store the mapping
        this.bagMapping[source] = targets

        // Then store the reverse mapping
        targets.forEach(t => {
          if (!this.reverseMapping[t.color]) {
            this.reverseMapping[t.color] = []
          }

          this.reverseMapping[t.color].push({ color: source, quantity: t.quantity })
        })
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Store current bags on a queue
      const current = []
      // Remember the visited nodes
      const visited = new Set()

      // Add the starting bag
      current.push('shiny gold')

      // While there are bags to visit
      while (current.length > 0) {
        // Get the first
        const bag = current.shift()

        // Get its parents
        const parents = this.reverseMapping[bag]

        if (!parents) {
          // If there aren't any, add it to the visited nodes
          visited.add(bag)
        } else {
          // Else, add all parents
          parents.forEach(p => {
            visited.add(p.color)
            current.push(p.color)
          })
        }
      }

      this.solutions.partOne = visited.size
    },
    solvePartTwo: function () {
      // Count the number of bags
      let counter = 0
      // Store the current bags on a queue
      const current = []
      // Add the query
      current.push({ color: 'shiny gold', quantity: 1 })

      // While there are bags on the queue
      while (current.length > 0) {
        // Get the first
        const bag = current.shift()

        // Get all children
        const children = this.bagMapping[bag.color]

        if (children) {
          // If there are any add them on the queue with the quantities
          children.forEach(c => {
            counter += bag.quantity * c.quantity
            current.push({
              color: c.color,
              quantity: bag.quantity * c.quantity
            })
          })
        }
      }

      this.solutions.partTwo = counter
    }
  }
}
</script>

<style>

</style>
