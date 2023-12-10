<template>
  <Day :day="8" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <p class="text-info">The output below can be saved as a text file each and loaded into <a href="https://helium.hutton.ac.uk">Helium</a> to visualize the graph structure as well as the importance of each node.</p>
      <pre class="year-2023-day-8-code border">
<code v-html="pedigreeFile" />
      </pre>
      <pre class="year-2023-day-8-code border">
<code v-html="traitFile" />
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
      pedigreeFile: null,
      traitFile: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const instructions = input[0].split('').map(i => i === 'L' ? 0 : 1)

      const map = {}
      let pedigree = 'Line\tParent\n'
      const pattern = /(?<from>[A-Z]+) = \((?<left>[A-Z]+), (?<right>[A-Z]+)\)/
      for (let i = 2; i < input.length; i++) {
        const res = input[i].match(pattern).groups

        map[res.from] = [res.left, res.right]
        pedigree += `${res.left}\t${res.from}\n`
        pedigree += `${res.right}\t${res.from}\n`
      }
      this.pedigreeFile = pedigree

      const p1 = this.solve('AAA', instructions, map, ['ZZZ'])
      this.solutions.partOne = p1.counter

      this.traitFile = this.getTraitFile(p1.visitCounts)

      const starts = Object.keys(map).filter(k => k.endsWith('A'))
      const goals = Object.keys(map).filter(k => k.endsWith('Z'))

      const counts = starts.map(s => this.solve(s, instructions, map, goals).counter)

      this.solutions.partTwo = this.lcm(counts)
    },
    lcm: function (values) {
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
      const lcm = (a, b) => a / gcd(a, b) * b
      const lcmAll = (ns) => ns.reduce(lcm, 1)

      return lcmAll(values)
    },
    solve: function (start, instructions, map, goals) {
      let current = start
      let counter = 0
      const counts = {}

      while (!goals.includes(current)) {
        counts[current] = (counts[current] || 0) + 1
        current = map[current][instructions[counter % instructions.length]]
        counter++
      }

      counts[current] = (counts[current] || 0) + 1

      return {
        visitCounts: counts,
        counter: counter
      }
    },
    getTraitFile: function (visitCounts) {
      let result = '#heliumInput = PHENOTYPE\nLineName\tVisitCount\tNodeType\n'

      Object.keys(visitCounts).forEach(l => {
        result += `${l}\t${visitCounts[l]}\t${l === 'AAA' ? 'start' : (l === 'ZZZ' ? 'end' : '')}\n`
      })

      return result
    }
  }
}
</script>

<style>
.year-2023-day-8-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 300px;
}
</style>
