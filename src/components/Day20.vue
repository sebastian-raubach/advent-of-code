<template>
  <Day :day="20" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <pre class="day-20-code border">
<code v-html="gridTwo" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

import MonsterDrawer from '@/util/MonsterDrawer.js'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      taskInput: require('@/assets/input/Day-20.txt').default,
      solutions: {
        partOne: null,
        partTwo: null
      },
      gridTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.gridTwo = null
      this.parts = []

      let id
      let part = []
      input.forEach(i => {
        if (i === '') {
          this.parts.push({
            id,
            part
          })
          id = null
          part = []
        } else if (i.includes('Tile ')) {
          id = +(i.replace(/\D/g, ''))
        } else {
          part.push(i.split('').map(c => c === '#'))
        }
      })

      if (id !== null) {
        this.parts.push({
          id,
          part
        })
      }

      this.width = Math.sqrt(this.parts.length)

      this.solvePartOne()
      this.solvePartTwo()
    },
    rotateRight: function (part) {
      return part[0].map((val, index) => part.map(row => row[index]).reverse())
    },
    flip: function (part) {
      return part.map(p => p.map((c, index) => p[index]).reverse())
    },
    expand: function (parts) {
      const expandedParts = []

      parts.forEach(p => {
        // Get all rotations
        const zero = p.part
        const ninety = this.rotateRight(zero)
        const oneeighty = this.rotateRight(ninety)
        const seventwenty = this.rotateRight(oneeighty)
        // And their flipped options
        const flipZero = this.flip(zero)
        const flipNinety = this.flip(ninety)
        const flipOneeighty = this.flip(oneeighty)
        const flipSeventwenty = this.flip(seventwenty)

        // Add them all
        expandedParts.push({ id: p.id, part: zero })
        expandedParts.push({ id: p.id, part: ninety })
        expandedParts.push({ id: p.id, part: oneeighty })
        expandedParts.push({ id: p.id, part: seventwenty })
        expandedParts.push({ id: p.id, part: flipZero })
        expandedParts.push({ id: p.id, part: flipNinety })
        expandedParts.push({ id: p.id, part: flipOneeighty })
        expandedParts.push({ id: p.id, part: flipSeventwenty })
      })

      // Keep track of the possible matches for each part
      this.matches = {}
      expandedParts.forEach(p => {
        const m = expandedParts.filter(q => this.match(p.part, q.part, 'left') || this.match(p.part, q.part, 'top') || this.match(p.part, q.part, 'bottom') || this.match(p.part, q.part, 'right')).map(q => q.id)
        if (!this.matches[p.id]) {
          this.matches[p.id] = new Set()
        }

        m.filter(c => c !== p.id).forEach(c => this.matches[p.id].add(c))
      })

      return expandedParts
    },
    recurse: function (allParts, usedParts, index, usedIds) {
      // Get the x and y position in the puzzle
      const x = index % this.width
      const y = Math.floor(index / this.width)

      // If we've hit the last index (bottom right of the puzzle), return the used parts
      if (index === this.parts.length) {
        return usedParts
      }

      // Get the part to the left and the top if this one
      const left = x > 0 ? usedParts[index - 1] : null
      const top = y > 0 ? usedParts[index - this.width] : null

      // Get all possible options for this position by exluding all the ones we've used already
      const possibleParts = allParts.filter(p => usedIds.indexOf(p.id) === -1)

      // Iterate through them all
      for (let i = 0; i < possibleParts.length; i++) {
        const p = possibleParts[i]
        // If they match together
        if ((!left || (this.matches[left.id].has(p.id) && this.match(left.part, p.part, 'right'))) && (!top || (this.matches[top.id].has(p.id) && this.match(top.part, p.part, 'bottom')))) {
          // Take a copy of the arrays
          const tempUsedParts = usedParts.concat()
          const tempUsedIds = usedIds.concat()
          // Add this one
          tempUsedParts.push(p)
          tempUsedIds.push(p.id)

          // Continue recursively
          const res = this.recurse(allParts, tempUsedParts, index + 1, tempUsedIds)

          // If we found a result, return it
          if (res !== null) {
            return res
          }
        }
      }

      // We have not found a result
      return null
    },
    match: function (one, two, side) {
      switch (side) {
        case 'bottom':
          // Check the bottom of `one` matches the top of `two`
          return JSON.stringify(one[one.length - 1]) === JSON.stringify(two[0])
        case 'top':
          // Check the top of `one` matches the bottom of `two`
          return JSON.stringify(one[0]) === JSON.stringify(two[two.length - 1])
        case 'right':
          // Check the right of `one` matches the left of `two`
          return JSON.stringify(one.map(r => r[r.length - 1])) === JSON.stringify(two.map(r => r[0]))
        case 'left':
          // Check the left of `one` matches the right of `two`
          return JSON.stringify(one.map(r => r[0])) === JSON.stringify(two.map(r => r[r.length - 1]))
      }
    },
    replaceAll: function (grid, monster) {
      // Keep track of the number of monsters
      let counter = 0
      // Iterate through the grid
      grid.forEach((row, y) => {
        row.forEach((_, x) => {
          // Keep track of whether all monster positions exist and are '#'s
          const all = monster.filter(m => grid[y + m[0]] !== undefined && grid[y + m[0]][x + m[1]] === '#').length === monster.length

          // If we have a complete monster, replace all parts with 'O's
          if (all) {
            monster.forEach(m => {
              // Set it to 'O' to indicate it's been used
              grid[y + m[0]][x + m[1]] = 'O'
              counter++
            })
          }
        })
      })

      return counter > 0
    },
    solvePartOne: function () {
      // Expand the parts by getting all rotated and flipped options
      const expanded = this.expand(this.parts)

      // Solve this recursively. We start with all parts, no used parts, the top left index and no used ids.
      this.usedParts = this.recurse(expanded, [], 0, [])

      // The result is the corner ids multiplicated together
      this.solutions.partOne = this.usedParts[0].id * this.usedParts[this.width - 1].id * this.usedParts[this.usedParts.length - 1].id * this.usedParts[this.usedParts.length - this.width].id
    },
    solvePartTwo: function () {
      // Map each part by removing its border
      const borderRemoved = this.usedParts.map(p => {
        // Remove first and last row based on the index
        return p.part.filter((row, index) => index !== 0 && index !== p.part.length - 1)
         .map(row => {
           // Within each row, remove first and last entry
           row.shift()
           row.pop()
           return row.map(c => c ? '#' : '.').join('')
         })
      })

      // Join them all together
      const joined = []
      // Iterate width in both dimensions across the parts
      for (let y = 0; y < this.width; y++) {
        for (let x = 0; x < this.width; x++) {
          // Get the index of the part in our result
          const part = borderRemoved[y * this.width + x]

          // Within the part
          for (let innerY = 0; innerY < part.length; innerY++) {
            // Get the index in the joined grid
            const joinedY = y * 8 + innerY
            // If it doesn't exist, create it
            if (joined.length <= joinedY) {
              joined.push('')
            }

            // Then concatenate the parts
            joined[joinedY] = joined[joinedY] + part[innerY]
          }
        }
      }

      // Finally, we split it back apart
      const largeGrid = joined.map(j => j.split(''))

      const rotatedAndFlipped = this.expand([{ id: null, part: largeGrid }])

      // Define the monster as relative coordinates
      const monster = [
        [0, 18],
        [1, 0], [1, 5], [1, 6], [1, 11], [1, 12], [1, 17], [1, 18], [1, 19],
        [2, 1], [2, 4], [2, 7], [2, 10], [2, 13], [2, 16]
      ]

      rotatedAndFlipped.forEach(r => {
        const part = r.part
        // Check if the monster exists in there
        if (this.replaceAll(part, monster)) {
          // Count the non-monster '#'s
          const counter = part.map(row => row.filter(c => c === '#').length).reduce((a, b) => a + b)

          // Start the drawer
          this.gridTwo = new MonsterDrawer(part).getFormattedGrid()

          // The answer is the count
          this.solutions.partTwo = counter
        }
      })
    }
  }
}
</script>

<style>
.day-20-code {
  background-color: #2c3e50;
  color: #7f8c8d;
}
.day-20-monster {
  background-color: #2ecc71;
  color: #2c3e50;
}
</style>
