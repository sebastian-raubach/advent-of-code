<template>
  <Day :day="12" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="svg-holder">
        <svg ref="partOne" id="partOne" width="1000"/>
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="svg-holder">
        <svg ref="partTwo" id="partTwo" width="1000"/>
      </div>
    </template>
  </Day>
</template>

<script>
/* eslint-disable new-cap */
import Day from '@/components/Day'
import { createColorGradient } from '@/util/color'

const d3Select = require('d3-selection')
const dagreD3 = require('dagre-d3')

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
      // Keep trackk of (source -> [targets])
      const nodeToNeighbor = new Map()

      // Parse the input
      input.forEach(i => {
        const [source, target] = i.split('-')

        let sourceNeighbors = nodeToNeighbor.get(source)
        let targetNeighbors = nodeToNeighbor.get(target)

        if (!sourceNeighbors) {
          sourceNeighbors = []
        }
        if (!targetNeighbors) {
          targetNeighbors = []
        }

        if (sourceNeighbors.indexOf(target) === -1) {
          sourceNeighbors.push(target)
        }
        if (targetNeighbors.indexOf(source) === -1) {
          targetNeighbors.push(source)
        }

        nodeToNeighbor.set(source, sourceNeighbors)
        nodeToNeighbor.set(target, targetNeighbors)
      })

      const pathsPartOne = this.findAllPaths(nodeToNeighbor)
      this.solutions.partOne = pathsPartOne.size
      const pathsPartTwo = this.findAllPathsWithMultiples(nodeToNeighbor)
      this.solutions.partTwo = pathsPartTwo.size

      this.$nextTick(() => this.drawGraph(nodeToNeighbor, this.$refs.partOne, pathsPartOne))
      this.$nextTick(() => this.drawGraph(nodeToNeighbor, this.$refs.partTwo, pathsPartTwo))
    },
    drawGraph: function (nodeToNeighbor, element, paths) {
      const nodeCount = new Map()

      console.log(paths)

      let min = 0
      let max = 0
      paths.forEach(p => p.split(',').forEach(l => {
        if (!nodeCount.has(l)) {
          nodeCount.set(l, 0)
        }
        const count = nodeCount.get(l) + 1
        nodeCount.set(l, count)

        min = Math.min(min, count)
        max = Math.max(max, count)
      }))

      const g = new dagreD3.graphlib.Graph().setGraph({})

      const nodes = []
      const edges = new Set()

      const gradient = createColorGradient('#C4E538', '#006266', max - min + 1)

      console.log(nodeCount)

      nodeToNeighbor.forEach((v, k) => nodes.push({
        label: k,
        shape: 'circle',
        style: `stroke: black; fill: ${nodeCount.has(k) ? gradient[nodeCount.get(k) - min] : 'white'};`,
        labelStyle: `font-size: ${k === k.toLowerCase() ? 1 : 2}em`
      }))
      nodeToNeighbor.forEach((v, k) => v.forEach(t => {
        const arr = [k, t]
        arr.sort((a, b) => {
          if (a === 'start' || b === 'end') {
            return -1
          } else if (b === 'start' || a === 'end') {
            return 1
          } else {
            return a.localeCompare(b)
          }
        })
        edges.add(`${arr[0]},${arr[1]}`)
      }))

      nodes.sort((a, b) => {
        if (a.label === 'start' || b.label === 'end') {
          return -1
        } else if (b.label === 'start' || a.label === 'end') {
          return 1
        } else {
          return a.label.localeCompare(b.label)
        }
      })

      nodes.forEach(n => g.setNode(n.label, n))
      edges.forEach(e => {
        const [source, target] = e.split(',')
        g.setEdge(source, target, {
          style: 'stroke: black; fill: none;',
          arrowhead: 'undirected'
        })
      })

      const render = new dagreD3.render()

      const svg = d3Select.select(element)
      const svgGroup = svg.append('g')

      // Run the renderer. This is what draws the final graph.
      render(svgGroup, g)

      // Center the graph
      const xCenterOffset = (svg.attr('width') - g.graph().width) / 2
      svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)')
      svg.attr('height', g.graph().height + 40)
    },
    findAllPaths: function (nodeToNeighbor) {
      const source = 'start'

      // Keep track of all found paths. Use a set to ignore multiples found in part 2
      const paths = new Set()
      // Find them by recursive DFS from the start
      this.recurse(source, nodeToNeighbor, null, [], [], paths)

      return paths
    },
    findAllPathsWithMultiples: function (nodeToNeighbor) {
      const source = 'start'

      // Keep track of all found paths. Use a set to ignore multiples found in part 2
      const paths = new Set()

      // Get all lowercase caves
      // Find the paths by recursive DFS from the start allowing this single cave to appear multiple times
      Array.from(nodeToNeighbor.keys()).filter(k => k !== 'start' && k !== 'end' && k.toLowerCase() === k)
        .forEach(l => this.recurse(source, nodeToNeighbor, l, [], [], paths))

      return paths
    },
    recurse: function (current, nodeToNeighbor, multiple, visitedNodes, path, paths) {
      // Remember we visited this one
      visitedNodes.push(current)
      // Add it to the path
      path.push(current)

      if (current === 'end') {
        // If we reached the end, return the path
        paths.add(path.join(','))
        return
      }

      // Count how often we've visited the small cave we can visit twice
      const multipleCount = path.filter(p => p === multiple).length
      // For each neighbor
      nodeToNeighbor.get(current)
        // Filter out visited notes unless they are upper case or it's the one we can visit twice and we haven't yet
        .filter(n => n !== 'start' && ((n === multiple && multipleCount < 2) || n === n.toUpperCase() || visitedNodes.indexOf(n) === -1))
        // DFS into them
        .forEach(n => this.recurse(n, nodeToNeighbor, multiple, visitedNodes.concat(), path.concat(), paths))
    }
  }
}
</script>

<style scoped>
.svg-holder {
  overflow: auto;
  height: 500px;
  width: 100%;
}
</style>
