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

export {
  mod,
  transpose
}
