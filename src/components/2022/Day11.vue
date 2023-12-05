<template>
  <Day :day="11" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
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
      ops: {
        '+': (a, b) => a + b,
        '*': (a, b) => a * b,
        self: (a, b) => a * a
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const monkeys = []
      for (let i = 0; i < input.length; i += 7) {
        const items = input[i + 1].split(': ')[1].split(', ').map(p => +p)
        const [op, amount] = input[i + 2].split(': new = old ')[1].split(' ')
        const div = +input[i + 3].split(' by ')[1]
        const trueTo = +input[i + 4].split(' monkey ')[1]
        const falseTo = +input[i + 5].split(' monkey ')[1]

        monkeys.push({
          items: items,
          op: amount === 'old' ? 'self' : op,
          amount: amount === 'old' ? 1 : +amount,
          div: div,
          trueTo: trueTo,
          falseTo: falseTo,
          count: 0
        })
      }

      const monkeys2 = JSON.parse(JSON.stringify(monkeys))

      this.solutions.partOne = this.solve(monkeys, false)
      this.solutions.partTwo = this.solve(monkeys2, true)
    },
    solve: function (monkeys, isPTwo) {
      const mod = monkeys.map(m => m.div).reduce((a, b) => a * b)

      const limit = isPTwo ? 10000 : 20
      for (let round = 0; round < limit; round++) {
        monkeys.forEach(m => {
          // Adjust worry level
          m.items = m.items.map(i => this.ops[m.op](i, m.amount))
          // Reduce worry level
          if (isPTwo) {
            m.items = m.items.map(i => i % mod)
          } else {
            m.items = m.items.map(i => Math.floor(i / 3))
          }

          // Adjust inspect count
          m.count += m.items.length

          m.items.forEach(i => {
            if (i % m.div === 0) {
              monkeys[m.trueTo].items.push(i)
            } else {
              monkeys[m.falseTo].items.push(i)
            }
          })

          m.items = []
        })
      }

      monkeys.sort((a, b) => b.count - a.count)

      return monkeys[0].count * monkeys[1].count
    }
  }
}
</script>

<style>
</style>
