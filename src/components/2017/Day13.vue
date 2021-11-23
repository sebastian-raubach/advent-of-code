<template>
  <Day :day="13" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      // Map the input to objects containing the depth and the range
      const layers = input.map(i => {
        const parts = i.split(': ')

        return {
          depth: +parts[0],
          range: +parts[1]
        }
      })

      // Solution to part one is the severity without a delay
      this.solutions.partOne = this.severity(0, layers)

      // Solution to part two is the first delay where nobody is caught
      let delay = 1
      while (layers.some(l => this.caught(delay, l))) {
        delay++
      }

      this.solutions.partTwo = delay
    },
    severity: function (delay, layers) {
      // The severity is calculated for each layer that's caught
      // Then we reduce it to the sum of the depths multiplied by the ranges respectively
      return layers.filter(l => this.caught(delay, l))
                   .reduce((sum, layer) => sum + layer.depth * layer.range, 0)
    },
    caught: function (delay, layer) {
      // Are we getting caught? Depents on the delay + the depth modulo the movement of the scanner within its range
      return (delay + layer.depth) % (2 * (layer.range - 1)) === 0
    }
  }
}
</script>

<style scoped>
</style>
