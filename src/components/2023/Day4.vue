<template>
  <Day :day="4" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      const pattern = /Card\s+(?<card>\d+): (?<winning>.+) \| (?<having>.+)/

      const parsed = input.map(i => {
        const res = i.match(pattern).groups

        const winning = res.winning.trim().split(/\s+/).map(Number)
        const having = res.having.trim().split(/\s+/).map(Number)

        const overlap = having.filter(h => winning.includes(h)).length

        return {
          overlap: overlap,
          value: overlap > 0 ? Math.pow(2, overlap - 1) : 0
        }
      })

      this.solutions.partOne = parsed.map(p => p.value).reduce((a, b) => a + b, 0)

      const mapping = {}

      parsed.forEach((_, i) => { mapping[i] = 1 })

      for (let i = 0; i < parsed.length; i++) {
        const count = mapping[i]

        if (parsed[i].overlap > 0) {
          const bound = Math.min(parsed.length, i + 1 + parsed[i].overlap)
          for (let j = i + 1; j < bound; j++) {
            mapping[j] += count
          }
        }
      }

      this.solutions.partTwo = Object.values(mapping).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style>

</style>
