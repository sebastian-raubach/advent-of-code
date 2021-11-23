<template>
  <Day :day="15" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
</template>

<script>
import Day from '@/components/Day'

const ga = {
  prev: 0,
  condition: 1,
  factor: 16807
}
const gb = {
  prev: 0,
  condition: 1,
  factor: 48271
}

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
    next: function (g) {
      do {
        // Compute the new value and continue until condition is met
        g.prev = (g.prev * g.factor) % 2147483647
      } while (g.prev % g.condition !== 0)

      return g.prev
    },
    onInputChanged: function (input) {
      const values = input.map(i => +(i.split(' with ')[1]))

      // Init
      ga.prev = values[0]
      gb.prev = values[1]

      let counter = 0
      for (let i = 0; i < 40_000_000; i++) {
        // Compare 16 minor bits
        if ((this.next(ga) & 0xffff) === (this.next(gb) & 0xffff)) {
          counter++
        }
      }

      this.solutions.partOne = counter

      // Reset and set the conditions
      ga.prev = values[0]
      gb.prev = values[1]
      ga.condition = 4
      gb.condition = 8

      counter = 0
      for (let i = 0; i < 5_000_000; i++) {
        // Compare 16 minor bits
        if ((this.next(ga) & 0xffff) === (this.next(gb) & 0xffff)) {
          counter++
        }
      }

      this.solutions.partTwo = counter
    }
  }
}
</script>

<style scoped>
</style>
