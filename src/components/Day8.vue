<template>
  <Day :day="8" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-8.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      operations: [],
      operands: {
        // Accumulators increase the acc and move to the next position
        acc: (value, acc, pos) => { return { acc: acc + value, pos: pos + 1 } },
        // No operations just move to the next position
        nop: (value, acc, pos) => { return { acc: acc, pos: pos + 1 } },
        // Jumps just move the current position to the value
        jmp: (value, acc, pos) => { return { acc: acc, pos: pos + value } }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.operations = input.map(i => {
        const parts = i.split(' ')
        // Remember the operator and the value as a number
        return {
          op: parts[0],
          value: +parts[1]
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    calculateSolution: function (localOperations) {
      let accumulator = 0
      let position = 0
      const visitedPositions = {}

      // Loop while we haven't terminated yet
      while (true) {
        // If we've either hit an infinite loop (repeated index) or we reached the end, return
        if (position === localOperations.length || visitedPositions[position]) {
          return {
            accumulator: accumulator,
            position: position
          }
        }

        // Get the current operator
        const operator = localOperations[position]
        // Mark the index as visited
        visitedPositions[position] = true
        // Get the new configuration
        const next = this.operands[operator.op](operator.value, accumulator, position)

        // Adjust the configuration
        position = next.pos
        accumulator = next.acc
      }
    },
    solvePartOne: function () {
      this.solutions.partOne = this.calculateSolution(this.operations).accumulator
    },
    solvePartTwo: function () {
      // Loop through all positions
      for (let index = 0; index < this.operations.length; index++) {
        // Get the operation
        const i = this.operations[index]

        // If it's a nop or a jmp
        if (i.op === 'nop' || i.op === 'jmp') {
          // Copy the whole input
          const tempInput = JSON.parse(JSON.stringify(this.operations))
          // Then swap the current position
          tempInput[index].op = i.op === 'nop' ? 'jmp' : 'nop'

          // Calculate the result using part one
          const result = this.calculateSolution(tempInput)

          // If this configuration has reached the end, it's no longer an infinite loop
          if (result.position === tempInput.length) {
            // Set the result and terminate
            this.solutions.partTwo = result.accumulator
            return
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
