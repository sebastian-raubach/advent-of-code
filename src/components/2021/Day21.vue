<template>
  <Day :day="21" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      let positions = input.map(r => +r.split('starting position: ')[1])
      this.solvePartOne(positions)

      positions = input.map(r => +r.split('starting position: ')[1])
      this.solvePartTwo(positions)
    },
    solvePartTwo: function (positions) {
      this.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      this.memo = []

      const wins = this.recurse(0, positions[0], 0, positions[1], 0, 0)

      this.solutions.partTwo = (Math.max(...wins))
    },
    recurse: function (scoreOne, posOne, scoreTwo, posTwo, pIndex) {
      // Check memory
      if (this.memo[[scoreOne, posOne, scoreTwo, posTwo, pIndex]] !== undefined) {
        return this.memo[[scoreOne, posOne, scoreTwo, posTwo, pIndex]]
      }
      // Player 1 wins
      if (scoreOne >= 21) {
        this.memo[[scoreOne, posOne, scoreTwo, posTwo, pIndex]] = [1, 0]
        return [1, 0]
      }
      // Player two wins
      if (scoreTwo >= 21) {
        this.memo[[scoreOne, posOne, scoreTwo, posTwo, pIndex]] = [0, 1]
        return [0, 1]
      }

      let totalWins = [0, 0]

      // For each dice rolls
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          for (let k = 1; k <= 3; k++) {
            if (pIndex === 0) {
              // Adjust position
              const newPos = this.board[(posOne + i + j + k - 1) % 10]
              // Calculate the winner
              const currWin = this.recurse(scoreOne + newPos, newPos, scoreTwo, posTwo, 1 - pIndex)
              // Adjust total wins
              totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]]
            } else {
              // Adjust position
              const newPos = this.board[(posTwo + i + j + k - 1) % 10]
              // Calculate the winner
              const currWin = this.recurse(scoreOne, posOne, scoreTwo + newPos, newPos, 1 - pIndex)
              // Adjust total wins
              totalWins = [totalWins[0] + currWin[0], totalWins[1] + currWin[1]]
            }
          }
        }
      }

      // Store in memory
      this.memo[[scoreOne, posOne, scoreTwo, posTwo, pIndex]] = totalWins
      return totalWins
    },
    solvePartOne: function (positions) {
      // Let's do part one the naive way
      // Keep track of the points
      const points = positions.map(_ => 0)
      // Current die roll
      const dieroll = {
        die: 1,
        roll: 0
      }

      let counter = 0
      while (true) {
        // Roll the die
        this.roll(dieroll)
        // Adjust player one
        positions[0] = this.modulo(positions[0] + dieroll.roll, 10)
        points[0] += positions[0]
        counter += 3
        if (points[0] >= 1000) {
          break
        }

        // Roll the die
        this.roll(dieroll)
        // Adjust player two
        positions[1] = this.modulo(positions[1] + dieroll.roll, 10)
        points[1] += positions[1]
        counter += 3
        if (points[1] >= 1000) {
          break
        }
      }

      this.solutions.partOne = Math.min(points[0], points[1]) * counter
    },
    modulo: function (a, b) {
      return ((a - 1) % b) + 1
    },
    roll: function (die) {
      die.roll = die.die
      die.die = this.modulo(die.die + 1, 100)
      die.roll += die.die
      die.die = this.modulo(die.die + 1, 100)
      die.roll += die.die
      die.die = this.modulo(die.die + 1, 100)
    }
  }
}
</script>

<style scoped>
</style>
