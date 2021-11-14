<template>
  <Day :day="6" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      // Split each row on tab and then map the values to numbers
      this.values = input[0].split('\t').map(i => +i)

      this.solve()
    },
    solve: function () {
      const copy = this.values.concat()
      // Remember all the steps we have seen
      const memory = []

      let counter = 1
      while (true) {
        // Get the max index
        const maxIndex = copy.indexOf(Math.max(...copy))

        // Get the amount of bits to reorganize
        let remaining = copy[maxIndex]
        // Reset this one to 0
        copy[maxIndex] = 0

        // Starting from the next one
        let index = (maxIndex + 1) % copy.length
        while (remaining > 0) {
          // Add one to each of the following bins
          copy[index]++
          index = (index + 1) % copy.length
          remaining--
        }

        // Keep track of the configuration
        const concat = copy.join('|')
        const memoryIndex = memory.indexOf(concat)
        if (memoryIndex !== -1) {
          // We're done
          this.solutions = {
            partOne: counter,
            partTwo: counter - memoryIndex - 1
          }
          return
        } else {
          memory.push(concat)
        }

        counter++
      }
    }
  }
}
</script>

<style>

</style>
