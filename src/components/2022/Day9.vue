<template>
  <Day :day="9" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" :width="canvasOne.width" :height="canvasOne.height" />
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" :width="canvasTwo.width" :height="canvasTwo.height" />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createMultiColorGradient, VIRIDIS } from '@/util/color'

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
      dirs: {
        U: (curr) => { curr.y++ },
        R: (curr) => { curr.x++ },
        D: (curr) => { curr.y-- },
        L: (curr) => { curr.x-- }
      },
      canvasOne: {
        width: 100,
        height: 100
      },
      canvasTwo: {
        width: 100,
        height: 100
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Parse the input into instructions
      const instructions = input.map(i => {
        const [direction, count] = i.split(' ')
        return {
          dir: direction,
          count: +count
        }
      })

      // Solve both parts using different ropes
      const partOne = this.solve(instructions, Array.from(Array(2).keys()).map(_ => { return { x: 0, y: 0 } }))
      this.solutions.partOne = partOne.set.size
      const partTwo = this.solve(instructions, Array.from(Array(10).keys()).map(_ => { return { x: 0, y: 0 } }))
      this.solutions.partTwo = partTwo.set.size

      this.$nextTick(() => {
        this.draw('partOne', this.canvasOne, partOne.head, partOne.tail)
        this.draw('partTwo', this.canvasTwo, partTwo.head, partTwo.tail)
      })
    },
    solve: function (instructions, rope) {
      // Keep track of positions
      const positionSet = new Set()
      positionSet.add('0,0')
      const headArray = []
      headArray.push({ x: 0, y: 0 })
      const tailArray = []
      tailArray.push({ x: 0, y: 0 })

      instructions.forEach(i => {
        // For each instruction, loop over the number of moves
        for (let c = 0; c < i.count; c++) {
          // Move the head
          this.dirs[i.dir](rope[0])
          for (let r = 1; r < rope.length; r++) {
            // Then move the following segments based on the previous (move in pairs)
            this.adjust(rope[r - 1], rope[r])
          }

          // Add new position to set
          positionSet.add(`${rope[rope.length - 1].x},${rope[rope.length - 1].y}`)
          headArray.push({ x: rope[0].x, y: rope[0].y })
          tailArray.push({ x: rope[rope.length - 1].x, y: rope[rope.length - 1].y })
        }
      })

      return {
        set: positionSet,
        head: headArray,
        tail: tailArray
      }
    },
    adjust: function (h, t) {
      // Calculate the delta, signum and absolute difference
      const dX = h.x - t.x
      const dY = h.y - t.y
      const sX = Math.sign(dX)
      const sY = Math.sign(dY)
      const aX = Math.abs(dX)
      const aY = Math.abs(dY)

      // Do we have to do anything?
      if (aX > 1 && aY === 0) {
        // Catch up horizontally
        t.x += sX
      } else if (aY > 1 && aX === 0) {
        // Catch up vertically
        t.y += sY
      } else if ((aY > 1 && aX > 0) || (aY > 0 && aX > 1)) {
        // Catch up diagonally
        t.x += sX
        t.y += sY
      }
    },
    draw: function (id, dims, head, tail) {
      // Initialise the canvas
      const canvas = document.getElementById(id)
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 1

      // Create gradient
      const tailGradient = createMultiColorGradient(VIRIDIS, tail.length)

      let minX = Number.MAX_VALUE
      let maxX = -Number.MAX_VALUE
      let minY = Number.MAX_VALUE
      let maxY = -Number.MAX_VALUE
      head.forEach(a => {
        minX = Math.min(minX, a.x)
        maxX = Math.max(maxX, a.x)
        minY = Math.min(minY, a.y)
        maxY = Math.max(maxY, a.y)
      })
      tail.forEach(a => {
        minX = Math.min(minX, a.x)
        maxX = Math.max(maxX, a.x)
        minY = Math.min(minY, a.y)
        maxY = Math.max(maxY, a.y)
      })

      const factor = 3

      dims.width = (maxX - minX + 1) * factor
      dims.height = (maxY - minY + 1) * factor

      this.$nextTick(() => {
        // Offset for better drawing accuracy
        ctx.translate(-minX * factor, -minY * factor)
        ctx.globalAlpha = 0.2

        head.forEach(a => {
          ctx.fillStyle = '#57606f'
          ctx.fillRect(a.x * factor, a.y * factor, factor, factor)
        })

        ctx.globalAlpha = 1.0
        tail.forEach((a, i) => {
          ctx.fillStyle = tailGradient[i]
          ctx.fillRect(a.x * factor, a.y * factor, factor, factor)
        })

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, factor, factor)
      })
    }
  }
}
</script>

<style>
.canvas-holder {
  overflow-x: auto;
  overflow-y: hidden;
  height: 1000px;
  width: 100%;
}
</style>
