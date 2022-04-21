<template>
  <Day :day="12" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split on any multiple non-numeric characters, filter out empty bits, then convert to number and sum up
      this.solutions.partOne = input[0].split(/[^0-9.-]+/g).filter(s => s.length > 0).map(s => +s).reduce((a, b) => a + b)

      const json = JSON.parse(input[0])
      this.solutions.partTwo = this.traverse(json)
    },
    traverse: function (json) {
      let sum = 0
      if (Array.isArray(json)) {
        // If dealing with an array, sum up the individual bits
        json.forEach(j => {
          sum += this.traverse(j)
        })
        return sum
      } else if (typeof json === 'object') {
        // If it's an object, check if any property value is 'red'
        if (Object.keys(json).some(k => json[k] === 'red')) {
          // Ignore
        } else {
          // If not, sum up the individual bits
          Object.keys(json).forEach(k => {
            sum += this.traverse(json[k])
          })
        }
        return sum
      } else if (!isNaN(json)) {
        // If it's a number, return it
        return json
      } else {
        // Otherwise, it's a string, return 0
        return 0
      }
    }
  }
}
</script>

<style>

</style>
