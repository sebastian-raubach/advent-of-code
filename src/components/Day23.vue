<template>
  <Day :day="23" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-23.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.numbers = input[0].split('').map(i => +i)
      this.solvePartOne(this.numbers.concat())
      this.solvePartTwo(this.numbers.concat())
    },
    moveCupsClockwise: function (numbers) {
      const current = numbers[0]
      const toMove = [numbers[1], numbers[2], numbers[3]]

      // Start with the current - 1
      let target = current - 1
      // While the target is one of the moved cups
      while (toMove.indexOf(target) !== -1 || target < 1) {
        // Decrease
        target--
        // If we hit the bottom, start from the top
        if (target < 1) {
          target = numbers.length
        }
      }

      // Remove them from the array
      numbers = [current].concat(numbers.slice(4, numbers.length))
      // Then add them again in the right position
      const targetIndex = numbers.indexOf(target)
      const result = numbers.slice(0, targetIndex + 1).concat(toMove).concat(numbers.slice(targetIndex + 1, numbers.length))
      // Rotate so that the next number is at the top
      result.push(result.shift())
      return result
    },
    solvePartOne: function (numbers) {
      for (let round = 0; round < 100; round++) {
        numbers = this.moveCupsClockwise(numbers)
      }

      const indexOne = numbers.indexOf(1)
      let result = ''
      for (let index = 0; index < numbers.length - 1; index++) {
        result += numbers[(indexOne + index + 1) % numbers.length]
      }
      this.solutions.partOne = result
    },
    solvePartTwo: function (numbers) {
      // Fill up the array with the other numbers
      for (let i = Math.max(...numbers) + 1; i <= 1000000; i++) {
        numbers.push(i)
      }
      // Replace  them all with objects
      numbers = numbers.map(value => { return { value } })
      // Then store the next number like a linked list (only do this for the initial numbers)
      numbers.forEach((v, i) => (numbers[i].next = i < numbers.length - 1 ? numbers[i + 1] : numbers[0]))

      // Create a map that stores value to object
      const vMap = new Map(numbers.map(number => [number.value, number]))

      // Start with the first number
      let head = numbers[0]

      // Do the rounds
      for (let round = 0; round < 10000000; round++) {
        // Get the numbers to move
        const toMove = [head.next.value, head.next.next.value, head.next.next.next.value]
        // And the first one for reference
        const toMoveHead = head.next
        // Update the next one of our current one to the first one after the ones to move
        head.next = head.next.next.next.next

        // Start with the current - 1
        let target = head.value - 1
        // While the target is one of the moved cups
        while (toMove.indexOf(target) !== -1 || target < 1) {
          // Decrease
          target--
          // If we hit the bottom, start from the top
          if (target < 1) {
            target = numbers.length
          }
        }

        // Get the object at the target value
        const pos = vMap.get(target)
        // Set the successor of the last one in the to move chunk to the next one after the target
        toMoveHead.next.next.next = pos.next
        // Then update the target to point at the items to move
        pos.next = toMoveHead

        // Move on to the next one
        head = head.next
      }

      // Get the object with value 1
      const posOne = vMap.get(1)
      // Multiply the next and the one after together
      this.solutions.partTwo = posOne.next.value * posOne.next.next.value
    }
  }
}
</script>

<style>

</style>
