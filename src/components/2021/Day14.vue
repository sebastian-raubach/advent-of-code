<template>
  <Day :day="14" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      // Get the original template
      const template = input[0].split('')

      // Get initial pair counts
      let pairCount = new Map()
      for (let i = 0; i < template.length - 1; i++) {
        const pair = `${template[i]}${template[i + 1]}`

        if (!pairCount.has(pair)) {
          pairCount.set(pair, 0)
        }

        pairCount.set(pair, pairCount.get(pair) + 1)
      }

      // Parse the rules
      const rules = new Map()
      for (let i = 2; i < input.length; i++) {
        const [from, to] = input[i].split(' -> ')

        rules.set(from, to)
      }

      // Do the steps
      for (let i = 0; i < 40; i++) {
        // Compute the new pair counts
        const newPairCount = new Map()

        pairCount.forEach((count, pair) => {
          // Get the current rule
          const rule = rules.get(pair)

          // Generate the new pairs
          let [l, r] = pair.split('')
          l = l + rule
          r = rule + r

          // Init if missing
          if (!newPairCount.has(l)) {
            newPairCount.set(l, 0)
          }
          if (!newPairCount.has(r)) {
            newPairCount.set(r, 0)
          }

          // Increment each pair by the count (of the previous rule round)
          newPairCount.set(l, newPairCount.get(l) + count)
          newPairCount.set(r, newPairCount.get(r) + count)
        })

        // Keep new ones
        pairCount = newPairCount

        if (i === 9) {
          // On round 10, calculate part one
          const letterCount = this.getLetterCount(pairCount, template)
          const delta = this.getDelta(letterCount)
          this.solutions.partOne = delta / 2
        } else if (i === 39) {
          // On step 40, calculate part two
          const letterCount = this.getLetterCount(pairCount, template)
          const delta = this.getDelta(letterCount)
          this.solutions.partTwo = delta / 2
        }
      }
    },
    /**
     * Calculates the delta between the max and the min of letter counts
     */
    getDelta: function (letterCount) {
      let min = Number.MAX_SAFE_INTEGER
      let max = 0
      letterCount.forEach((count, _) => {
        min = Math.min(min, count)
        max = Math.max(max, count)
      })

      return max - min
    },
    /**
     * Calculates letter counts based on pair counts and the template
     */
    getLetterCount: function (pairCount, template) {
      const letterCount = new Map()

      pairCount.forEach((count, pair) => {
        // Split the pair
        const [a, b] = pair.split('')

        // Init missing counts
        if (!letterCount.has(a)) {
          letterCount.set(a, 0)
        }
        if (!letterCount.has(b)) {
          letterCount.set(b, 0)
        }

        // Increment by the pair count
        letterCount.set(a, letterCount.get(a) + count)
        letterCount.set(b, letterCount.get(b) + count)
      })

      // We need to increase the very first and the very last letter as they're missed out by the previous loop
      letterCount.set(template[0], letterCount.get(template[0]) + 1)
      letterCount.set(template[template.length - 1], letterCount.get(template[template.length - 1]) + 1)

      return letterCount
    }
  }
}
</script>

<style scoped>
</style>
