<template>
  <Day :day="9" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      const parts = input[0].split(' players; last marble is worth ')
      this.players = +parts[0]
      this.count = +(parts[1].replace(' points', ''))

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      this.solutions.partOne = this.play(this.players, this.count)
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.play(this.players, this.count * 100)
    },
    play: function (players, targetCount) {
      // Keep track of the scores
      const scores = Array.from(Array(players).keys()).map(i => 0)
      // The current player
      let player = 0
      // The next marble value
      let count = 0
      // The current marble
      let marble = {
        value: count
      }
      // Set its neighbors
      marble.next = marble
      marble.prev = marble

      // Increase the marble count
      count++
      // Keep going until we reached the target value
      while (count < targetCount) {
        if (count % 23 === 0) {
          // If it's divisible by 23 add the marble value to the player scores
          scores[player] += count
          // Get the one to remove
          const toRemove = marble.prev.prev.prev.prev.prev.prev.prev
          // Get its neigbors
          const prev = toRemove.prev
          const next = toRemove.next
          // Remove the target
          prev.next = next
          next.prev = prev
          toRemove.next = null
          toRemove.prev = null

          // Increase the player score again
          scores[player] += toRemove.value
          // Move to the next marble
          marble = next
        } else {
          // Else, we just add the marble

          // Get the next two marbles from the current one
          const c1 = marble.next
          const c2 = marble.next.next

          // Create the new marble
          marble = {
            value: count,
            prev: c1,
            next: c2
          }

          // Insert it between the others
          c1.next = marble
          c2.prev = marble
        }

        // Shift player and increase marble count
        player = (player + 1) % this.players
        count++
      }

      return Math.max(...scores)
    }
  }
}
</script>

<style>

</style>
