<template>
  <Day :day="13" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      const pattern = /(?<who>[a-zA-Z]+) would (?<type>[a-zA-Z]+) (?<change>\d+) happiness units by sitting next to (?<other>[a-zA-Z]+)./

      const peopleSet = new Set()
      const rules = new Map()

      input.forEach(i => {
        const res = i.match(pattern)

        peopleSet.add(res.groups.who)
        peopleSet.add(res.groups.other)

        rules.set(`${res.groups.who},${res.groups.other}`, res.groups.type === 'gain' ? +res.groups.change : -+res.groups.change)
      })

      const people = Array.from(peopleSet)
      this.solutions.partOne = this.solveFor(rules, people.concat(), [])

      people.push('me')
      this.solutions.partTwo = this.solveFor(rules, people.concat(), [])
    },
    solveFor: function (rules, left, chosen) {
      if (left.length < 1) {
        return this.calculateHappiness(rules, chosen)
      } else {
        let max = 0

        left.forEach(l => {
          const leftCopy = left.concat().filter(o => l !== o)
          const chosenCopy = chosen.concat()
          const next = l
          chosenCopy.push(next)
          max = Math.max(max, this.solveFor(rules, leftCopy, chosenCopy))
        })

        return max
      }
    },
    calculateHappiness: function (rules, ring) {
      let happiness = 0
      ring.forEach((p, i) => {
        const left = ring.at(i - 1)
        const right = ring.at((i + 1) % ring.length)

        const changeLeft = rules.get(`${p},${left}`)
        const changeRight = rules.get(`${p},${right}`)

        if (changeLeft) {
          happiness += changeLeft
        }
        if (changeRight) {
          happiness += changeRight
        }
      })

      return happiness
    }
  }
}
</script>

<style>

</style>
