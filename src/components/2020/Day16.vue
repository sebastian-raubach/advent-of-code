<template>
  <Day :day="16" :year="2020" :solutions="solutions" @input-changed="onInputChanged">
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
      this.parseInput(input)
      this.solvePartOne()
      this.solvePartTwo()
    },
    parseInput: function (input) {
      this.ourTicket = null
      this.nearbyTickets = []
      this.fields = {}

      let part = 0
      for (let i = 0; i < input.length; i++) {
        // Empty rows indicate a new section
        if (input[i] === '') {
          part++
          continue
        }

        // Skip ticket rows
        if (input[i].indexOf('ticket') !== -1) {
          continue
        }

        // Handle the row depending on which part we're in
        switch (part) {
          case 0: {
            // Split the field and value
            const parts = input[i].split(': ')
            // Split the value ranges
            const ranges = parts[1].split(' or ')
            // Remember the field to range mapping
            this.fields[parts[0]] = ranges.map(r => r.split('-').map(l => +l))
            break
          }
          case 1:
            // This is our ticket, just split it
            this.ourTicket = input[i].split(',').map(n => +n)
            break
          case 2:
            // These are other tickets, simply split them
            this.nearbyTickets.push(input[i].split(',').map(n => +n))
            break
        }
      }
    },
    /**
     * Checks whether the given ticket is valid
     * @param t The ticket to check
     * @returns `true` if the ticket is valid, `false` otherwise
     */
    isTicketValid: function (t) {
      // Check if for EVERY value, there exists SOME field that has a valid range this value falls into
      return t.every(v => Object.keys(this.fields).some(f => this.fields[f].some(r => r[0] <= v && r[1] >= v)))
    },
    solvePartOne: function () {
      // Map all tickets to the sum of their invalid values
      const filtered = this.nearbyTickets.map(t => {
        // Filter out all valid values
        const innerFiltered = t.filter(v => {
          // Check if there's a field that matches the value
          let found = false
          Object.keys(this.fields).forEach(f => {
            if (this.fields[f].some(a => a[0] <= v && a[1] >= v)) {
              found = true
            }
          })
          // If there is a match, don't include this one
          return !found
        })
        // Sum up all invalid values (PER TICKET)
        return innerFiltered.reduce((a, b) => a + b, 0)
      })

      // Sum up all invalid values (ACROSS TICKETS)
      this.solutions.partOne = filtered.reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Remove invalid tickets
      const validTickets = this.nearbyTickets.filter(t => this.isTicketValid(t))

      // Get all distinct values for each position/field/column
      const positionValues = Object.keys(this.fields).map((f, i) => {
        const values = new Set()
        validTickets.forEach(t => values.add(t[i]))
        return Array.from(values)
      })

      // Create a copy of the fields, as we'll be deleting keys
      const fieldCopy = JSON.parse(JSON.stringify(this.fields))
      // Remember the mapping of field name to index
      const fieldMapping = {}
      // Get all position/field/column indices
      let indices = Array.from(Array(Object.keys(fieldCopy).length).keys()).map(i => i)

      // While there is an index that still hasn't been matched
      while (indices.length > 0) {
        // Map each index to the list of matching fields
        const matchingFields = indices.map(i => {
          return {
            index: i,
            // Filter the fields down to those where EVERY column value is in SOME of the ranges
            matches: Object.keys(fieldCopy).filter(f => {
              return positionValues[i].every(v => fieldCopy[f].some(a => a[0] <= v && a[1] >= v))
            })
          }
        })

        // Now, for each matching field
        matchingFields.forEach(f => {
          // If there is only one match, there's a unique mapping
          if (f.matches.length === 1) {
            // Remember the mapping
            fieldMapping[f.matches[0]] = f.index
            // Delete this field, so we won't consider it again
            delete fieldCopy[f.matches[0]]
            // And delete the column index, as we've mapped it
            indices = indices.filter(j => f.index !== j)
          }
        })
      }

      // The solution is using all fields containing 'departure' and multiplying their values together
      this.solutions.partTwo = Object.keys(fieldMapping).filter(k => k.includes('departure')).map(k => this.ourTicket[fieldMapping[k]]).reduce((a, b) => a * b, 1)
    }
  }
}
</script>

<style>

</style>
