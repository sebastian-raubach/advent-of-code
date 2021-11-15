<template>
  <Day :day="8" :year="2017" :solutions="solutions" @input-changed="onInputChanged">
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
      },
      conditions: {
        '<=': (a, b) => a <= b,
        '==': (a, b) => a === b,
        '<': (a, b) => a < b,
        '>': (a, b) => a > b,
        '>=': (a, b) => a >= b,
        '!=': (a, b) => a !== b
      },
      operations: {
        inc: (a, b) => a + b,
        dec: (a, b) => a - b
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const data = input.map(r => {
        const parts = r.split(' ')

        return {
          register: parts[0],
          operation: parts[1],
          increment: +parts[2],
          condition: {
            register: parts[4],
            operation: parts[5],
            value: +parts[6]
          }
        }
      })

      this.solve(data)
    },
    solve: function (data) {
      const registers = new Map()

      let maxOverall = -Number.MAX_SAFE_INTEGER
      data.forEach(d => {
        let register = registers.get(d.register)

        if (!register) {
          registers.set(d.register, 0)
          register = 0
        }

        let condRegister = registers.get(d.condition.register)

        if (!condRegister) {
          condRegister = 0
        }

        const condValid = this.conditions[d.condition.operation](condRegister, d.condition.value)

        if (condValid) {
          const newValue = this.operations[d.operation](register, d.increment)
          registers.set(d.register, newValue)

          if (newValue > maxOverall) {
            maxOverall = newValue
          }
        }
      })

      let max = -Number.MAX_SAFE_INTEGER

      registers.forEach(value => {
        if (value > max) {
          max = value
        }
      })

      this.solutions.partOne = max
      this.solutions.partTwo = maxOverall
    }
  }
}
</script>

<style>

</style>
