<template>
  <Day :day="13" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      directions: {
        '^': {
          left: '<',
          right: '>',
          straight: '^'
        },
        '>': {
          left: '^',
          right: 'v',
          straight: '>'
        },
        v: {
          left: '>',
          right: '<',
          straight: 'v'
        },
        '<': {
          left: 'v',
          right: '^',
          straight: '<'
        }
      },
      turns: ['left', 'straight', 'right']
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Valid cart markers
      const cartsMarkers = ['^', '>', 'v', '<']

      // Parse the grid
      this.grid = input.map(i => i.split(''))
      // Parse the carts
      this.carts = []

      // Go through the grid
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          // Check if it's a cart
          const cartIndex = cartsMarkers.indexOf(this.grid[y][x])
          if (cartIndex !== -1) {
            // Push it to the array with its position, orientation and next turn direction
            this.carts.push({
              x: x,
              y: y,
              or: this.grid[y][x],
              nextTurn: 'left'
            })
          }
        }
      }

      this.solvePartOne()
      this.solvePartTwo()
    },
    turnCart: function (i) {
      // Get the cart at the index
      const cart = this.carts[i]
      // Adjust the orientation based on the next turn direction
      cart.or = this.directions[cart.or][cart.nextTurn]
      // Adjust the next turn based on the next index in the turns array
      cart.nextTurn = this.turns[(this.turns.indexOf(cart.nextTurn) + 1) % this.turns.length]
    },
    solvePartOne: function () {
      console.log(this.carts)
      console.log(JSON.stringify(this.carts[0]))
      this.turnCart(0)
      console.log(JSON.stringify(this.carts[0]))
      this.turnCart(0)
      console.log(JSON.stringify(this.carts[0]))
      this.turnCart(0)
      console.log(JSON.stringify(this.carts[0]))
    },
    solvePartTwo: function () {
    }
  }
}
</script>

<style>

</style>
