<template>
  <Day :day="5" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-5-code border">
<code v-html="gridOne" />
      </pre>
    </template>
    <template v-slot:partTwo>
      <pre class="day-5-code border">
<code v-html="gridTwo" />
      </pre>
    </template>
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
      gridOne: null,
      gridTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const stackData = []
      const instructions = []

      // Regex for parsing instructions
      const pattern = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/
      // Flag to indicate which part we're in
      let isStackData = true
      // Iterate over all instructions
      input.forEach(i => {
        if (i === '') {
          // We're switching parts, remove the last stack data (the stack numbering row)
          stackData.pop()
          // Flip flag
          isStackData = false
          return
        }

        if (isStackData) {
          // Replace all brackets and sets of 4 spaces, then split on space
          stackData.push(i.replaceAll('[', '').replaceAll(']', '').replaceAll('    ', ' ').split(' '))
        } else {
          // Match regex
          const matched = i.match(pattern).groups

          // Remember instruction
          instructions.push({
            from: +matched.from,
            to: +matched.to,
            count: +matched.count
          })
        }
      })

      // Define the number of stacks we need
      const stacks = Array.from(Array(stackData[0].length).keys()).map(i => [])

      // Go through the stack data in reverse
      stackData.reverse().forEach(i => {
        for (let j = 0; j < i.length; j++) {
          if (i[j] !== '') {
            // Push into the stack
            stacks[j].push(i[j])
          }
        }
      })

      this.solvePartOne(JSON.parse(JSON.stringify(stacks)), JSON.parse(JSON.stringify(instructions)))
      this.solvePartTwo(JSON.parse(JSON.stringify(stacks)), JSON.parse(JSON.stringify(instructions)))
    },
    solvePartTwo: function (stacks, instructions) {
      // For each instruction
      instructions.forEach(i => {
        // Get the stack we're taking bits from
        const stack = stacks[i.from - 1]
        // Remove the section of elements
        const chunk = stack.splice(stack.length - i.count, i.count)
        // Put it on the other stack
        stacks[i.to - 1].push(...chunk)
      })

      // Join for result
      this.solutions.partTwo = stacks.map(s => s[s.length - 1]).join('')
      // Print the grid
      this.gridTwo = this.toGrid(stacks)
    },
    solvePartOne: function (stacks, instructions) {
      // For each instruction
      instructions.forEach(i => {
        // Move `count` boxes
        for (let c = 0; c < i.count; c++) {
          // If there are enough
          if (stacks[i.from - 1].length > 0) {
            // From one stack to another
            stacks[i.to - 1].push(stacks[i.from - 1].pop())
          }
        }
      })

      // Join for result
      this.solutions.partOne = stacks.map(s => s[s.length - 1]).join('')
      // Print the grid
      this.gridOne = this.toGrid(stacks)
    },
    toGrid: function (stacks) {
      let result = ''

      const height = Math.max(...stacks.map(s => s.length))
      const topPrinted = stacks.map(s => false)
      for (let row = 0; row < height; row++) {
        for (let stack = 0; stack < stacks.length; stack++) {
          if (stacks[stack].length >= height - row) {
            if (topPrinted[stack]) {
              result += ` [${stacks[stack][height - row - 1]}]`
            } else {
              topPrinted[stack] = true
              result += ` <span class="day-5-stack-top">[${stacks[stack][height - row - 1]}]</span>`
            }
          } else {
            result += '    '
          }
        }
        result += '<br/>'
      }

      return result
    }
  }
}
</script>

<style>
.day-5-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 100vh;
}
.day-5-stack-top {
  background-color: #2980b9;
  color: rgb(211, 193, 175);
}
</style>
