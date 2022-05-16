const solvedDays = {
  2015: [
    { title: 'Not Quite Lisp', solutions: [true, true], isVisual: false },
    { title: 'I Was Told There Would Be No Math', solutions: [true, true], isVisual: false },
    { title: 'Perfectly Spherical Houses in a Vacuum', solutions: [true, true], isVisual: true },
    { title: 'The Ideal Stocking Stuffer', solutions: [true, true], isVisual: false },
    { title: 'Doesn\'t He Have Intern- Elves For This ?', solutions: [true, true], isVisual: false },
    { title: 'Probably a Fire Hazard', solutions: [true, true], isVisual: true },
    { title: 'Some Assembly Required', solutions: [true, true], isVisual: false },
    { title: 'Matchsticks', solutions: [true, true], isVisual: false },
    { title: 'All in a Single Night', solutions: [true, true], isVisual: false },
    { title: 'Elves Look, Elves Say', solutions: [true, true], isVisual: false },
    { title: 'Corporate Policy', solutions: [true, true], isVisual: false },
    { title: 'JSAbacusFramework.io', solutions: [true, true], isVisual: false },
    { title: 'Knights of the Dinner Table', solutions: [true, true], isVisual: false },
    { title: 'Reindeer Olympics', solutions: [true, true], isVisual: true }
  ],
  2016: [
    { title: 'No Time for a Taxicab', solutions: [true, true], isVisual: true },
    { title: 'Bathroom Security', solutions: [true, true], isVisual: true },
    { title: 'Squares With Three Sides', solutions: [true, true], isVisual: false },
    { title: 'Security Through Obscurity', solutions: [true, true], isVisual: false },
    { title: 'How About a Nice Game of Chess?', solutions: [true, true], isVisual: false }
  ],
  2017: [
    { title: 'Inverse Captcha', solutions: [true, true], isVisual: false },
    { title: 'Corruption Checksum', solutions: [true, true], isVisual: false },
    { title: 'Spiral Memory', solutions: [true, true], isVisual: false },
    { title: 'High-Entropy Passphrases', solutions: [true, true], isVisual: false },
    { title: 'A Maze of Twisty Trampolines, All Alike', solutions: [true, true], isVisual: false },
    { title: 'Memory Reallocation', solutions: [true, true], isVisual: false },
    { title: 'Recursive Circus', solutions: [true, true], isVisual: false },
    { title: 'I Heard You Like Registers', solutions: [true, true], isVisual: false },
    { title: 'Stream Processing', solutions: [true, true], isVisual: false },
    { title: 'Knot Hash', solutions: [true, true], isVisual: false },
    { title: 'Hex Ed', solutions: [true, true], isVisual: true },
    { title: 'Digital Plumber', solutions: [true, true], isVisual: false },
    { title: 'Packet Scanners', solutions: [true, true], isVisual: false },
    { title: 'Disk Defragmentation', solutions: [false, false], isVisual: false },
    { title: 'Dueling Generators', solutions: [true, true], isVisual: false },
    { title: 'Permutation Promenade', solutions: [true, true], isVisual: false },
    { title: 'Spinlock', solutions: [true, true], isVisual: false },
    { title: 'Duet', solutions: [true, true], isVisual: false },
    { title: 'A Series of Tubes', solutions: [true, true], isVisual: false },
    { title: 'Particle Swarm', solutions: [true, true], isVisual: false },
    { title: 'Fractal Art', solutions: [false, false], isVisual: false },
    { title: 'Sporifica Virus', solutions: [true, true], isVisual: true },
    { title: 'Coprocessor Conflagration', solutions: [true, false], isVisual: false },
    { title: 'Electromagnetic Moat', solutions: [true, true], isVisual: false },
    { title: 'The Halting Problem', solutions: [true, false], isVisual: false }
  ],
  2018: [
    { title: 'Chronal Calibration', solutions: [true, true], isVisual: false },
    { title: 'Inventory Management System', solutions: [true, true], isVisual: false },
    { title: 'No Matter How You Slice It', solutions: [true, true], isVisual: false },
    { title: 'Repose Record', solutions: [true, true], isVisual: false },
    { title: 'Alchemical Reduction', solutions: [true, true], isVisual: false },
    { title: 'Chronal Coordinates', solutions: [true, true], isVisual: false },
    { title: 'The Sum of Its Parts', solutions: [true, true], isVisual: false },
    { title: 'Memory Maneuver', solutions: [true, true], isVisual: false },
    { title: 'Marble Mania', solutions: [true, true], isVisual: false },
    { title: 'The Stars Align', solutions: [true, true], isVisual: true },
    { title: 'Chronal Charge', solutions: [true, true], isVisual: false },
    { title: 'Subterranean Sustainability', solutions: [true, true], isVisual: false },
    { title: 'Mine Cart Madness', solutions: [true, true], isVisual: false },
    { title: 'Chocolate Charts', solutions: [true, true], isVisual: false },
    { title: 'Beverage Bandits', solutions: [true, true], isVisual: false },
    { title: 'Chronal Classification', solutions: [true, true], isVisual: false },
    { title: 'Reservoir Research', solutions: [true, true], isVisual: true },
    { title: 'Settlers of The North Pole', solutions: [true, true], isVisual: true },
    { title: 'A Regular Map', solutions: [true, true], isVisual: false },
    { title: 'Mode Maze', solutions: [true, true], isVisual: false }
  ],
  2020: [
    { title: 'Report Repair', solutions: [true, true], isVisual: false },
    { title: 'Password Philosophy', solutions: [true, true], isVisual: false },
    { title: 'Toboggan Trajectory', solutions: [true, true], isVisual: true },
    { title: 'Passport Processing', solutions: [true, true], isVisual: false },
    { title: 'Binary Boarding', solutions: [true, true], isVisual: false },
    { title: 'Custom Customs', solutions: [true, true], isVisual: false },
    { title: 'Handy Haversacks', solutions: [true, true], isVisual: false },
    { title: 'Handheld Halting', solutions: [true, true], isVisual: false },
    { title: 'Encoding Error', solutions: [true, true], isVisual: false },
    { title: 'Adapter Array', solutions: [true, true], isVisual: false },
    { title: 'Seating System', solutions: [true, true], isVisual: true },
    { title: 'Rain Risk', solutions: [true, true], isVisual: true },
    { title: 'Shuttle Search', solutions: [true, true], isVisual: false },
    { title: 'Docking Data', solutions: [true, true], isVisual: false },
    { title: 'Rambunctious Recitation', solutions: [true, true], isVisual: false },
    { title: 'Ticket Translation', solutions: [true, true], isVisual: false },
    { title: 'Conway Cubes', solutions: [true, true], isVisual: false },
    { title: 'Operation Order', solutions: [true, true], isVisual: false },
    { title: 'Monster Messages', solutions: [true, true], isVisual: false },
    { title: 'Jurassic Jigsaw', solutions: [true, true], isVisual: true },
    { title: 'Allergen Assessment', solutions: [true, true], isVisual: false },
    { title: 'Crab Combat', solutions: [true, true], isVisual: false },
    { title: 'Crab Cups', solutions: [true, true], isVisual: false },
    { title: 'Lobby Layout', solutions: [true, true], isVisual: false },
    { title: 'Combo Breaker', solutions: [true, true], isVisual: false }
  ],
  2021: [
    { title: 'Sonar Sweep', solutions: [true, true], isVisual: false },
    { title: 'Dive!', solutions: [true, true], isVisual: true },
    { title: 'Binary Diagnostic', solutions: [true, true], isVisual: false },
    { title: 'Giant Squid', solutions: [true, true], isVisual: false },
    { title: 'Hydrothermal Venture', solutions: [true, true], isVisual: true },
    { title: 'Lanternfish', solutions: [true, true], isVisual: false },
    { title: 'The Treachery of Whales', solutions: [true, true], isVisual: false },
    { title: 'Seven Segment Search', solutions: [true, true], isVisual: false, tags: ['substitution', 'deduction'] },
    { title: 'Smoke Basin', solutions: [true, true], isVisual: true, tags: ['2d', 'segmentation'] },
    { title: 'Syntax Scoring', solutions: [true, true], isVisual: false, tags: ['parsing'] },
    { title: 'Dumbo Octopus', solutions: [true, true], isVisual: true, tags: ['2d', 'array-manipulation'] },
    { title: 'Passage Pathing', solutions: [true, true], isVisual: true, tags: ['graph', 'path-finding'] },
    { title: 'Transparent Origami', solutions: [true, true], isVisual: true, tags: ['2d', 'array-manipulation'] },
    { title: 'Extended Polymerization', solutions: [true, true], isVisual: false, tags: ['substitution'] },
    { title: 'Chiton', solutions: [true, true], isVisual: true, tags: ['2d', 'path-finding'] },
    { title: 'Packet Decoder', solutions: [true, true], isVisual: false, tags: ['tree', 'parsing'] },
    { title: 'Trick Shot', solutions: [true, true], isVisual: true, tags: ['2d'] },
    { title: 'Snailfish', solutions: [true, true], isVisual: false, tags: ['string-manipulation', 'parsing'] },
    { title: 'Beacon Scanner', solutions: [true, true], isVisual: false, tags: ['3d'] },
    { title: 'Trench Map', solutions: [true, true], isVisual: true, tags: ['2d'] },
    { title: 'Dirac Dice', solutions: [true, true], isVisual: false, tags: ['caching', 'optimization'] },
    { title: 'Reactor Reboot', solutions: [true, true], isVisual: false, tags: ['3d', 'intersection'] },
    { title: 'Amphipod', solutions: [true, true], isVisual: false, tags: ['path-finding'] },
    { title: 'Arithmetic Logic Unit', solutions: [true, true], isVisual: false, tags: [] },
    { title: 'Sea Cucumber', solutions: [true, true], isVisual: false, tags: ['2d'] }
  ]
}

Object.freeze(solvedDays)

export default {
  data: function () {
    return {
      solvedDays: solvedDays
    }
  },
  methods: {
    mod: function (a, b) {
      return ((a % b) + b) % b
    },
    createMultiColorGradient: function (colors, steps) {
      const sections = colors.length - 1

      let result = []

      for (let i = 0; i < steps - 1; i++) {
        result = result.concat(this.createColorGradient(colors[i], colors[i + 1], Math.floor(steps / sections)))
      }

      while (result.length < steps) {
        result.push(colors[colors.length - 1])
      }

      return result
    },
    /**
     * Creates a linear gradient between the two given colors with the given number of steps
     * @param {String} one The first color in HEX
     * @param {String} two The second color in HEX
     * @param {Number} steps The number of steps between the two colors
     */
    createColorGradient: function (one, two, steps) {
      const oneRgb = this.hexToRgb(one)
      const twoRgb = this.hexToRgb(two)

      const result = []
      for (let i = 0; i < steps; i++) {
        const iNorm = (i / (steps - 1)) || 1
        result.push(this.rgbToHex(
          Math.floor(oneRgb.r + iNorm * (twoRgb.r - oneRgb.r)),
          Math.floor(oneRgb.g + iNorm * (twoRgb.g - oneRgb.g)),
          Math.floor(oneRgb.b + iNorm * (twoRgb.b - oneRgb.b))
        ))
      }
      return result
    },
    /**
     * Converts a HEX value into an RGB object
     * @param {String} hex The hex color
     */
    hexToRgb: function (hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
        : null
    },
    /**
     * Converts the given R, G, B values into a HEX color
     * @param {Number} r The red color component
     * @param {Number} g The green color component
     * @param {Number} b The blue color component
     */
    rgbToHex: function (r, g, b) {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
  }
}
