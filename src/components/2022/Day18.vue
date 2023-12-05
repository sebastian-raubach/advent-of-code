<template>
  <Day :day="18" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      const cubes = input.map(i => {
        const [x, y, z] = i.split(',').map(c => +c)

        return {
          x,
          y,
          z
        }
      })

      let counter = 0

      cubes.forEach((c, i) => {
        let open = 6
        cubes.forEach((o, j) => {
          if (i === j || open < 1) {
            return
          }

          if (Math.abs(c.x - o.x) === 1 && c.y === o.y && c.z === o.z) {
            // Check both directions in x dimension
            open--
          } else if (c.x === o.x && Math.abs(c.y - o.y) === 1 && c.z === o.z) {
            // Check both directions in y dimension
            open--
          } else if (c.x === o.x && c.y === o.y && Math.abs(c.z - o.z) === 1) {
            // Check both directions in z dimension
            open--
          }
        })

        counter += open
      })

      this.solutions.partOne = counter
    }
  }
}
</script>

<style>
</style>
