<template>
  <Day :day="18" :year="2017" :solutions="solutions" @input-changed="onInputChanged" />
</template>

<script>
import Day from '@/components/Day'
import DuetProgram from '@/util/DuetProgram'

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
      // Parse the input
      const inst = input.map(i => {
        const parts = i.split(' ')
        return {
          inst: parts[0],
          reg: parts[1],
          value: parts.length > 2 ? parts[2] : null
        }
      })

      let p1 = new DuetProgram(0, inst)
      this.solutions.partOne = p1.run()

      p1 = new DuetProgram(0, inst)
      const p2 = new DuetProgram(1, inst)
      p1.setLink(p2)
      p2.setLink(p1)

      do {
        // While p1 isn't finished, let it run
        if (!p1.isFinished()) {
          p1.run()
        }
        // While p1 isn't finished, let it run
        if (!p2.isFinished()) {
          p2.run()
        }
      } while (!p1.isStuck() || !p2.isStuck())

      this.solutions.partTwo = p2.getSendCount()
    }
  }
}
</script>

<style scoped>
</style>
