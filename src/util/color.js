const VIRIDIS = ['#440154', '#48186a', '#472d7b', '#424086', '#3b528b', '#33638d', '#2c728e', '#26828e', '#21918c', '#1fa088', '#28ae80', '#3fbc73', '#5ec962', '#84d44b', '#addc30', '#d8e219', '#fde725']

/**
 * Converts a HEX value into an RGB object
 * @param {String} hex The hex color
 */
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : null
}

/**
 * Converts the given R, G, B values into a HEX color
 * @param {Number} r The red color component
 * @param {Number} g The green color component
 * @param {Number} b The blue color component
 */
const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * Creates a linear gradient between the two given colors with the given number of steps
 * @param {String} one The first color in HEX
 * @param {String} two The second color in HEX
 * @param {Number} steps The number of steps between the two colors
 */
const createColorGradient = (one, two, steps) => {
  const oneRgb = hexToRgb(one)
  const twoRgb = hexToRgb(two)

  if (steps < 2) {
    return [one]
  }

  const result = []
  for (let i = 0; i < steps; i++) {
    const iNorm = (i / (steps - 1))
    result.push(rgbToHex(
      Math.floor(oneRgb.r + iNorm * (twoRgb.r - oneRgb.r)),
      Math.floor(oneRgb.g + iNorm * (twoRgb.g - oneRgb.g)),
      Math.floor(oneRgb.b + iNorm * (twoRgb.b - oneRgb.b))
    ))
  }
  return result
}

const createMultiColorGradient = (colors, steps) => {
  if (colors.length > steps) {
    return colors.slice(0, steps)
  }

  const sections = colors.length - 1

  let result = []

  for (let i = 0; i < sections - 1; i++) {
    result = result.concat(createColorGradient(colors[i], colors[i + 1], Math.max(1, Math.floor(steps / sections))))
  }

  while (result.length < steps) {
    result.push(colors[colors.length - 1])
  }

  return result
}

export {
  hexToRgb,
  rgbToHex,
  createColorGradient,
  createMultiColorGradient,
  VIRIDIS
}
