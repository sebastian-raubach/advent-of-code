<template>
  <Day :day="3" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-3-code border">
<code v-html="gridOne" />
      </pre>
    </template>
    <template v-slot:partTwo>
      <pre class="day-3-code border">
<code v-html="gridTwo" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

import PathDrawer from '@/util/PathDrawer.js'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      taskInput: require('@/assets/input/Day-3.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      parsedInput: [],
      paths: {
        1: [],
        2: []
      },
      gridOne: null,
      gridTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Map the input into a 2d boolean array where trees are true
      this.parsedInput = input.map(r => {
        return r.split('').map(c => c === '#')
      })

      // Reset some data fields
      this.paths = {
        1: [],
        2: []
      }
      this.gridOne = null
      this.gridTwo = null

      // Solve both parts
      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Check the slope
      const result = this.checkSlope(3, 1)
      // Save the path for drawing
      this.paths[1].push(result.path)
      // Set the result
      this.solutions.partOne = result.trees

      // Start the drawer
      this.gridOne = new PathDrawer(this.parsedInput, this.paths[1]).getPathGrid()
    },
    solvePartTwo: function () {
      // Check the slopes
      const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
      ]

      // Map each slope to its number of trees then multiply them together
      this.solutions.partTwo = slopes.map(s => {
        // Calculate the result
        const result = this.checkSlope(s[0], s[1])
        // Save the path for drawing
        this.paths[2].push(result.path)
        // Return the number of trees
        return result.trees
      })
        .reduce((a, b) => a * b, 1)

      // Start the drawer
      this.gridTwo = new PathDrawer(this.parsedInput, this.paths[2]).getPathGrid()
    },
    /**
     * Checks the number of trees and grid points on the path from top left with the given delta slope
     * @param deltaX The delta value in the x direction (>= 0)
     * @param deltaY The delta value in the y direction (>= 0)
     * @returns An object containing the number of trees (`trees`) and the cells on the path (`path`)
     */
    checkSlope: function (deltaX, deltaY) {
      let counter = 0
      let x = 0
      // Keep track of the overall x position for repeated grids
      let totalX = 0
      // Track all the cells on the path
      const path = []
      // Traverse in y direction with delta y
      for (let y = deltaY; y < this.parsedInput.length; y += deltaY) {
        // Add to total x
        totalX += deltaX
        // Calculate new x based on wrapping
        x = (x + deltaX) % this.parsedInput[y].length
        // Check if it's a tree
        if (this.parsedInput[y][x]) {
          counter++
          path.push({ x: totalX, y: y, hit: true })
        } else {
          path.push({ x: totalX, y: y, hit: false })
        }
      }

      return {
        path: path,
        trees: counter
      }
    }
  }
}
</script>

<style>
.day-3-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 300px;
}
.day-3-path-hit {
  background-color: #2ecc71;
  color: #2c3e50;
}
.day-3-path-miss {
  background-color: #ecf0f1;
  color: #2c3e50;
}
</style>
