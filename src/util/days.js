import { WARNING_LONG_RUNTIME } from '@/util/warning'

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
    { title: 'Reindeer Olympics', solutions: [true, true], isVisual: true },
    { title: 'Science for Hungry People', solutions: [false, false], isVisual: false },
    { title: 'Aunt Sue', solutions: [true, true], isVisual: false },
    { title: 'No Such Thing as Too Much', solutions: [false, false], isVisual: false },
    { title: 'Like a GIF For Your Yard', solutions: [true, true], isVisual: true }
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
  ],
  2022: [
    { title: 'Calorie Counting', solutions: [true, true], isVisual: true },
    { title: 'Rock Paper Scissors', solutions: [true, true], isVisual: false },
    { title: 'Rucksack Reorganization', solutions: [true, true], isVisual: false },
    { title: 'Camp Cleanup', solutions: [true, true], isVisual: true },
    { title: 'Supply Stacks', solutions: [true, true], isVisual: true },
    { title: 'Tuning Trouble', solutions: [true, true], isVisual: false },
    { title: 'No Space Left On Device', solutions: [true, true], isVisual: true },
    { title: 'Treetop Tree House', solutions: [true, true], isVisual: true },
    { title: 'Rope Bridge', solutions: [true, true], isVisual: true },
    { title: 'Cathode-Ray Tube', solutions: [true, true], isVisual: false },
    { title: 'Monkey in the Middle', solutions: [true, true], isVisual: false },
    { title: 'Hill Climbing Algorithm', solutions: [true, true], isVisual: true },
    { title: 'Distress Signal', solutions: [true, true], isVisual: false }
  ],
  2023: [
    { title: 'Trebuchet?!', solutions: [true, true], isVisual: false },
    { title: 'Cube Conundrum', solutions: [true, true], isVisual: false },
    { title: 'Gear Ratios', solutions: [true, true], isVisual: true },
    { title: 'Scratchcards ', solutions: [true, true], isVisual: false },
    { title: 'If You Give A Seed A Fertilizer', solutions: [true, true], isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'Wait For It', solutions: [true, true], isVisual: false },
    { title: 'Camel Cards', solutions: [true, true], isVisual: false },
    { title: 'Haunted Wasteland', solutions: [true, true], isVisual: false },
    { title: 'Mirage Maintenance', solutions: [true, true], isVisual: false },
    { title: 'Pipe Maze', solutions: [true, true], isVisual: true },
    { title: 'Cosmic Expansion', solutions: [true, true], isVisual: false },
    { title: 'Hot Springs', solutions: [true, true], isVisual: false },
    { title: 'Point of Incidence', solutions: [true, true], isVisual: false },
    { title: 'Parabolic Reflector Dish', solutions: [true, true], isVisual: false },
    { title: 'Lens Library', solutions: [true, true], isVisual: false },
    { title: 'The Floor Will Be Lava', solutions: [true, true], isVisual: true },
    { title: 'Clumsy Crucible', solutions: [true, true], isVisual: true },
    { title: 'Lavaduct Lagoon', solutions: [true, true], isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'Aplenty', solutions: [true, true], isVisual: false },
    { title: 'Pulse Propagation', solutions: [true, true], isVisual: false },
    { title: 'Step Counter', solutions: [true, false], isVisual: true },
    { title: 'Sand Slabs', solutions: [true, true], isVisual: true, warnings: [WARNING_LONG_RUNTIME] },
    { title: 'A Long Walk', solutions: [true, true], isVisual: true, warnings: [WARNING_LONG_RUNTIME] }
  ]
}

export {
  solvedDays
}
