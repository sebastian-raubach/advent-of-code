<template>
  <Day :day="23" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      },
      instructions: {
        set: (registers, x, y) => { registers[x] = this.resolve(registers, y) },
        sub: (registers, x, y) => { registers[x] -= this.resolve(registers, y) },
        mul: (registers, x, y) => { registers[x] *= this.resolve(registers, y) },
        jnz: (registers, x, y) => this.resolve(registers, x) !== 0 ? this.resolve(registers, y) : 0
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const registers = {}

      // Parse the input
      const inst = input.map(i => {
        const parts = i.split(' ')
        return {
          inst: parts[0],
          reg: parts[1],
          value: parts.length > 2 ? parts[2] : null
        }
      })

      let index = 0
      let counter = 0
      while (true) {
        const i = inst[index]
        // Ensure the register exists
        if (isNaN(i.reg) && !(i.reg in registers)) {
          registers[i.reg] = 0
        }

        // Follow the instruction
        const result = this.instructions[i.inst](registers, i.reg, i.value)

        // If we received a value, set it as the result
        if (i.inst === 'mul') {
          counter++
        }

        if (i.inst === 'jnz' && result !== 0) {
          // If we need to jump, do it
          index += result
        } else {
          // Otherwise increment
          index++
        }

        if (index >= inst.length - 1) {
          this.solutions.partOne = counter
          return
        }
      }
    },
    resolve: function (registers, a) {
      if (isNaN(a)) {
        if (a in registers) {
          return registers[a]
        } else {
          registers[a] = 0
          return 0
        }
      } else {
        return +a
      }
    }
  }
}
</script>

<style scoped>
</style>
