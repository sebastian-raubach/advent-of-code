export default class MonsterDrawer {
  constructor (grid) {
    this.$grid = grid
  }

  getFormattedGrid () {
    let result = ''

    for (let y = 0; y < this.$grid.length; y++) {
      for (let x = 0; x < this.$grid[y].length; x++) {
        if (this.$grid[y][x] === 'O') {
          result += '<span class="day-20-monster">O</span>'
        } else {
          result += this.$grid[y][x]
        }
      }
      result += '<br/>'
    }

    return result
  }
}
