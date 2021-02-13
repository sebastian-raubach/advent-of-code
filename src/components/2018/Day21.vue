<template>
  <Day :day="21" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'
// import opcodes from '@/util/Opcode2018.js'

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
      this.instructions = []
      input.forEach((line, index) => {
        if (index === 0) {
          this.ipRegister = +line.split(' ')[1]
        } else {
          const parts = line.split(' ')

          this.instructions.push({
            opcode: parts[0],
            values: parts.slice(1, 4).map(c => +c)
          })
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
    },
    solvePartTwo: function () {
    }
  }
}
</script>

<style>

</style>
