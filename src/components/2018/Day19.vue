<template>
  <Day :day="19" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'
import opcodes from '@/util/Opcode2018.js'

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
      const reg = [0, 0, 0, 0, 0, 0]

      let ip = 0

      while (ip >= 0 && ip < this.instructions.length) {
        const instruction = this.instructions[ip]

        // Set the instruction pointer to its register
        reg[this.ipRegister] = ip
        // Execute the opcode
        opcodes[instruction.opcode](instruction.values[0], instruction.values[1], instruction.values[2], reg)
        ip = reg[this.ipRegister]
        ip++
      }

      this.solutions.partOne = reg[0]
    },
    solvePartTwo: function () {
      // TODO: Pen + Paper to see what it's doing...
      const reg = [1, 0, 0, 0, 0, 0]

      let ip = 0

      let counter = 0
      while (counter++ < 1000 && ip >= 0 && ip < this.instructions.length) {
        const instruction = this.instructions[ip]

        // Set the instruction pointer to its register
        reg[this.ipRegister] = ip
        // Execute the opcode
        opcodes[instruction.opcode](instruction.values[0], instruction.values[1], instruction.values[2], reg)
        ip = reg[this.ipRegister]
        ip++

        console.log(ip, reg)
      }

      this.solutions.partTwo = reg[0]
    }
  }
}
</script>

<style>

</style>
