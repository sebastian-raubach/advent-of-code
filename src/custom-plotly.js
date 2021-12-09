const Plotly = require('plotly.js/lib/core')

// Only register the chart types we're actually using to reduce the final bundle size
Plotly.register([
  require('plotly.js/lib/bar'),
  require('plotly.js/lib/heatmap'),
  require('plotly.js/lib/scatter')
])

module.exports = Plotly
