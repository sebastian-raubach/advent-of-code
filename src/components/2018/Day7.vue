<template>
  <Day :day="7" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <!-- Table with pagination to visualize part two -->
      <b-table table-class="mt-3" :items="output" :per-page="10" :current-page="currentPage"/>
      <b-pagination v-model="currentPage" :total-rows="output.length" :per-page="10" />
    </template>
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
      currentPage: 0,
      output: []
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.mapping = new Map()
      this.allLetters = new Set()
      input.forEach(i => {
        // Parse the individual parts
        const parts = i.split(' must be finished before step ')
        const from = parts[0].replace('Step ', '')
        const to = parts[1].replace(' can begin.', '')

        // Add them to the set of all letters
        this.allLetters.add(from)
        this.allLetters.add(to)

        // Store them in reverse order, so each step knows its predecessors
        if (!this.mapping.has(to)) {
          this.mapping.set(to, [from])
        } else {
          const temp = this.mapping.get(to)
          temp.push(from)
          this.mapping.set(to, temp)
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      const letters = new Set(this.allLetters)

      // Get the initially available steps
      const start = [...letters].filter(l => !this.mapping.has(l)).sort()

      // Keep track of the completed steps
      const seen = []

      // While there are steps to complete
      while (letters.size > 0) {
        // Get the ones that can run next
        const next = [...letters].filter(l => this.mapping.has(l) && this.mapping.get(l).every(t => seen.includes(t))).sort()

        // Add them all to the array
        next.forEach(n => {
          if (start.indexOf(n) === -1) {
            start.push(n)
          }
        })
        // Sort it
        start.sort()

        // Get the one with the lowest character
        const current = start.shift()
        // Mark it as complete
        seen.push(current)
        letters.delete(current)
      }

      this.solutions.partOne = seen.join('')
    },
    solvePartTwo: function () {
      this.output = []
      const letters = new Set(this.allLetters)

      // Get the initially available steps
      const start = [...letters].filter(l => !this.mapping.has(l)).sort()
      const seen = []

      // Keep track of what workers are doing
      const workers = Array.from(Array(5).keys()).map(i => null)

      let second = 0
      let freeWorkers

      while (letters.size > 0 || workers.some(w => w !== null)) {
        // Add all finished steps to the seen array and free the worker
        workers.forEach((w, i) => {
          if (w !== null && w.second === second) {
            seen.push(w.letter)
            workers[i] = null
          }
        })

        // Get the indices of the free workers
        freeWorkers = []
        workers.forEach((w, i) => {
          if (w === null) {
            freeWorkers.push(i)
          }
        })

        // If any are free
        if (freeWorkers.length > 0) {
          // Determine the steps that can run next
          const next = [...letters].filter(l => this.mapping.has(l) && this.mapping.get(l).every(t => seen.includes(t))).sort()

          // Add each to the currently available array
          next.forEach(n => {
            if (start.indexOf(n) === -1) {
              start.push(n)
            }
          })
          // Sort it
          start.sort()

          // For each free worker
          freeWorkers.forEach(i => {
            // Check if there's a job to run
            const current = start.shift()

            if (current) {
              // If so, delete it from the step list
              letters.delete(current)

              // And add the worker
              workers[i] = {
                letter: current,
                second: second + current.charCodeAt(0) - 4
              }
            }
          })
        }

        // Add the current state to the output for visualization
        this.output.push({
          second: second,
          worker1: workers[0] ? workers[0].letter : '.',
          worker2: workers[1] ? workers[1].letter : '.',
          worker3: workers[2] ? workers[2].letter : '.',
          worker4: workers[3] ? workers[3].letter : '.',
          worker5: workers[4] ? workers[4].letter : '.',
          done: seen.join('')
        })

        // Increment time
        second++
      }

      this.solutions.partTwo = second - 1
    }
  }
}
</script>

<style>

</style>
