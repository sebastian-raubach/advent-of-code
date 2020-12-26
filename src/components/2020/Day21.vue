<template>
  <Day :day="21" :solutions="solutions" @input-changed="onInputChanged">
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
    intersect: function (one, two) {
      return new Set([...one].filter(x => two.has(x)))
    },
    union: function (one, two) {
      return new Set([...one, ...two])
    },
    solvePartOne: function () {
      // Map allergens to the ingredients that may cause them
      this.allergenToIngredient = {}
      // Iterate over all foods
      this.foods.forEach(f => {
        // Then iterate the allergens
        f.allergens.forEach(a => {
          // If we have no mapping yet
          if (!this.allergenToIngredient[a]) {
            // Keep the current ingredients
            this.allergenToIngredient[a] = new Set(f.ingredients)
          } else {
            // Else use the intersection between current ones and new ones
            this.allergenToIngredient[a] = this.intersect(this.allergenToIngredient[a], f.ingredients)
          }
        })
      })

      // Unsafe ingredients are those contained in the mapping
      const unsafeIngredients = new Set(Object.values(this.allergenToIngredient).reduce((a, b) => this.union(a, b)))
      // Safe ingredients are those that aren't unsafe (duh)
      const safeIngredients = [...this.ingredients].filter(i => !unsafeIngredients.has(i))

      //  Solution for part one is the sum over all individual safe ingredient occurance counts
      this.solutions.partOne = safeIngredients.map(s => this.foods.filter(f => f.ingredients.has(s)).length).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Remember the mapped allergens
      const mappedAllergens = []
      // Remember which ingredient causes which allergen
      const allergenMapping = {}
      // The number of total allergens
      const nrOfAllergens = Object.keys(this.allergenToIngredient).length

      while (mappedAllergens.length < nrOfAllergens) {
        // Get those that haven't been mapped yet and that have a unique mapping
        const allergensWithOne = Object.keys(this.allergenToIngredient).filter(a => mappedAllergens.indexOf(a) === -1 && this.allergenToIngredient[a].size === 1)

        // For each unique mapping
        allergensWithOne.forEach(a => {
          // Remember that we've mapped this
          mappedAllergens.push(a)
          // Get the ingredient that causes it
          const ingredient = this.allergenToIngredient[a].values().next().value
          allergenMapping[a] = ingredient

          // Remove the ingredient from all other allergen mappings
          Object.keys(this.allergenToIngredient).forEach(otherA => this.allergenToIngredient[otherA].delete(ingredient))
        })
      }

      // Sort the allergens, then map them to the ingredient that causes them, then join with ","
      this.solutions.partTwo = Object.keys(allergenMapping).sort((a, b) => a.localeCompare(b)).map(a => allergenMapping[a]).join(',')
    }
  }
}
</script>

<style>

</style>
