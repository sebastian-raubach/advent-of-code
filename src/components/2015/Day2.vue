<template>
  <Day :day="2" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      // Map the input to a box each with l, w and h
      const boxes = input.map(i => {
        const [l, w, h] = i.split('x').map(c => +c)
        return {
          l, w, h
        }
      })

      this.solutions.partOne = boxes.map(b => {
        // For part one, calculate all the side areas
        const one = b.l * b.w
        const two = b.w * b.h
        const three = b.h * b.l

        // Then return their areas summed up (2 each) plus the minimum side area
        return 2 * one + 2 * two + 2 * three + Math.min(one, two, three)
      }).reduce((a, b) => a + b)

      this.solutions.partTwo = boxes.map(b => {
        // For part two, sort the sides by size
        const sides = [b.l, b.w, b.h].sort((a, b) => a - b)

        // Then return the sum of the smallest two sides (times 2) plus the product of all sides
        return 2 * sides[0] + 2 * sides[1] + sides.reduce((x, y) => x * y, 1)
      }).reduce((a, b) => a + b)
    }
  }
}
</script>

<style>

</style>
