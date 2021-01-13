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
      // What to do on which grid cell symbol
      gridCells: {
        '|': (cart) => {},
        '-': (cart) => {},
        '+': (cart) => {
          // Adjust the orientation based on the next turn direction
          cart.or = this.directions[cart.or][cart.nextTurn]
          // Adjust the next turn based on the next index in the turns array
          cart.nextTurn = this.turns[(this.turns.indexOf(cart.nextTurn) + 1) % this.turns.length]
        },
        '/': (cart) => {
          switch (cart.or) {
            case '^':
              cart.or = '>'
              break
            case '>':
              cart.or = '^'
              break
            case 'v':
              cart.or = '<'
              break
            case '<':
              cart.or = 'v'
              break
          }
        },
        '\\': (cart) => {
          switch (cart.or) {
            case '^':
              cart.or = '<'
              break
            case '>':
              cart.or = 'v'
              break
            case 'v':
              cart.or = '>'
              break
            case '<':
              cart.or = '^'
              break
          }
        }
      },
      // Directions to handle turns and movements
      directions: {
        '^': {
          left: '<',
          right: '>',
          straight: '^',
          move: (cart) => cart.y--
        },
        '>': {
          left: '^',
          right: 'v',
          straight: '>',
          move: (cart) => cart.x++
        },
        v: {
          left: '>',
          right: '<',
          straight: 'v',
          move: (cart) => cart.y++
        },
        '<': {
          left: 'v',
          right: '^',
          straight: '<',
          move: (cart) => cart.x--
        }
      },
      turns: ['left', 'straight', 'right']
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.solutions.partOne = null
      this.solutions.partTwo = null
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

            // Replace the symbol on the grid with a rail
            if (this.grid[y][x] === '<' || this.grid[y][x] === '>') {
              this.grid[y][x] = '-'
            } else {
              this.grid[y][x] = '|'
            }
          }
        }
      }

      this.solve()
    },
    /**
     * Sorts the given carts based on their action order, first on y then on x
     */
    getCartsInOrder: function (carts) {
      return carts.concat().sort((a, b) => {
        if (a.y !== b.y) {
          return a.y - b.y
        } else {
          return a.x - b.x
        }
      })
    },
    solve: function () {
      let lCarts = this.carts.concat()
      const locs = new Set()
      lCarts.forEach(c => locs.add(`${c.x},${c.y}`))

      while (true) {
        lCarts = this.getCartsInOrder(lCarts)

        let pos = 0
        while (pos < lCarts.length) {
        // for (let c = 0; c < lCarts.length; c++) {
          const cart = lCarts[pos]
          // Remove the current cart location from the list
          const oldLoc = `${cart.x},${cart.y}`
          locs.delete(oldLoc)

          // Move the cart
          this.directions[cart.or].move(cart)
          // Get the grid cell at that location
          const cell = this.grid[cart.y][cart.x]
          // Turn the cart if necessary
          this.gridCells[cell](cart)

          // Check if it collides with any of the others
          const newLoc = `${cart.x},${cart.y}`

          // If this was the last cart, we stop here before going any further
          if (lCarts.length === 1) {
            this.solutions.partTwo = `${lCarts[0].x},${lCarts[0].y}`
            return
          }

          // Otherwise, check if this location is occupied
          if (locs.has(newLoc)) {
            // If it is, store solution part one if it's the first collision
            if (!this.solutions.partOne) {
              this.solutions.partOne = newLoc
            }

            // We need to adjust the position, because we are removing items
            let decrement = 1
            lCarts.forEach((c, i) => {
              // Only count those with the same coordinates but a smaller index
              if (c.x === cart.x && c.y === cart.y && i < pos) {
                decrement++
              }
            })
            // Now actually remove the items
            lCarts = lCarts.filter(c => !(c.x === cart.x && c.y === cart.y))
            // Delete the location, cause there's nothing there anymore
            locs.delete(newLoc)
            // Decrement the position
            pos -= decrement
          } else {
            locs.add(newLoc)
          }

          pos++
        }
      }
    }
  }
}
</script>

<style>

</style>
