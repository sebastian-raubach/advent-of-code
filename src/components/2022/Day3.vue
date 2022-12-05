<template>
  <Day :day="3" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
    /**
     * Uses the ASCII value of the character to determine the priority
     */
    toPriority: function (char) {
      if (char === char.toLowerCase()) {
        return char.charCodeAt(0) - 96
      } else {
        return char.charCodeAt(0) - 38
      }
    },
    onInputChanged: function (input) {
      // Parse the input
      const mapped = input.map(i => {
        return {
          total: i.split(''), // The total content split by character
          left: [...i.slice(0, i.length / 2)], // The left half split by character
          right: [...i.slice(i.length / 2, i.length)] // The right half split by character
        }
      })

      // Part one
      let sum = 0
      mapped.forEach(r => {
        // Find the intersection
        const isec = r.left.filter(l => r.right.includes(l))
        // Add the value of the intersection
        sum += this.toPriority(isec[0])
      })
      this.solutions.partOne = sum

      // Part two
      sum = 0
      for (let i = 2; i < mapped.length; i += 3) {
        // Get the three elves
        const [one, two, three] = mapped.slice(i - 2, i + 1)

        // Find the intersection
        const isec = one.total.filter(o => two.total.includes(o) && three.total.includes(o))
        // Add the value of the intersection
        sum += this.toPriority(isec[0])
      }
      this.solutions.partTwo = sum
    }
  }
}
</script>

<style>

</style>
