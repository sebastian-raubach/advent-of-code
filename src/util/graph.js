import { PriorityQueue } from '@datastructures-js/priority-queue'

const dijkstra = (nodes, start, end) => {
  const unvisited = new Set(Object.values(nodes).map(n => n.key))

  // Use a priority queue to keep track of the node with lowest cost
  const queue = new PriorityQueue({
    compare: (a, b) => a.cost - b.cost
  })

  // Add the start node
  queue.enqueue({ key: start, cost: 0 })

  let current

  while (queue.size() > 0) {
    // Get the one with the lowest costs
    current = queue.dequeue()
    unvisited.delete(current.key)

    if (current.key === end) {
      return current
    }

    const node = nodes[current.key]

    node.neighbors.forEach(n => {
      if (!unvisited.has(n.key)) {
        return
      }

      if (nodes[n.key].cost === undefined || nodes[n.key].cost === null) {
        nodes[n.key].cost = current.cost + n.cost
        queue.enqueue({ key: n.key, cost: nodes[n.key].cost })
      } else if (current.cost + n.cost < nodes[n.key].cost) {
        nodes[n.key].cost = current.cost + n.cost
      }
    })
  }

  return null
}

export {
  dijkstra
}
