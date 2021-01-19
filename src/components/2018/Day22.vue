<template>
  <Day :day="22" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-22-code border">
<code v-html="gridOne" />
      </pre>
    </template>
    <template v-slot:partTwo>
      <pre class="day-22-code border">
<code v-html="gridTwo" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

const ROCKY = '.'
const WET = '='
const NARROW = '|'

const TORCH = 0
const GEAR = 1
const NONE = 2
const BOTH = 3

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
      gridOne: null,
      risk: {
        '.': 0,
        '=': 1,
        '|': 2
      },
      types: [ROCKY, WET, NARROW],
      directions: [[1, 0], [0, 1], [-1, 0], [0, -1]],
      validGear: {
        '.': [GEAR, TORCH, BOTH],
        '=': [GEAR, NONE],
        '|': [TORCH, NONE]
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.depth = +input[0].split(' ')[1]
      this.target = input[1].split(' ')[1].split(',').map(c => +c)
      this.solvePartOne()
      this.solvePartTwo()
    },
    getGeoIndex: function (grid, x, y) {
      if ((x === 0 && y === 0) || (x === this.target[0] && y === this.target[1])) {
        // Top left and target have an index of 0
        return 0
      } else if (y === 0) {
        // Top row uses x index
        return x * 16807
      } else if (x === 0) {
        // First column uses y index
        return y * 48271
      } else {
        // Everything else uses the index based on the cell to the top and the one to the left
        return grid[y][x - 1].erosionLevel * grid[y - 1][x].erosionLevel
      }
    },
    solvePartOne: function () {
      this.grid = []
      // Factor 2 was working for me, but just in case I increased this to 3
      const sizeFactor = 3

      // Create the grid
      for (let y = 0; y <= this.target[1] * sizeFactor; y++) {
        // Add a  row
        this.grid.push(Array.from(Array(this.target[0] * sizeFactor + 1).keys()).map(i => { return { geoIndex: null, erosionLevel: null, type: null } }))
        for (let x = 0; x <= this.target[0] * sizeFactor; x++) {
          // Calculate the index, erosion level and type
          this.grid[y][x].geoIndex = this.getGeoIndex(this.grid, x, y)
          this.grid[y][x].erosionLevel = (this.grid[y][x].geoIndex + this.depth) % 20183
          this.grid[y][x].type = this.types[this.grid[y][x].erosionLevel % 3]
        }
      }

      // Print the grid
      this.gridOne = this.print(this.grid.map(r => r.map(c => c.type)))
      // Sum up all risks within the rectangle
      this.solutions.partOne = this.grid.slice(0, this.target[1] + 1).map(r => r.slice(0, this.target[0] + 1).map(c => this.risk[c.type]).reduce((a, b) => a + b)).reduce((a, b) => a + b)
    },
    solvePartTwo: function () {
      // Start location
      const start = {
        tool: TORCH,
        x: 0,
        y: 0,
        type: ROCKY,
        time: 0,
        path: []
      }

      // Priority queue
      const configs = [start]
      // Keep track of best times for x,y,tool combinations
      const bestTime = new Map()
      bestTime.set(`${start.x},${start.y},${start.tool}`, 0)

      // Do a breadth-first-search
      while (true) {
        // Sort them to get the one with the fewest steps
        configs.sort((a, b) => a.time - b.time)

        // Get the one with the lowest time
        const current = configs.shift()

        // If we get to the target, output the time
        if (current.x === this.target[0] && current.y === this.target[1]) {
          this.gridTwo = this.print(this.grid.map(r => r.map(c => c.type)), current.path)
          this.solutions.partTwo = current.time
          return
        }

        this.directions.forEach(d => {
          // Take a copy and adjust the coordinates
          const next = JSON.parse(JSON.stringify(current))
          next.x += d[0]
          next.y += d[1]

          // If we're outside the grid, return
          if (next.y < 0 || next.x < 0 || next.y >= this.grid.length || next.x >= this.grid[next.y].length) {
            return
          }

          // Get the type from the grid
          next.type = this.grid[next.y][next.x].type
          // Adjust the configuration (time + tool)
          this.adjustConfig(current, next)

          const bt = bestTime.get(`${next.x},${next.y},${next.tool}`)
          // If there's already a faster way to get here, return
          if (bt !== undefined && bt <= next.time) {
            return
          }

          // If the next one is the target, but we're using the wrong tool, add 7 to the time
          if (next.x === this.target[0] && next.y === this.target[1]) {
            if (next.tool !== TORCH) {
              next.time += 7
            }
          }

          // Remember the path
          next.path.push({
            x: next.x,
            y: next.y
          })
          // Add the new config
          configs.push(next)
          // Remember the time
          bestTime.set(`${next.x},${next.y},${next.tool}`, next.time)
        })
      }
    },
    adjustConfig: function (current, next) {
      if (current.type === next.type) {
        // Just increase the time by 1
        next.time++
      } else {
        // Get the intersection of gear, because we have to both switch in the current one and enter the next one
        const toolsAllowedInBoth = this.validGear[current.type].filter(v => this.validGear[next.type].includes(v))

        // Add the time for either switching tool and moving or simply moving
        next.time += toolsAllowedInBoth[0] !== current.tool ? 7 + 1 : 1
        // Then adjust the tool
        next.tool = toolsAllowedInBoth[0]
      }
    },
    print: function (grid, path) {
      const onPath = new Set()

      if (path) {
        path.forEach(p => onPath.add(`${p.x},${p.y}`))
      }

      let result = ''
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          let clazz = null
          if (onPath.has(`${x},${y}`)) {
            clazz = 'day-22-path'
          } else if (grid[y][x] === WET) {
            clazz = 'day-22-wet'
          } else if (grid[y][x] === NARROW) {
            clazz = 'day-22-narrow'
          }

          if (clazz) {
            result += `<span class="${clazz}">${grid[y][x]}</span>`
          } else {
            result += grid[y][x]
          }
        }
        result += '<br/>'
      }
      return result
    }
  }
}
</script>

<style>
.day-22-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 50vh;
}
.day-22-wet {
  background-color: #2980b9;
  color: #2c3e50;
}
.day-22-narrow {
  background-color:#27ae60;
  color: #2c3e50;
}
.day-22-path {
  background-color: #ecf0f1;
  color: #2c3e50;
}
</style>
