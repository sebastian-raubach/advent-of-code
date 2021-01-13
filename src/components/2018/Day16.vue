<template>
  <Day :day="16" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      // Define all the opcodes and their functionality
      opcodes: {
        addr: (a, b, c, reg) => { reg[c] = reg[a] + reg[b] },
        addi: (a, b, c, reg) => { reg[c] = reg[a] + b },
        mulr: (a, b, c, reg) => { reg[c] = reg[a] * reg[b] },
        muli: (a, b, c, reg) => { reg[c] = reg[a] * b },
        banr: (a, b, c, reg) => { reg[c] = reg[a] & reg[b] },
        bani: (a, b, c, reg) => { reg[c] = reg[a] & b },
        borr: (a, b, c, reg) => { reg[c] = reg[a] | reg[b] },
        bori: (a, b, c, reg) => { reg[c] = reg[a] | b },
        setr: (a, _, c, reg) => { reg[c] = reg[a] },
        seti: (a, _, c, reg) => { reg[c] = a },
        gtir: (a, b, c, reg) => { reg[c] = a > reg[b] ? 1 : 0 },
        gtri: (a, b, c, reg) => { reg[c] = reg[a] > b ? 1 : 0 },
        gtrr: (a, b, c, reg) => { reg[c] = reg[a] > reg[b] ? 1 : 0 },
        eqir: (a, b, c, reg) => { reg[c] = a === reg[b] ? 1 : 0 },
        eqri: (a, b, c, reg) => { reg[c] = reg[a] === b ? 1 : 0 },
        eqrr: (a, b, c, reg) => { reg[c] = reg[a] === reg[b] ? 1 : 0 }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Keep track of all samples (3-row examples)
      this.samples = []
      this.program = []

      let current = {}
      let blankCount = 0
      let programPart = false
      for (let i = 0; i < input.length; i++) {
        const line = input[i]

        if (line === '') {
          // If everything is set, store the sample
          if (current.before && current.after && current.ins) {
            this.samples.push(current)
          }
          // Create a new sample
          current = {}
          blankCount++

          // If there's more than one blank line, the program code starts
          if (blankCount > 1) {
            programPart = true
          }
        } else if (line.includes('Before: ')) {
          // Parse the 'before' configuration
          blankCount = 0
          current.before = line.replace(/\D/g, '').split('').map(d => +d)
        } else if (line.includes('After: ')) {
          // Parse the 'after' configuration
          blankCount = 0
          current.after = line.replace(/\D/g, '').split('').map(d => +d)
        } else {
          blankCount = 0
          if (programPart) {
            // If we're in the program part, store it as an instruction
            this.program.push(line.split(' ').map(d => +d))
          } else {
            // Otherwise it's a sample instruction
            current.ins = line.split(' ').map(d => +d)
          }
        }
      }

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Keep track of the possible mappings between numeric code and opcode name
      this.opcodeMapping = {}

      // Iterate through all samples
      this.solutions.partOne = this.samples.map(s => {
        // Get the code number
        const codeNumber = s.ins[0]
        // Get all opcodes that create the desired result
        const matchingOpcodes = Object.keys(this.opcodes).filter(op => {
          // Take a copy of the before array
          const beforeCopy = s.before.concat()
          // Modify it using the opcode
          this.opcodes[op](s.ins[1], s.ins[2], s.ins[3], beforeCopy)
          // Check if they are the same
          return beforeCopy.every((v, i) => v === s.after[i])
        })

        // Store the mapping between the numeric code and all possible opcode names
        if (!this.opcodeMapping[codeNumber]) {
          this.opcodeMapping[codeNumber] = new Set()
        } else {
          matchingOpcodes.forEach(c => this.opcodeMapping[codeNumber].add(c))
        }

        // Return 1 if it's got at least 3 matching opcodes. This is used to sum up in the end.
        return matchingOpcodes.length >= 3 ? 1 : 0
      }).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // The final mapping between numeric code and opcode name
      const finalMapping = {}

      // While not all have been mapped yet
      while (Object.keys(finalMapping).length !== Object.keys(this.opcodeMapping).length) {
        // Find the ones that have a unique mapping
        const onlyOne = Object.keys(this.opcodeMapping).filter(c => this.opcodeMapping[c].size === 1)

        onlyOne.forEach(c => {
          // Get the only code
          const opcode = this.opcodeMapping[c].values().next().value
          // Store the mapping
          finalMapping[c] = opcode
          // Remove that opcode from all other mappings
          Object.keys(this.opcodeMapping).forEach(k => this.opcodeMapping[k].delete(opcode))
        })
      }

      // Start the program with a blank register
      const reg = [0, 0, 0, 0]

      // Execute each program instruction
      this.program.forEach(p => this.opcodes[finalMapping[p[0]]](p[1], p[2], p[3], reg))

      // Get the result
      this.solutions.partTwo = reg[0]
    }
  }
}
</script>

<style>

</style>
