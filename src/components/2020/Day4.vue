<template>
  <Day :day="4" :year="2020" :solutions="solutions" @input-changed="onInputChanged" />
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
      passportRequirements: {
        // For all years, check they are numbers and in range
        byr: (value) => this.isInRange(value, 1920, 2002),
        iyr: (value) => this.isInRange(value, 2010, 2020),
        eyr: (value) => this.isInRange(value, 2020, 2030),
        // For hair color check the hex value
        hcl: (value) => /^#[0-9A-F]{6}$/i.test(value),
        // Eye color has to be one of the options
        ecl: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) !== -1,
        // The id has to be a number and length 9
        pid: (value) => !isNaN(+value) && value.length === 9,
        hgt: (value) => {
          // For heights, check the system, then the range
          let number
          if (value.indexOf('in') !== -1) {
            number = +(value.replace('in', ''))
            return !isNaN(number) && number >= 59 && number <= 76
          } else if (value.indexOf('cm') !== -1) {
            number = +(value.replace('cm', ''))
            return !isNaN(number) && number >= 150 && number <= 193
          } else {
            // If we get here, neither 'in' nor 'cm' was specified => invalid
            return false
          }
        }
      },
      passports: []
    }
  },
  methods: {
    /**
     * Checks whether the given value is a number and within range.
     * @param value The value to check
     * @param min The lower range bound (inclusive)
     * @param max The upper range bound (inclusive)
     * @returns `true` if the given value is a number and within range. `false` otherwise.
     */
    isInRange: function (value, min, max) {
      const number = +value
      return !isNaN(number) && number >= min && number <= max
    },
    onInputChanged: function (input) {
      // Parse the passports
      let currentPassport = {}
      // Go through all lines
      for (let p = 0; p < input.length; p++) {
        // If it's a blank line, save the passport and start a new one
        if (input[p].length < 1) {
          this.passports.push(currentPassport)
          currentPassport = {}
        } else {
          // Else, split the data on spaces
          const parts = input[p].split(/\s+/)

          // Then save each part
          parts.forEach(p => {
            // Split key and value
            const keyValue = p.split(':')
            // Store them in the object
            currentPassport[keyValue[0]] = keyValue[1]
          })
        }
      }
      this.passports.push(currentPassport)

      this.solvePartOne()
      this.solvePartTwo()
    },
    solvePartOne: function () {
      // Filter out invalid passports
      this.solutions.partOne = this.passports.filter(p => this.isPassportValidPartOne(p)).length
    },
    solvePartTwo: function () {
      // Filter first valid passports from part one, then part two
      this.solutions.partTwo = this.passports.filter(p => this.isPassportValidPartOne(p)).filter(p => this.isPassportValidPartTwo(p)).length
    },
    isPassportValidPartOne: function (passport) {
      return Object.keys(this.passportRequirements).filter(r => passport[r] !== undefined && passport[r] !== null).length === Object.keys(this.passportRequirements).length
    },
    isPassportValidPartTwo: function (passport) {
      // Check all password requirements
      return Object.keys(this.passportRequirements).filter(req => this.passportRequirements[req](passport[req])).length === Object.keys(this.passportRequirements).length
    }
  }
}
</script>

<style>

</style>
