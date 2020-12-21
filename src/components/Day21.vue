<template>
  <Day :day="21" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-21.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Get all ingredients
      this.ingredients = new Set()
      // Keep track of all foods
      this.foods = input.map(i => {
        const parts = i.split(' (contains ')
        const ingredients = parts[0].split(' ')
        const allergens = parts[1].replace(/\)/g, '').split(', ')

        ingredients.forEach(i => this.ingredients.add(i))

        return {
          ingredients: new Set(ingredients),
          allergens: new Set(allergens)
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Map allergens to ingredients
      this.allergens = new Map()
      // Naively add all ingredients to an allergen
      this.foods.forEach(f => {
        f.allergens.forEach(a => {
          // Add ALL ingredients to the allergen
          this.allergens.set(a, new Set(this.ingredients))
        })
      })

      // Now we reduce the mapping by excluding the ones that don't occur in all foods that have the allergen
      // Iterate all allergen to ingredient mappings
      this.allergens.forEach((ingredients, allergen) => {
        // Go through all foods
        this.foods.forEach(f => {
          // Ignore the ones that don't have the allergen
          if (!f.allergens.has(allergen)) {
            return
          }
          // For each of the ingredients that could contain the allergen
          for (const i of new Set(ingredients)) {
            // If they aren't in the food
            if (!f.ingredients.has(i)) {
              // Remove them
              ingredients.delete(i)
            }
          }
        })
      })

      // Keep track of the safe ingredients
      const safeIngredients = new Set(this.ingredients)
      // Iterate all mappings
      this.allergens.forEach((ingredients, allergen) => {
        // Remove all ingredients that are possible candidates for an allergen
        ingredients.forEach(i => safeIngredients.delete(i))
      })

      let count = 0
      this.foods.forEach(f => {
        for (const ingredient of f.ingredients) {
          count += safeIngredients.has(ingredient)
        }
      })

      this.solutions.partOne = count
    },
    solvePartTwo: function () {
      const list = []
      const allergensLeft = new Set(this.allergens.keys())
      const allergenCount = this.allergens.size

      // While we haven't identified them all yet
      while (list.length < allergenCount) {
        // Go through all remaining allergens
        for (const aLeft of allergensLeft) {
          // If there's only one ingredient that can have it
          if (this.allergens.get(aLeft).size === 1) {
            // Get the only one in the set
            const ingredient = this.allergens.get(aLeft).values().next().value
            // Add it to the list
            list.push({
              ingredient: ingredient,
              allergen: aLeft
            })

            // Delete it from the remaining list
            allergensLeft.delete(aLeft)

            // For each allergen
            this.allergens.forEach((ingredients, allergen) => {
              if (allergen !== aLeft) {
                // Delete the ingredient from the list
                ingredients.delete(ingredient)
              }
            })
          }
        }
      }

      // Sort them then join them
      this.solutions.partTwo = list.sort((a, b) => a.allergen.localeCompare(b.allergen)).map(i => i.ingredient).join(',')
    }
  }
}
</script>

<style>

</style>
