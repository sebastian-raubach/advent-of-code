export default class PathDrawer {
  constructor (input, paths) {
    this.$input = input
    this.$paths = paths
  }

  getPathGrid () {
    let result = ''
    // Calculate how many times the grid repeats in x direction
    const xRepeats = this.$paths.map(p => {
      return Math.ceil(p[p.length - 1].x / this.$input[0].length)
    }).reduce((a, b) => Math.max(a, b))

    // Get a map of all cells on the path
    const onPath = {}
    this.$paths.forEach(p => {
      p.forEach(c => {
        onPath[`${c.x}-${c.y}`] = c.hit
      })
    })

    // Each row
    for (let y = 0; y < this.$input.length; y++) {
      // Repeat the for xRepeat times
      for (let rep = 0; rep < xRepeats; rep++) {
        // Then draw the row
        for (let x = 0; x < this.$input[y].length; x++) {
          const value = this.$input[y][x] ? '#' : '.'
          const totalX = this.$input[y].length * rep + x
          const isHit = onPath[`${totalX}-${y}`]

          if (isHit === true) {
            result += '<span class="day-3-path-hit">X</span>'
          } else if (isHit === false) {
            result += '<span class="day-3-path-miss">O</span>'
          } else {
            result += value
          }
        }
      }
      result += '<br/>'
    }

    return result
  }
}
