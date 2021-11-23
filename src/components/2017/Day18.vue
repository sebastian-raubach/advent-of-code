<template>
  <Day :day="18" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
        snd: (registers, x, _) => { registers.sound = this.resolve(registers, x) },
        set: (registers, x, y) => { registers[x] = this.resolve(registers, y) },
        add: (registers, x, y) => { registers[x] += this.resolve(registers, y) },
        mul: (registers, x, y) => { registers[x] *= this.resolve(registers, y) },
        mod: (registers, x, y) => { registers[x] %= this.resolve(registers, y) },
        rcv: (registers, x, _) => this.resolve(registers, x) !== 0 ? registers.sound : null,
        jgz: (registers, x, y) => this.resolve(registers, x) > 0 ? this.resolve(registers, y) : 0
      }
    }
  },
  methods: {
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
    },
    onInputChanged: function (input) {
      // Parse the input
      const inst = input.map(i => {
        const parts = i.split(' ')
        return {
          inst: parts[0],
          reg: parts[1],
          value: parts.length > 2 ? parts[2] : null
        }
      })

      // Keep track of the index
      let index = 0
      // Keep track of the registers
      const registers = {}
      while (true) {
        const i = inst[index]
        // Ensure the register exists
        if (!(i.reg in registers)) {
          registers[i.reg] = 0
        }

        // Follow the instruction
        const result = this.instructions[i.inst](registers, i.reg, i.value)

        // If we received a value, set it as the result
        if (i.inst === 'rcv' && result !== null) {
          this.solutions.partOne = result
          return
        }

        if (i.inst === 'jgz' && result !== 0) {
          // If we need to jump, do it
          index += result
        } else {
          // Otherwise increment
          index++
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
