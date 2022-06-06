<template>
  <Day :day="17" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      target: 150,
      buckets: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.buckets = input.map((v, i) => { return { value: +v, index: i } })

      this.solutions.partOne = this.dfs([], this.buckets)
    },
    dfs: function (used, remaining) {
      const sum = used.reduce((a, b) => a.value + b.value, 0)

      if (sum === this.target) {
        console.log('solution found', used)
        return 1
      } else if (sum > this.target) {
        return 0
      } else if (remaining.length > 0) {
        return remaining.map((r, i) => {
          const tempRemaining = remaining.concat()
          tempRemaining.splice(i, 1)
          const tempUsed = used.concat()
          tempUsed.push(r)

          if (sum + r.value <= this.target) {
            return this.dfs(tempUsed, tempRemaining)
          } else {
            return 0
          }
        }).reduce((a, b) => a + b, 0)
      } else {
        return 0
      }
    }
  }
}
</script>

<style>

</style>
