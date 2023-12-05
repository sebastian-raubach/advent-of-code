<template>
  <Day :day="21" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      ops: {
        '+': i => i[0] + i[1],
        '-': i => i[0] - i[1],
        '*': i => i[0] * i[1],
        '/': i => i[0] / i[1]
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Create a mapping that remembers all the resolved inputs and their values
      const mapping = new Map()

      const pattern = /(?<l>[a-z]{4}) (?<op>[+/*-]{1}) (?<r>[a-z]{4})/

      let parsed = input.map(i => {
        const [left, right] = i.split(': ')

        const matched = right.match(pattern)

        if (matched && matched.groups) {
          return {
            inputs: [matched.groups.l, matched.groups.r],
            operand: matched.groups.op,
            output: left
          }
        } else {
          mapping.set(left, +right)
          return null
        }
      }).filter(i => i !== null)

      // As long as there are unsolved wires left
      while (parsed.length > 0) {
        // Filter them (to only keep track of the unsolved ones)
        parsed = parsed.filter(p => {
          // Map the sources to resolved values (if possible)
          const inputs = p.inputs.map(s => {
            if (!isNaN(s)) {
              // If the source is a number, just use it
              return +s
            } else {
              // Else, check the resolved wires
              if (mapping.has(s)) {
                // If it's there, use its value
                return mapping.get(s)
              } else {
                // Otherwise, we cannot proceed for now
                return null
              }
            }
          })

          if (inputs.every(i => i !== null)) {
            // If all inputs have a resolved value, compute the new value for the output.
            // Remember we're working on 16 bit integers, so reduce it accordingly
            mapping.set(p.output, this.ops[p.operand](inputs))
            // Don't keep it in the list of unresolved wires
            return false
          } else {
            // We cannot resolve this just now, so keep it in the list
            return true
          }
        })
      }

      this.solutions.partOne = mapping.get('root')
    }
  }
}
</script>

<style>
</style>
