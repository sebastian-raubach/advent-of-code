<template>
  <Day :day="14" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      this.recipeTarget = +input[0]

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Define the two nodes of the circular linked list
      const first = {
        value: 3
      }
      let last = {
        value: 7
      }
      // Define their neighbors
      last.next = first
      first.next = last
      // Elves start on those two
      const elves = [first, last]

      // Keep track of the recipe count
      let recipeCount = 2
      // While we need to produce more
      while (recipeCount < this.recipeTarget + 10) {
        // Get the recipe values
        const values = [elves[0].value, elves[1].value]
        // Construct the new recipe
        const newRecipe = values[0] + values[1]
        // Split the digits
        const digits = `${newRecipe}`.split('').map(c => +c)
        // Increase the recipe counter
        recipeCount += digits.length

        // For each digit
        digits.forEach(d => {
          // Create a new node
          const node = {
            value: d,
            next: first
          }
          // Add it to the end
          last.next = node
          last = node
        })

        // Use the new values to adjust elf indices
        values.forEach((value, index) => {
          // Move forward value + 1 steps
          for (let i = 0; i < value + 1; i++) {
            elves[index] = elves[index].next
          }
        })
      }

      // Start at the beginning
      let node = first
      // Step through the first recipes to the target count
      for (let i = 0; i < this.recipeTarget; i++) {
        node = node.next
      }
      // Now start tracking the 10 recipes scores right after
      const result = []
      for (let i = 0; i < 10; i++) {
        result.push(node.value)
        node = node.next
      }

      // Concatenate them together
      this.solutions.partOne = result.join('')
    },
    solvePartTwo: function () {
      // Split the input into its digits
      const targetString = `${this.recipeTarget}`
      const targetDigits = targetString.split('').map(c => +c)

      // Define the two nodes of the circular linked list
      const first = {
        value: 3
      }
      let last = {
        value: 7
      }
      // Define their neighbors
      last.next = first
      first.next = last
      // Elves start on those two
      const elves = [first, last]

      let totalLength = 2
      let matched = []

      while (true) {
        // Get the recipe values
        const values = [elves[0].value, elves[1].value]
        // Construct the new recipe
        const newRecipe = values[0] + values[1]
        // Split the digits
        const digits = `${newRecipe}`.split('').map(c => +c)

        for (let i = 0; i < digits.length; i++) {
          const value = digits[i]
          totalLength++

          if (value === targetDigits[matched.length]) {
            matched.push(value)
          } else {
            do {
              matched = matched.slice(1)
            } while (matched.length > 0 && !targetString.startsWith(matched.join('')))

            if (value === targetDigits[matched.length]) {
              matched.push(value)
            }
          }

          if (matched.length === targetDigits.length) {
            this.solutions.partTwo = totalLength - targetDigits.length
            return
          }

          const node = {
            value: value,
            next: first
          }
          last.next = node
          last = node
        }

        // Use the new values to adjust elf indices
        values.forEach((value, index) => {
          // Move forward value + 1 steps
          for (let i = 0; i < value + 1; i++) {
            elves[index] = elves[index].next
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
