<template>
  <Day :day="6" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="year-2016-day-6-code border">
  <code v-html="letters" />
      </pre>
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
      letters: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const individuals = input.map(i => i.split(''))

      const counts = individuals[0].map(_ => { return {} })

      individuals.forEach(letters => {
        letters.forEach((l, i) => {
          counts[i][l] = (counts[i][l] || 0) + 1
        })
      })

      this.solutions.partOne = counts.map(c => {
        let max = 0
        let result = null

        Object.keys(c).forEach(k => {
          if (c[k] > max) {
            max = c[k]
            result = k
          }
        })

        return result
      }).join('')

      this.solutions.partTwo = counts.map(c => {
        let min = Number.MAX_SAFE_INTEGER
        let result = null

        Object.keys(c).forEach(k => {
          if (c[k] < min) {
            min = c[k]
            result = k
          }
        })

        return result
      }).join('')

      this.letters = this.getCode(individuals, this.solutions.partOne, this.solutions.partTwo)
    },
    getCode: function (individuals, low, high) {
      const lowSplit = low.split('')
      const highSplit = high.split('')

      let result = ''

      individuals.forEach(letters => {
        letters.forEach((l, i) => {
          if (lowSplit[i] === l) {
            result += `<span class="year-2016-day-6-low">${l}</span>`
          } else if (highSplit[i] === l) {
            result += `<span class="year-2016-day-6-high">${l}</span>`
          } else {
            result += l
          }
        })
        result += '<br/>'
      })

      return result
    }
  }
}
</script>

<style>
.year-2016-day-6-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 50vh;
}
.year-2016-day-6-high {
  background-color:#27ae60;
  color: #2c3e50;
}
.year-2016-day-6-low {
  background-color: #2980b9;
  color: #2c3e50;
}
</style>
