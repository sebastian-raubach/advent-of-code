<template>
  <Day :day="23" :year="2021" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'

const { PriorityQueue } = require('@datastructures-js/priority-queue')

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
      moveCosts: {
        A: 1,
        B: 10,
        C: 100,
        D: 1000
      },
      rooms: {
        1: [[3, 2], [3, 3]],
        10: [[5, 2], [5, 3]],
        100: [[7, 2], [7, 3]],
        1000: [[9, 2], [9, 3]]
      },
      roomsTwo: {
        1: [[3, 2], [3, 3], [3, 4], [3, 5]],
        10: [[5, 2], [5, 3], [5, 4], [5, 5]],
        100: [[7, 2], [7, 3], [7, 4], [7, 5]],
        1000: [[9, 2], [9, 3], [9, 4], [9, 5]]
      },
      hall: [1, 2, 4, 6, 8, 10, 11]
    }
  },
  methods: {
    onInputChanged: function (input) {
      const copy = input.concat()
      const amphipods = new Map()
      for (let y = 0; y < copy.length; y++) {
        for (let x = 0; x < copy[y].length; x++) {
          if (![' ', '#', '.'].includes(copy[y][x])) {
            const coords = `${x},${y}`
            amphipods.set(coords, {
              isDone: false,
              type: this.moveCosts[copy[y][x]]
            })
          }
        }
      }

      this.solutions.partOne = this.solve(amphipods, this.rooms)

      // copy.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#')

      // amphipods = new Map()
      // for (let y = 0; y < copy.length; y++) {
      //   for (let x = 0; x < copy[y].length; x++) {
      //     if (![' ', '#', '.'].includes(copy[y][x])) {
      //       const coords = `${x},${y}`
      //       amphipods.set(coords, {
      //         isDone: false,
      //         type: this.moveCosts[copy[y][x]]
      //       })
      //     }
      //   }
      // }

      // this.solutions.partTwo = this.solve(amphipods, this.roomsTwo)
    },
    solve: function (amphipods, rooms) {
      Object.keys(rooms).forEach(type => {
        const r = rooms[type]
        for (let i = r.length - 1; i >= 0; i--) {
          const a = amphipods.get(`${r[i][0]},${r[i][1]}`)

          if (a === undefined || a.type !== (+type)) {
            return
          } else {
            a.isDone = true
          }
        }
      })

      console.log(amphipods)

      // Use a priority queue to keep track of the configurations with lowest cost
      const queue = new PriorityQueue({
        compare: (a, b) => a.costTotal - b.costTotal
      })

      queue.enqueue({
        amphipods: amphipods,
        costTotal: 0,
        costApprox: this.getApproxCost(amphipods, rooms)
      })

      const seenCosts = new Map()

      let min = Number.POSITIVE_INFINITY
      let max = 0
      while (queue.size() > 0) {
        const current = queue.dequeue()

        const curMax = Array.from(current.amphipods.values()).filter(a => a.isDone).length

        if (curMax > max) {
          console.log(queue.size(), seenCosts.size, curMax)
          max = curMax
        }

        if (current.costTotal > min) {
          break
        }

        max = Math.max(max, Array.from(current.amphipods.values()).filter(a => a.isDone).length)

        if (Array.from(current.amphipods.values()).every(a => a.isDone)) {
          min = Math.min(min, current.costTotal)
        } else {
          current.amphipods.forEach((amphipod, key) => {
            if (!amphipod.isDone) {
              const coords = key.split(',').map(c => +c)

              if (coords[1] === 1) {
                // We're in the hall
                const roomPositionY = this.getFreeRoomPosition(coords, amphipod.type, current.amphipods, rooms)

                if (roomPositionY !== null) {
                  const newAmphipods = new Map()
                  current.amphipods.forEach((v, k) => {
                    if (k === key) {
                      // This is our current one
                      newAmphipods.set(`${rooms[amphipod.type][0][0]},${roomPositionY}`, {
                        isDone: true,
                        type: v.type
                      })
                    } else {
                      newAmphipods.set(k, {
                        isDone: v.isDone,
                        type: v.type
                      })
                    }
                  })

                  const stringified = this.toString(newAmphipods)
                  const prevCost = seenCosts.get(stringified)
                  const costTotal = current.costTotal + this.manhattan(coords, [rooms[amphipod.type][0][0], roomPositionY]) * amphipod.type

                  if (prevCost === undefined || prevCost > costTotal) {
                    seenCosts.set(stringified, current.costTotal)

                    queue.enqueue({
                      amphipods: newAmphipods,
                      costTotal: costTotal,
                      costApprox: this.getApproxCost(newAmphipods, rooms)
                    })
                  }
                }
              } else {
                // We're in a room and we're not done
                const possibleHallPositions = this.getHallPositions(coords, current.amphipods)

                possibleHallPositions.forEach(hx => {
                  const newAmphipods = new Map()
                  current.amphipods.forEach((v, k) => {
                    if (k === key) {
                      // This is our current one
                      newAmphipods.set(`${hx},1`, {
                        isDone: false,
                        type: v.type
                      })
                    } else {
                      newAmphipods.set(k, {
                        isDone: v.isDone,
                        type: v.type
                      })
                    }
                  })

                  const stringified = this.toString(newAmphipods)
                  const prevCost = seenCosts.get(stringified)
                  const costTotal = current.costTotal + this.manhattan(coords, [hx, 1]) * amphipod.type

                  if (prevCost === undefined || prevCost > costTotal) {
                    seenCosts.set(stringified, current.costTotal)

                    queue.enqueue({
                      amphipods: newAmphipods,
                      costTotal: costTotal,
                      costApprox: this.getApproxCost(newAmphipods, rooms)
                    })
                  }
                })
              }
            }
          })
        }
      }

      return min
    },
    getFreeRoomPosition: function (current, type, amphipods, rooms) {
      const room = rooms[type]

      // Check the hall leading to the room
      for (let x = Math.min(room[0][0], current[0]) + 1; x < Math.max(room[0][0], current[0]); x++) {
        if (amphipods.has(`${x},${1}`)) {
          return null
        }
      }

      // const roomAmph = []

      // for (let y = 2; y < room.length + 2; y++) {
      //   const amph = amphipods.get(`${room[0][0]},${y}`)

      //   roomAmph.push(amph ? amph.type : null)
      // }

      // // Room completely empty, move to bottom
      // if (roomAmph.every(r => r === null)) {
      //   return 1 + room.length
      // }

      // // Amphipod of wrong type in the room
      // if (roomAmph.some(r => r !== null && r !== type)) {
      //   return null
      // }

      // let result = null
      // for (let y = room.length + 1; y >= 2; y--) {
      //   const amph = amphipods.get(`${room[0][0]},${y}`)

      //   if (amph === undefined) {
      //     if (result === null) {
      //       // Found a free spot
      //       result = y
      //     }
      //   } else {
      //     // If we found an empty one and then there's one that isn't empty, then don't move into the room, cause it's not properly filled from the bottom
      //     if (result !== null) {
      //       return null
      //     }
      //   }
      // }

      // return result

      let result = null
      for (let y = 2; y < room.length + 2; y++) {
        const amph = amphipods.get(`${room[0][0]},${y}`)

        if (amph === undefined) {
          // Found a free spot
          result = y
        } else {
          if (amph.type !== type) {
            // There's an amphipod of the wrong type => we cannot go in
            return null
          } else {
            // We found another amphipod of the right type => stop looking further down
            break
          }
        }
      }

      return result
    },
    getHallPositions: function (current, amphipods) {
      // Check the way out of the room
      for (let y = current[1] - 1; y > 1; y--) {
        if (amphipods.has(`${current[0]},${y}`)) {
          // Someone is in the way, we can't reach the hall
          return []
        }
      }

      const possibleHallPositions = []
      for (let x = current[0] - 1; x >= this.hall[0]; x--) {
        if (this.hall.includes(x) && !amphipods.has(`${x},1`)) {
          possibleHallPositions.push(x)
        }
      }
      for (let x = current[0] + 1; x <= this.hall[this.hall.length - 1]; x++) {
        if (this.hall.includes(x) && !amphipods.has(`${x},1`)) {
          possibleHallPositions.push(x)
        }
      }

      return possibleHallPositions
    },
    getApproxCost: function (amphipods, rooms) {
      let cost = 0
      amphipods.forEach((value, key) => {
        const coords = key.split(',').map(c => +c)
        const target = rooms[value.type][rooms[value.type].length - 1]
        if (coords[1] === 1) {
          cost += this.manhattan(coords, target) * value.type
        } else {
          cost += (rooms[value.type].length + Math.abs(coords[1] - 1) + Math.abs(coords[0] - target[0])) * value.type
        }
      })
      return cost
    },
    manhattan: function (a, b) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
    },
    toString: function (amphipods) {
      return Array.from(amphipods.keys()).sort().map(k => `${k},${amphipods.get(k).type}`).join('|')
    }
  }
}
</script>

<style scoped>
</style>
