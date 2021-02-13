export default {
  addr: (a, b, c, reg) => { reg[c] = reg[a] + reg[b] },
  addi: (a, b, c, reg) => { reg[c] = reg[a] + b },
  mulr: (a, b, c, reg) => { reg[c] = reg[a] * reg[b] },
  muli: (a, b, c, reg) => { reg[c] = reg[a] * b },
  banr: (a, b, c, reg) => { reg[c] = reg[a] & reg[b] },
  bani: (a, b, c, reg) => { reg[c] = reg[a] & b },
  borr: (a, b, c, reg) => { reg[c] = reg[a] | reg[b] },
  bori: (a, b, c, reg) => { reg[c] = reg[a] | b },
  setr: (a, _, c, reg) => { reg[c] = reg[a] },
  seti: (a, _, c, reg) => { reg[c] = a },
  gtir: (a, b, c, reg) => { reg[c] = a > reg[b] ? 1 : 0 },
  gtri: (a, b, c, reg) => { reg[c] = reg[a] > b ? 1 : 0 },
  gtrr: (a, b, c, reg) => { reg[c] = reg[a] > reg[b] ? 1 : 0 },
  eqir: (a, b, c, reg) => { reg[c] = a === reg[b] ? 1 : 0 },
  eqri: (a, b, c, reg) => { reg[c] = reg[a] === b ? 1 : 0 },
  eqrr: (a, b, c, reg) => { reg[c] = reg[a] === reg[b] ? 1 : 0 }
}
