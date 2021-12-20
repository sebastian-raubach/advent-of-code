<template>
  <Day :day="19" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div id="partOne" />
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

// Create a map that, for missing keys, sets them to a default value
class MapWithDefault extends Map {
  get (key) {
    if (!this.has(key)) {
      this.set(key, this.default())
    }
    return super.get(key)
  }

  constructor (defaultFunction, entries) {
    super(entries)
    this.default = defaultFunction
  }
}

const transforms = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [x, y, -z],
  ([x, y, z]) => [x, -y, z],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-x, y, z],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-x, -y, -z],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [z, x, -y],
  ([x, y, z]) => [z, -x, y],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-z, x, y],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [-z, -x, -y],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [y, z, -x],
  ([x, y, z]) => [y, -z, x],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-y, z, x],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-y, -z, -x],
  ([x, y, z]) => [x, z, y],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [x, -z, -y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [-x, z, -y],
  ([x, y, z]) => [-x, -z, y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [y, x, z],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [y, -x, -z],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [-y, x, -z],
  ([x, y, z]) => [-y, -x, z],
  ([x, y, z]) => [-y, -x, -z],
  ([x, y, z]) => [z, y, x],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [z, -y, -x],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [-z, y, -x],
  ([x, y, z]) => [-z, -y, x],
  ([x, y, z]) => [-z, -y, -x]
]

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
      const scanners = []

      let currentScanner = []
      for (let i = 0; i < input.length; i++) {
        if (input[i].length < 1) {
          // Empty row, push the scanner data onto the array
          scanners.push(currentScanner)
          currentScanner = []
        } else if (input[i].startsWith('---')) {
          // Skip header rows
        } else {
          // Add the beacon coordinates
          currentScanner.push(input[i].split(',').map(c => +c))
        }
      }

      // Add the last scanner
      scanners.push(currentScanner)

      // Start by setting the first scanner as the origin
      const absoluteCoords = {
        '0,0,0': scanners[0]
      }

      // Keep the rest as unmapped
      const unmapped = scanners.slice(1)

      // While there are still unmapped scanners
      restart: while (unmapped.length > 0) {
        // Iterate through all the fixed scanners
        for (const ac in absoluteCoords) {
          // Get the fixed scanner beacon coordinates
          const known = absoluteCoords[ac]
          // Go through the unmapped scanners
          for (let i = 0; i < unmapped.length; i++) {
            // Go through all transforms
            for (const transform of transforms) {
              // Transform the unmapped coordinates using the current transform
              const possible = unmapped[i].map(transform)

              // Count hits
              const hits = new MapWithDefault(() => 0)

              // For each of the known coordinates
              for (let k = 0; k < known.length; k++) {
                // Compare to all of the unmapped coordinates
                for (let p = 0; p < possible.length; p++) {
                  // Get the delta
                  const v = this.minus(known[k], possible[p])
                  // Create the key
                  const vk = v.join(',')

                  // Count a hit
                  hits.set(vk, hits.get(vk) + 1)

                  // If we found enough hits
                  if (hits.get(vk) >= 12) {
                    // Add the delta
                    const found = possible.map(b => this.plus(v, b))
                    // Add to mapped scanners
                    absoluteCoords[vk] = found
                    // Remove from unmapped
                    unmapped.splice(i, 1)
                    // Start over
                    continue restart
                  }
                }
              }
            }
          }
        }
      }

      const beacons = new Set()

      for (const ac in absoluteCoords) {
        absoluteCoords[ac].forEach(c => beacons.add(c.join('')))
      }

      this.solutions.partOne = beacons.size

      const scannerCoords = Object.keys(absoluteCoords).map(s => s.split(',').map(c => +c))

      let max = 0
      scannerCoords.forEach((a, i) => {
        scannerCoords.forEach((b, j) => {
          if (i !== j) {
            max = Math.max(max, this.manhattan(a, b))
          }
        })
      })

      this.solutions.partTwo = max
    },
    manhattan: function (a, b) {
      return a.map((v, i) => Math.abs(v - b[i])).reduce((a, b) => a + b, 0)
    },
    plus: function (a, b) {
      return a.map((v, i) => v + b[i])
    },
    minus: function (a, b) {
      return a.map((v, i) => v - b[i])
    }
  }
}
</script>

<style scoped>
</style>
