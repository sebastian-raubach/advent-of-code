<template>
  <Day :day="17" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-17.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      neighborsThree: [
        [-1, -1, -1], [-1, -1, 0], [-1, -1, 1], [-1, 0, -1], [-1, 0, 0], [-1, 0, 1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
        [0, -1, -1], [0, -1, 0], [0, -1, 1], [0, 0, -1], [0, 0, 1], [0, 1, -1], [0, 1, 0], [0, 1, 1],
        [1, -1, -1], [1, -1, 0], [1, -1, 1], [1, 0, -1], [1, 0, 0], [1, 0, 1], [1, 1, -1], [1, 1, 0], [1, 1, 1]
      ],
      neighborsFour: [
        [-1, -1, -1, -1], [-1, -1, -1, 0], [-1, -1, -1, 1], [-1, -1, 0, -1], [-1, -1, 0, 0], [-1, -1, 0, 1], [-1, -1, 1, -1], [-1, -1, 1, 0], [-1, -1, 1, 1],
        [-1, 0, -1, -1], [-1, 0, -1, 0], [-1, 0, -1, 1], [-1, 0, 0, -1], [-1, 0, 0, 0], [-1, 0, 0, 1], [-1, 0, 1, -1], [-1, 0, 1, 0], [-1, 0, 1, 1],
        [-1, 1, -1, -1], [-1, 1, -1, 0], [-1, 1, -1, 1], [-1, 1, 0, -1], [-1, 1, 0, 0], [-1, 1, 0, 1], [-1, 1, 1, -1], [-1, 1, 1, 0], [-1, 1, 1, 1],
        [0, -1, -1, -1], [0, -1, -1, 0], [0, -1, -1, 1], [0, -1, 0, -1], [0, -1, 0, 0], [0, -1, 0, 1], [0, -1, 1, -1], [0, -1, 1, 0], [0, -1, 1, 1],
        [0, 0, -1, -1], [0, 0, -1, 0], [0, 0, -1, 1], [0, 0, 0, -1], [0, 0, 0, 1], [0, 0, 1, -1], [0, 0, 1, 0], [0, 0, 1, 1],
        [0, 1, -1, -1], [0, 1, -1, 0], [0, 1, -1, 1], [0, 1, 0, -1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, -1], [0, 1, 1, 0], [0, 1, 1, 1],
        [1, -1, -1, -1], [1, -1, -1, 0], [1, -1, -1, 1], [1, -1, 0, -1], [1, -1, 0, 0], [1, -1, 0, 1], [1, -1, 1, -1], [1, -1, 1, 0], [1, -1, 1, 1],
        [1, 0, -1, -1], [1, 0, -1, 0], [1, 0, -1, 1], [1, 0, 0, -1], [1, 0, 0, 0], [1, 0, 0, 1], [1, 0, 1, -1], [1, 0, 1, 0], [1, 0, 1, 1],
        [1, 1, -1, -1], [1, 1, -1, 0], [1, 1, -1, 1], [1, 1, 0, -1], [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, -1], [1, 1, 1, 0], [1, 1, 1, 1]
      ]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.input = input.map(i => i.split('').map(c => c === '#'))
      this.solvePartOne()
      this.solvePartTwo()
    },
    iterate: function (map, neighbors) {
      const tempMap = new Map(map)

      // Iterate over all currently observed cells
      map.forEach((alive, position) => {
        let activeNeighbors = 0
        neighbors.forEach(n => {
          // Get the neighbors actual position within the 'grid'
          const np = position.split(',').map((v, i) => +v + n[i])
          // Construct its new key
          const nk = np.join(',')

          // Check if the neighbor is alive
          const neighborAlive = map.get(nk)
          if (neighborAlive === true) {
            // If so, increase the counter
            activeNeighbors++
          } else if (neighborAlive === undefined) {
            // Add all neighbors that don't exist to the map
            tempMap.set(nk, false)
          }
        })

        // Apply the life-or-death rules
        if (alive) {
          tempMap.set(position, activeNeighbors === 2 || activeNeighbors === 3)
        } else {
          tempMap.set(position, activeNeighbors === 3)
        }
      })

      return tempMap
    },
    expand: function (map, neighbors) {
      const tempMap = new Map(map)

      // Iterate over all currently observed cells
      map.forEach((alive, position) => {
        // Consider all neighboring positions
        neighbors.forEach(n => {
          // Get the neighbors actual position within the 'grid'
          const np = position.split(',').map((v, i) => +v + n[i])
          // Construct its new key
          const nk = np.join(',')

          // If it doesn't exist yet, add it as dead
          if (!tempMap.has(nk)) {
            tempMap.set(nk, false)
          }
        })
      })

      return tempMap
    },
    run: function (neighbors, mapper) {
      let map = new Map()
      // Convert the input to a map between position and alive status
      this.input.forEach((row, y) => {
        row.forEach((cell, x) => {
          // Map to the given mapping (pads dimensions)
          const mapKey = mapper(x, y)
          map.set(mapKey, cell)
        })
      })

      // Initially expand the 'grid' to include the immediate dead neighbors
      map = this.expand(map, neighbors)

      // Do 6 rounds
      for (let round = 0; round < 6; round++) {
        map = this.iterate(map, neighbors)
      }

      // Count the ones that are alive
      let counter = 0
      map.forEach(value => {
        if (value) {
          counter++
        }
      })
      return counter
    },
    solvePartOne: function () {
      this.solutions.partOne = this.run(this.neighborsThree, (x, y) => `0,${y},${x}`)
    },
    solvePartTwo: function () {
      this.solutions.partTwo = this.run(this.neighborsFour, (x, y) => `0,0,${y},${x}`)
    }
  }
}
</script>

<style>

</style>
