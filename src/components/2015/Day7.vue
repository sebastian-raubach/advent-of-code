<template>
  <Day :day="7" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      operations: {
        SET: s => s[0], // SET is a direct mapping of source 0
        AND: s => s[0] & s[1], // AND uses bitwise and between both sources
        OR: s => s[0] | s[1], // OR uses bitwise or between both sources
        LSHIFT: s => s[0] << s[1], // LSHIFT shifts source 0 to the left by source 1
        RSHIFT: s => s[0] >> s[1], // RSHIFT shifts source 0 to the right by source 1
        NOT: s => ~s[0] // NOT uses bitwise complement for source 0
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input into a more suitable data structure
      let parsed = this.parseInput(input)
      // Create a mapping that remembers all the resolved wires and their values
      const mapping = new Map()
      // Then solve until all wires are set
      this.solve(parsed, mapping)
      // The solution is the value of 'a'
      this.solutions.partOne = mapping.get('a')

      // Read the input again for part 2
      parsed = this.parseInput(input)
      // Override the settings for wire 'b'
      parsed.filter(p => p.target === 'b').forEach(p => {
        p.sources = [this.solutions.partOne]
        p.operand = 'SET'
      })
      // Wipe the memory
      mapping.clear()
      // Solve again
      this.solve(parsed, mapping)
      // And get the result again
      this.solutions.partTwo = mapping.get('a')
    },
    solve: function (parsed, mapping) {
      // As long as there are unsolved wires left
      while (parsed.length > 0) {
        // Filter them (to only keep track of the unsolved ones)
        parsed = parsed.filter(p => {
          // Map the sources to resolved values (if possible)
          const sources = p.sources.map(s => {
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

          if (sources.every(s => s !== null)) {
            // If all sources have a resolved value, compute the new value for the target.
            // Remember we're working on 16 bit integers, so reduce it accordingly
            mapping.set(p.target, this.operations[p.operand](sources) & 0xFFFF)
            // Don't keep it in the list of unresolved wires
            return false
          } else {
            // We cannot resolve this just now, so keep it in the list
            return true
          }
        })
      }
    },
    parseInput: function (input) {
      return input.map(i => {
        // Split into left and right side
        const [l, r] = i.split(' -> ')
        // Split the left again on spaces
        const lBits = l.split(' ')

        // Remember the incoming wires
        const sources = []
        // And the operand
        let operand

        if (lBits.length === 1) {
          // If there's only one, it's either a number or another wire that feeds in directly
          if (isNaN(lBits[0])) {
            sources.push(lBits[0])
          } else {
            sources.push(+lBits[0])
          }
          // The operand is simply SET
          operand = 'SET'
        } else if (lBits.length === 2) {
          // If there are two, keep the second part as the source
          sources.push(lBits[1])
          // And set the operand to NOT (only operand with only two parts)
          operand = 'NOT'
        } else if (lBits.length === 3) {
          // Otherwise, keep the two sources at index 0 and 2
          sources.push(lBits[0])
          sources.push(lBits[2])
          // The operand is in the middle
          operand = lBits[1]
        } else {
          console.error(`Unexpected input found: ${i}`)
        }

        return {
          sources: sources,
          target: r,
          operand: operand
        }
      })
    }
  }
}
</script>

<style>

</style>
