<template>
  <Day :day="20" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <p class="text-info">The output below can be saved as a text file each and loaded into <a href="https://helium.hutton.ac.uk">Helium</a> to visualize the graph structure as well as the importance of each node.</p>
      <pre class="year-2023-day-20-code border">
<code v-html="pedigreeFile" />
      </pre>
      <pre class="year-2023-day-20-code border">
<code v-html="traitFile" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { lcm } from '@/util/math'

const FLIP_FLIP = '%'
const CONFUNCTION = '&'
const BROADCASTER = 'broadcaster'

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
      let nodes = this.parse(input)

      let helium = 'Line\tParent\n'
      let trait = '#heliumInput = PHENOTYPE\nLineName\tNodeType\n'
      Object.keys(nodes).forEach(n => {
        if (nodes[n].sources) {
          nodes[n].sources.forEach(s => {
            helium += `${n}\t${s}\n`
          })
        }
        trait += `${n}\t${nodes[n].type}\n`
      })
      this.pedigreeFile = helium
      this.traitFile = trait

      this.solutions.partOne = this.solve(nodes, false)
      nodes = this.parse(input)
      this.solutions.partTwo = this.solve(nodes, true)
    },
    parse: function (input) {
      const nodes = {}

      input.forEach(i => {
        const [left, right] = i.split(' -> ').map((j, ji) => ji === 1 ? j.split(', ') : j)

        let type = null

        if (left.startsWith(FLIP_FLIP)) {
          type = FLIP_FLIP
        } else if (left.startsWith(CONFUNCTION)) {
          type = CONFUNCTION
        } else if (left === 'broadcaster') {
          type = BROADCASTER
        }

        const name = left.replace(/[%&]/g, '')

        const source = nodes[name] || { name: name, sources: [], targets: [], type: type, highPulsesSent: 0, lowPulsesSent: 0 }
        const targets = right.map(r => nodes[r] || { name: r, sources: [], targets: [], type: null, highPulsesSent: 0, lowPulsesSent: 0 })

        targets.forEach(t => {
          t.sources.push(source.name)
          nodes[t.name] = t
        })
        source.targets.push(...right)
        source.type = type
        if (source.type === FLIP_FLIP) {
          source.state = false
        }
        nodes[source.name] = source
      })

      Object.values(nodes).forEach(n => {
        if (n.type === CONFUNCTION) {
          n.memory = {}
          n.sources.forEach(s => {
            n.memory[s] = false
          })
        }
      })
      nodes.broadcaster.sources = ['button']

      return nodes
    },
    solve: function (nodes, isPartTwo = false) {
      const inputMemoryLoops = {}
      const rxSource = nodes.rx.sources[0]

      nodes[rxSource].sources.forEach(s => {
        inputMemoryLoops[s] = null
      })

      const queue = []

      const addToQueue = (pulse, destinationName, sender) => {
        if (sender) {
          if (pulse) {
            sender.highPulsesSent++
          } else {
            sender.lowPulsesSent++
          }
        }

        queue.unshift({
          pulse: pulse,
          module: nodes[destinationName],
          sender: sender ? (sender.name || '') : ''
        })
      }

      let buttonPresses = 0

      const pushButton = () => {
        buttonPresses++
        addToQueue(false, 'broadcaster')

        while (queue.length > 0) {
          const item = queue.pop()

          if (item.module === null) {
            continue
          }

          if (item.module.type === 'broadcaster') {
            item.module.targets.forEach(t => addToQueue(false, t, item.module))
          } else if (item.module.type === FLIP_FLIP && !item.pulse) {
            item.module.state = !item.module.state
            item.module.targets.forEach(t => addToQueue(item.module.state, t, item.module))
          } else if (item.module.type === CONFUNCTION) {
            if (item.module.name === rxSource) {
              // if this is the first time that one of the rx source's source inputs sends a high pulse, record the cycle length
              if (inputMemoryLoops[item.sender] === null && item.pulse) {
                inputMemoryLoops[item.sender] = buttonPresses
              }
            }

            // remember the state of the input
            item.module.memory[item.sender] = item.pulse
            const pulseToSend = !Object.values(item.module.memory).every(p => p)
            item.module.targets.forEach(t => addToQueue(pulseToSend, t, item.module))
          }
        }
      }

      for (let i = 0; i < (isPartTwo ? Number.MAX_SAFE_INTEGER : 1000); i++) {
        pushButton()

        if (isPartTwo) {
          const memoryLoopValues = Object.values(inputMemoryLoops)
          // if we've found all cycle lengths, output when they will all coincide
          if (memoryLoopValues.every(v => v != null)) {
            return lcm(memoryLoopValues)
          }
        }
      }

      // Part 1 solution
      // Every button push sends a low pulse, which is not accounted for in the rest of the code
      let totalLow = 1000
      let totalHigh = 0
      Object.values(nodes).forEach(m => {
        totalLow += m.lowPulsesSent
        totalHigh += m.highPulsesSent
      })

      return totalLow * totalHigh
    }
  }
}
</script>

<style>
.year-2023-day-20-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 300px;
}
</style>
