<template>
  <Day :day="10" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <pre class="day-10-code border">
<code v-html="gridTwo" />
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
      gridTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const parsed = input.map(i => {
        const [inst, diff] = i.split(' ')

        return {
          inst: inst,
          diff: diff !== undefined ? +diff : null
        }
      })

      const display = new Array(6).fill(0).map(() => new Array(40).fill('.'))

      let sum = 0
      let cycle = 1
      let x = 1
      let crt = 0

      parsed.forEach(r => {
        sum += this.tick(cycle, x)
        this.adjustDisplay(display, crt, x)

        if (r.inst === 'noop') {
          cycle++
          crt = (crt + 1) % 240
        } else if (r.inst === 'addx') {
          cycle++
          crt = (crt + 1) % 240
          this.adjustDisplay(display, crt, x)
          sum += this.tick(cycle, x)
          cycle++
          crt = (crt + 1) % 240
          x += r.diff
        }
      })

      this.solutions.partOne = sum
      this.solutions.partTwo = 'See display above'
      this.gridTwo = display.map(r => r.map(c => c === '#' ? '<span class="day-10-letter">#</span>' : c).join('')).join('<br/>')
    },
    adjustDisplay: function (display, crt, x) {
      const xIndex = crt % 40
      const yIndex = Math.floor(crt / 40)

      if (xIndex === x) {
        display[yIndex][xIndex] = '#'
      }
      if (xIndex - 1 === x) {
        display[yIndex][xIndex] = '#'
      }
      if (xIndex + 1 === x) {
        display[yIndex][xIndex] = '#'
      }
    },
    tick: function (cycle, x) {
      if (cycle === 20 || ((cycle - 20) % 40) === 0) {
        return cycle * x
      } else {
        return 0
      }
    }
  }
}
</script>

<style>
.day-10-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 100vh;
}
.day-10-letter {
  background-color:#27ae60;
  color: #2c3e50;
}
</style>
