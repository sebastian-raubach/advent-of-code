<template>
  <Day :day="20" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partTwo>
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" width="800" height="500" />
      </div>
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
      images: null,
      round: 0,
      bounds: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      const algo = input[0].split('').map(c => c === '#' ? 1 : 0)

      let image = new Map()

      // Parse the grid
      input.slice(2).forEach((r, y) => r.split('').forEach((c, x) => image.set(`${x},${y}`, c === '#' ? 1 : 0)))

      // Keep track of all intermediate images for drawing
      const images = [image]
      // Keep track of background polarity
      let polarity = 0
      for (let i = 0; i < 50; i++) {
        // Enhance the image
        image = this.enhance(image, algo, polarity)

        // Switch polarity
        if (algo[0] === 1) {
          polarity = 1 - polarity
        }

        if (i === 1) {
          // Part one
          this.solutions.partOne = this.count(image)
        }

        // Remember image
        images.push(image)
      }

      // Part two
      this.solutions.partTwo = this.count(image)

      this.images = images
      this.round = 0

      this.$nextTick(() => this.drawInit())
    },
    count: function (image) {
      let counter = 0
      // Count all hashes
      image.forEach((value, key) => {
        if (value) {
          counter++
        }
      })
      return counter
    },
    enhance: function (image, algo, polarity) {
      const enhanced = new Map()

      // Determine span in x and y of grid
      let minX = Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxX = -Number.MAX_SAFE_INTEGER
      let maxY = -Number.MAX_SAFE_INTEGER
      image.forEach((value, key) => {
        const coords = key.split(',').map(c => +c)
        minX = Math.min(minX, coords[0])
        minY = Math.min(minY, coords[1])
        maxX = Math.max(maxX, coords[0])
        maxY = Math.max(maxY, coords[1])
      })

      for (let y = minY - 1; y < maxY + 2; y++) {
        for (let x = minX - 1; x < maxX + 2; x++) {
          // Get the binary string based on the neighbors
          const binaryString = this.getNeighbors(x, y).map(c => {
            const coord = c.join(',')
            if (image.has(coord)) {
              return image.get(coord)
            } else {
              return polarity
            }
          }).join('')

          // Get the value from the algorighm
          const index = parseInt(binaryString, 2)
          if (algo[index]) {
            enhanced.set(`${x},${y}`, 1)
          } else {
            enhanced.set(`${x},${y}`, 0)
          }
        }
      }

      return enhanced
    },
    getNeighbors: function (x, y) {
      return [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
              [x - 1, y], [x, y], [x + 1, y],
              [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]]
    },
    drawInit: function () {
      this.bounds = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }

      this.images.forEach(i => {
        i.forEach((value, key) => {
          const coords = key.split(',').map(c => +c)

          this.bounds.left = Math.min(this.bounds.left, coords[0])
          this.bounds.right = Math.max(this.bounds.right, coords[0])
          this.bounds.top = Math.min(this.bounds.top, coords[1])
          this.bounds.bottom = Math.max(this.bounds.bottom, coords[1])
        })
      })

      this.canvas = document.getElementById('partTwo')
      const factor = 2
      this.canvas.width = factor * (Math.abs(this.bounds.left) + Math.abs(this.bounds.right))
      this.canvas.height = factor * (Math.abs(this.bounds.top) + Math.abs(this.bounds.bottom))
      this.ctx = this.canvas.getContext('2d')
      this.ctx.scale(factor, factor)
      this.ctx.translate(Math.abs(this.bounds.left), Math.abs(this.bounds.top))

      this.draw()
    },
    draw: function () {
      this.ctx.fillStyle = '#006266'
      this.ctx.fillRect(this.bounds.left, this.bounds.top, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = '#C4E538'

      const image = this.images[this.round]

      image.forEach((value, key) => {
        if (value) {
          const coords = key.split(',').map(c => +c)

          this.ctx.fillRect(coords[0], coords[1], 1, 1)
        }
      })

      this.round = (this.round + 1) % this.images.length

      setTimeout(() => window.requestAnimationFrame(this.draw), 100)
    }
  }
}
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 500px;
  width: 100%;
}
</style>
