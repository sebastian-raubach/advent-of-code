<template>
  <Day :day="12" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: require('@/assets/input/Day-12.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      operationsOne: {
        N: (pos, op) => { pos.y += op.value },
        S: (pos, op) => { pos.y -= op.value },
        E: (pos, op) => { pos.x += op.value },
        W: (pos, op) => { pos.x -= op.value },
        L: (pos, op) => { pos.angle = this.mod(pos.angle - op.value, 360) },
        R: (pos, op) => { pos.angle = this.mod(pos.angle + op.value, 360) },
        F: (pos, op) => {
          switch (pos.angle) {
            case 0:
              this.operationsOne.N(pos, op)
              break
            case 90:
              this.operationsOne.E(pos, op)
              break
            case 180:
              this.operationsOne.S(pos, op)
              break
            case 270:
              this.operationsOne.W(pos, op)
              break
          }
        }
      },
      operationsTwo: {
        N: (pos, way, op) => { way.y += op.value },
        S: (pos, way, op) => { way.y -= op.value },
        E: (pos, way, op) => { way.x += op.value },
        W: (pos, way, op) => { way.x -= op.value },
        L: (pos, way, op) => {
          let tmp
          switch (op.value) {
            case 90:
              tmp = way.x
              way.x = -way.y
              way.y = tmp
              break
            case 180:
              way.x = -way.x
              way.y = -way.y
              break
            case 270:
              tmp = way.x
              way.x = way.y
              way.y = -tmp
              break
          }
          // Update angle
          pos.angle = this.mod(pos.angle - op.value, 360)
        },
        R: (pos, way, op) => {
          let tmp
          switch (op.value) {
            case 90:
              tmp = way.x
              way.x = way.y
              way.y = -tmp
              break
            case 180:
              way.x = -way.x
              way.y = -way.y
              break
            case 270:
              tmp = way.x
              way.x = -way.y
              way.y = tmp
              break
          }
          pos.angle = this.mod(pos.angle + op.value, 360)
         },
        F: (pos, way, op) => {
          pos.x += op.value * way.x
          pos.y += op.value * way.y
        }
      }
    }
  },
  methods: {
    mod: function (n, m) {
      return ((n % m) + m) % m
    },
    onInputChanged: function (input) {
      this.directions = input.map(i => {
        const value = +i.replace(/[a-zA-Z]+/g, '')
        const inst = i.replace(/\d*/g, '')

        return {
          instruction: inst,
          value: value
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      const ship = {
        x: 0,
        y: 0,
        angle: 90
      }

      this.directions.forEach(i => {
        this.operationsOne[i.instruction](ship, i)
      })

      this.solutions.partOne = Math.abs(ship.x) + Math.abs(ship.y)
    },
    solvePartTwo: function () {
      const ship = {
        x: 0,
        y: 0,
        angle: 90
      }
      const way = {
        x: 10,
        y: 1
      }

      this.directions.forEach(i => {
        this.operationsTwo[i.instruction](ship, way, i)
      })

      this.solutions.partTwo = Math.abs(ship.x) + Math.abs(ship.y)
    }
  }
}
</script>

<style>

</style>
