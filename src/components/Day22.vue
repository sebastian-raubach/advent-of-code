<template>
  <Day :day="22" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-22.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const decks = [[], []]
      let player = 0

      input.forEach(i => {
        if (i === '') {
          player++
        } else if (i.indexOf('Player') === -1) {
          decks[player].push(+i)
        }
      })

      this.solvePartOne(JSON.parse(JSON.stringify(decks)))
      this.solvePartTwo(JSON.parse(JSON.stringify(decks)))
    },
    solvePartOne: function (decks) {
      let winner
      // As long as there are cards on both decks
      while (decks[0].length > 0 && decks[1].length > 0) {
        // Draw cards
        const pOne = decks[0].shift()
        const pTwo = decks[1].shift()

        // Determine the winner
        winner = pOne > pTwo ? 0 : 1

        // Add the cards to the winner's deck
        decks[winner].push(winner === 0 ? pOne : pTwo, winner === 0 ? pTwo : pOne)
      }

      // Calculate the result as the sum of the card values timed by their reverse index
      const length = decks[winner].length
      this.solutions.partOne = decks[winner].map((card, index) => card * (length - index)).reduce((a, b) => a + b)
    },
    solvePartTwo: function (decks) {
      // Get the result recursively
      const winner = this.recurse(decks)
      // Calculate the result as the sum of the card values timed by their reverse index
      const length = decks[winner].length
      this.solutions.partTwo = decks[winner].map((card, index) => card * (length - index)).reduce((a, b) => a + b)
    },
    recurse: function (decks) {
      // Remember previous configs
      const prevConfigs = new Set()
      // Remember the winner
      let winner
      // As long as there are cards on both decks
      while (decks[0].length > 0 && decks[1].length > 0) {
        // Calculate the current config
        const config = `${decks[0].join(',')}|${decks[1].join(',')}`
        if (prevConfigs.has(config)) {
          // If we've seen it before, player 1 wins
          return 0
        }
        // Add the config
        prevConfigs.add(config)

        // Draw cards
        const pOne = decks[0].shift()
        const pTwo = decks[1].shift()

        // If there are enough cards for a sub-game
        if (decks[0].length >= pOne && decks[1].length >= pTwo) {
          // Determine the winner recursively
          winner = this.recurse([decks[0].slice(0, pOne), decks[1].slice(0, pTwo)], new Set())
        } else {
          // Otherwise, handle same as part 1
          winner = pOne > pTwo ? 0 : 1
        }

        // Add the cards to the winner's deck
        decks[winner].push(winner === 0 ? pOne : pTwo, winner === 0 ? pTwo : pOne)
      }
      return winner
    }
  }
}
</script>

<style>

</style>
