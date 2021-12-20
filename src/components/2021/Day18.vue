<template>
  <Day :day="18" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
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
      // Start with the first
      let current = input[0]
      for (let i = 1; i < input.length; i++) {
        // Then stepwise add the other onto it
        current = this.add(current, input[i])
      }

      // Convert to an array using the convenient JSON.parse
      const arr = JSON.parse(current)
      // Get the magnitude by traversing the tree
      this.solutions.partOne = this.magnitude(arr)

      // Find the maximum
      let max = 0
      // Pairwise comparison of all pairs
      for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
          // Skip same ones
          if (i === j) {
            continue
          }

          // Calculate the magnitude
          const result = this.magnitude(JSON.parse(this.add(input[i], input[j])))

          // Update maximum
          max = Math.max(max, result)
        }
      }

      this.solutions.partTwo = max
    },
    add: function (one, two) {
      // Create the concatenated array
      let current = `[${one},${two}]`

      // While we found something to compact
      let compacting = false
      do {
        // Explode first
        let result = this.explode(current)
        current = result[0]
        compacting = result[1]

        // If there was no explosion
        if (!compacting) {
          // Check for splits
          result = this.split(current)
          current = result[0]
          compacting = result[1]
        }
      } while (compacting)

      // Return the result of the addition
      return current
    },
    magnitude: function (current) {
      if (isNaN(current)) {
        // For internal nodes, it's 3 times left plus 2 times right
        return 3 * this.magnitude(current[0]) + 2 * this.magnitude(current[1])
      } else {
        // For leaf nodes, it's the value
        return current
      }
    },
    split: function (current) {
      const arr = current.split('')

      // Find numbers that are larger or equal to 10
      let start = null
      let end = null
      let isNumber = false
      // Go through the string from left to right
      for (let i = 0; i < arr.length; i++) {
        // If we find a number
        if (!isNaN(arr[i])) {
          isNumber = true
          if (start === null) {
            // Set the start (left boundary)
            start = i
            // Set an initial value for the end (right boundary)
            end = Math.min(i + 1, arr.length - 1)
          } else {
            // Update the end (right boundary)
            end = Math.min(i + 1, arr.length - 1)
          }
        } else {
          isNumber = false
        }

        // We got to the end
        if (i === arr.length - 1) {
          isNumber = false
        }

        // If we're no longer in the process of parsing a multi-digit number and we found a start and an end
        if (!isNumber && start !== null && end !== null) {
          // Parse the number
          const n = parseInt(current.substring(start, end))

          if (n >= 10) {
            // If it's too large, replace it with an array of floor and ceil
            return [`${current.substring(0, start)}[${Math.floor(n / 2.0)},${Math.ceil(n / 2.0)}]${current.substring(end, current.length)}`, true]
          } else {
            // If it's too small, continue searching
            start = null
            end = null
            isNumber = false
          }
        }
      }

      // Indicate we didn't split
      return [current, false]
    },
    explode: function (current) {
      const arr = current.split('')

      // Count the level by keeping track of opening and closing brackets
      let openCount = 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '[') {
          openCount++
        }
        if (arr[i] === ']') {
          openCount--
        }

        // We found one that's "too deep"
        if (openCount > 4) {
          // Get the end index
          const endIndex = current.indexOf(']', i)
          // Parse the number pair
          const pair = current.substring(i + 1, endIndex).split(',').map(c => +c)
          // Get the left and the right substrings for later
          let left = current.substring(0, i)
          let right = current.substring(endIndex + 1)

          // Go from the found index towards the left to find the first number and increase it
          let start = null
          let end = null
          let isNumber = false
          const leftArr = left.split('')
          for (let l = leftArr.length - 1; l >= 0; l--) {
            if (!isNaN(leftArr[l])) {
              isNumber = true
              if (end === null) {
                // We found the right border
                end = l
                // Initialise the left border
                start = Math.max(0, l - 1)
              } else {
                // Update the left border
                start = Math.max(0, l - 1)
              }
            } else {
              isNumber = false
            }

            if (l === 0) {
              isNumber = false
            }

            // If we're no longer in the process of parsing a multi-digit number and we found a start and an end
            if (!isNumber && start !== null && end !== null) {
              // Update the left side by increasing the number value
              left = `${left.substring(0, start + 1)}${parseInt(left.substring(start + 1, end + 1)) + pair[0]}${left.substring(end + 1, left.length)}`
              break
            }
          }

          start = null
          end = null
          isNumber = false
          const rightArr = right.split('')
          for (let r = 0; r < rightArr.length; r++) {
            if (!isNaN(rightArr[r])) {
              isNumber = true
              if (start === null) {
                // We found the left border
                start = r
                // Initialise the left border
                end = Math.min(rightArr.length - 1, r + 1)
              } else {
                // Update the left border
                end = Math.min(rightArr.length - 1, r + 1)
              }
            } else {
              isNumber = false
            }

            if (r === rightArr.length - 1) {
              isNumber = false
            }

            // If we're no longer in the process of parsing a multi-digit number and we found a start and an end
            if (!isNumber && start !== null && end !== null) {
              // Update the right side by increasing the number value
              right = `${right.substring(0, start)}${parseInt(right.substring(start, end)) + pair[1]}${right.substring(end, right.length)}`
              break
            }
          }

          // Reconstitute the whole string by setting a zero in the middle
          current = `${left}0${right}`

          // Indicate we exploded
          return [current, true]
        }
      }

      // Indicate we didn't explode
      return [current, false]
    }
  }
}
</script>

<style scoped>
</style>
