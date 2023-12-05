<template>
  <Day :day="20" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const map = new Map()
      const numbers = input.map((c, i) => {
        const node = {
          prev: null,
          next: null,
          value: +c
        }

        map.set(i, node)
        return node
      })

      numbers[0].prev = numbers[numbers.length - 1]
      numbers[0].next = numbers[1]
      for (let i = 1; i < numbers.length; i++) {
        numbers[i].prev = numbers[i - 1]
        numbers[i].next = numbers[(i + 1) % numbers.length]
      }

      for (let i = 0; i < numbers.length; i++) {
        const current = map.get(i)

        let temp = current

        if (current.value === 0) {
          continue
        } else if (current.value > 0) {
          for (let j = 0; j < current.value; j++) {
            temp = temp.next
          }
        } else if (current.value < 0) {
          for (let j = 0; j < Math.abs(current.value) + 1; j++) {
            temp = temp.prev
          }
        }

        // Remove current from position
        current.prev.next = current.next
        current.next.prev = current.prev

        current.next = temp.next
        temp.next.prev = current
        temp.next = current
        current.prev = temp
      }

      let result = 0
      let position = [...map.values()].find(v => v.value === 0)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 1000; j++) {
          position = position.next
        }
        result += position.value
      }

      this.solutions.partOne = result
    },
    modulo: function (a, b) {
      return ((a % b) + b) % b
    }
  }
}
</script>

<style>
</style>
