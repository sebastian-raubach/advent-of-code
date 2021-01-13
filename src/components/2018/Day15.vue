<template>
  <Day :day="15" :year="2018" :solutions="solutions" @input-changed="onInputChanged">
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
      directions: [[0, -1], [-1, 0], [1, 0], [0, 1]]
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.grid = input.map(i => i.split(''))
      this.players = []

      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          if (this.grid[y][x] === 'G' || this.grid[y][x] === 'E') {
            this.players.push({
              attack: 3,
              health: 200,
              type: this.grid[y][x],
              x: x,
              y: y
            })
          }
        }
      }

      this.solvePartOne()
      this.solvePartTwo()
    },
    findEnemy: function (player, players, grid) {
      return players.filter(p => p.type !== player.type && p.health > 0)
        .filter(p => (Math.abs(player.x - p.x) + Math.abs(player.y - p.y)) === 1)
        .reduce((weakest, curr) => weakest === null || weakest.health > curr.health ? curr : weakest, null)
    },
    findNextMovement: function (player, players, grid) {
      // Map all target position (adjacent cells) of all alive enemies
      const targetKeys = {}
      players.filter(p => p.type !== player.type && p.health > 0)
        .map(p => this.getAdjacents({ x: p.x, y: p.y }).filter(a => grid[a.y][a.x] === '.'))
        .reduce((acc, list) => acc.concat(...list), [])
        .forEach(a => {
          targetKeys[`${a.x},${a.y}`] = a
        })

      const visited = new Set()
      visited.add(`${player.x},${player.y}`)

      let paths = [[{ x: player.x, y: player.y }]]

      while (true) {
        const newPaths = []
        let targetPaths = []

        paths.forEach(p => {
          this.getAdjacents(p[p.length - 1]).forEach(a => {
            const xy = `${a.x},${a.y}`
            if (targetKeys[xy]) {
              // We found a path to a target
              targetPaths.push([...p, a, targetKeys[xy]])
            } else if (!visited.has(xy) && grid[a.y][a.x] === '.') {
              // Extend the path
              newPaths.push([...p, a])
            }
            visited.add(xy)
          })
        })

        if (targetPaths.length > 0) {
          // We found at least one path
          // Sort them based on reading order of last step
          targetPaths = targetPaths.sort((a, b) => {
            const al = a[a.length - 1]
            const bl = b[b.length - 1]
            return al.y === bl.y ? al.x - bl.x : al.y - bl.y
          })

          // Return the first step on the shortest path
          return targetPaths[0][1]
        }

        // Keep going, no path found yet
        paths = newPaths
        if (paths.length < 1) {
          // There are no reachable targets
          return null
        }
      }
    },
    getAdjacents: function (position) {
      return this.directions.map(d => {
        return {
          x: position.x + d[0],
          y: position.y + d[1]
        }
      })
    },
    solve: function (grid, players, elfAttackPower) {
      // Adjust the attack power of all elves
      players.filter(p => p.type === 'E').forEach(p => { p.attack = elfAttackPower })
      let round = 0
      while (true) {
        players = players.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y)

        for (let i = 0; i < players.length; i++) {
          const player = players[i]

          if (player.health > 0) {
            if (players.filter(p => p.health > 0 && p.type !== player.type).length < 1) {
              return round * players.filter(p => p.health > 0).map(p => p.health).reduce((a, b) => a + b)
            }

            let enemy = this.findEnemy(player, players, grid)
            const next = enemy ? null : this.findNextMovement(player, players, grid)
            if (!enemy && next) {
              grid[player.y][player.x] = '.'
              player.x = next.x
              player.y = next.y
              grid[player.y][player.x] = player.type

              enemy = this.findEnemy(player, players, grid)
            }

            if (enemy) {
              enemy.health -= player.attack
              if (enemy.health < 1) {
                grid[enemy.y][enemy.x] = '.'

                // If an elf died and this isn't part 1, return
                if (enemy.type === 'E' && elfAttackPower !== 3) {
                  return null
                }
              }
            }
          }
        }

        round++
      }
    },
    solvePartOne: function () {
      this.solutions.partOne = this.solve(JSON.parse(JSON.stringify(this.grid)), JSON.parse(JSON.stringify(this.players)), 3)
    },
    solvePartTwo: function () {
      // Start with an attack power of 4
      let attackPower = 4
      while (true) {
        // Get the result
        const result = this.solve(JSON.parse(JSON.stringify(this.grid)), JSON.parse(JSON.stringify(this.players)), attackPower)

        // If it succeeded, not elf died, so accept the result
        if (result !== null) {
          this.solutions.partTwo = result
          return
        }

        // Increase the elf attack power
        attackPower++
      }
    }
  }
}
</script>

<style>

</style>
