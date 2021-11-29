<template>
  <Day :day="25" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
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
      const startState = input[0].replace('Begin in state ', '').replace('.', '')
      const checksumAfter = +input[1].replace(/\D/g, '')

      const states = []
      let currentState = {
        name: null,
        0: {
          write: null,
          move: null,
          next: null
        },
        1: {
          write: null,
          move: null,
          next: null
        }
      }
      let value = 0
      for (let i = 3; i < input.length; i++) {
        const curr = input[i]

        if (curr.length < 1) {
          states.push(currentState)
          currentState = JSON.parse(JSON.stringify(currentState))
        } else {
          if (curr.startsWith('In state ')) {
            currentState.name = curr.replace('In state ', '').replace(':', '')
          } else if (curr.startsWith('  If the current value is ')) {
            value = +curr.replace(/\D/g, '')
          } else if (curr.startsWith('    - Write the value ')) {
            currentState[value].write = +curr.replace(/\D/g, '')
          } else if (curr.startsWith('    - Move one slot to the ')) {
            currentState[value].move = curr.replace('    - Move one slot to the ', '').replace('.', '')
          } else if (curr.startsWith('    - Continue with state ')) {
            currentState[value].next = curr.replace('    - Continue with state ', '').replace('.', '')
          }
        }
      }

      states.push(currentState)

      this.solutions.partOne = this.solvePartOne(states, startState, checksumAfter)
    },
    solvePartOne: function (states, currentState, checksumAfter) {
      const tape = {
        0: 0
      }
      let cursor = 0
      for (let i = 0; i < checksumAfter; i++) {
        const state = states.find(s => s.name === currentState)
        const instructions = state[tape[cursor]]

        tape[cursor] = instructions.write
        currentState = instructions.next

        cursor += instructions.move === 'right' ? 1 : -1

        if (!(cursor in tape)) {
          tape[cursor] = 0
        }
      }

      return this.checksum(tape)
    },
    checksum: function (tape) {
      return Object.keys(tape).map(k => tape[k]).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style scoped>
</style>
