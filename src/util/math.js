const mod = (a, b) => {
  return ((a % b) + b) % b
}

const transpose = (matrix) => {
  const rows = matrix.length
  const cols = matrix[0].length
  const grid = []
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows)
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j]
    }
  }
  return grid
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcmInternal = (a, b) => a / gcd(a, b) * b
const lcmAll = (ns) => ns.reduce(lcmInternal, 1)

const lcm = (values) => lcmAll(values)

export {
  mod,
  transpose,
  lcm
}
