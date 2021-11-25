export default class DuetProgram {
  constructor (id, inst) {
    this.$id = id
    this.$inst = inst

    this.init()
  }

  setLink (link) {
    this.$link = link
  }

  isStuck () {
    return this.$queue.length < 1 || this.$finished
  }

  isFinished () {
    return this.$finished
  }

  getSendCount () {
    return this.$sendCount
  }

  init () {
    // Keep track of the index
    this.$index = 0
    // Keep track of the registers
    this.$registers = {
      p: this.$id
    }
    // Keep track of the values that have been sent to us
    this.$queue = []
    // Mark if we're stuck
    this.$stuck = false
    // Mark if we're finished
    this.$finished = false
    // Count the number of times we sent a value
    this.$sendCount = 0

    this.$instructions = {
      snd: (registers, x, _) => {
        // Resolve the value to send
        const value = this.resolve(registers, x)

        // Increase the counter
        this.$sendCount++
        if (this.$link) {
          // If we've got a linked program, send the value
          this.$link.receive(value)
        } else {
          // Else, set our queue to JUST this value
          this.$queue = [value]
        }
      },
      set: (registers, x, y) => { registers[x] = this.resolve(registers, y) },
      add: (registers, x, y) => { registers[x] += this.resolve(registers, y) },
      mul: (registers, x, y) => { registers[x] *= this.resolve(registers, y) },
      mod: (registers, x, y) => { registers[x] %= this.resolve(registers, y) },
      rcv: (registers, x, _) => {
        if (this.$queue.length > 0) {
          // If there are values, get the oldest one
          registers[x] = this.$queue.shift()

          // We're no longer stuck
          this.$stuck = false
          // Return it
          return registers[x]
        } else {
          // We're stuck
          this.$stuck = true
          return null
        }
      },
      jgz: (registers, x, y) => this.resolve(registers, x) > 0 ? this.resolve(registers, y) : 0
    }
  }

  resolve (registers, a) {
    if (isNaN(a)) {
      if (a in registers) {
        return registers[a]
      } else {
        registers[a] = 0
        return 0
      }
    } else {
      return +a
    }
  }

  receive (value) {
    this.$queue.push(value)
  }

  run () {
    while (true) {
      const i = this.$inst[this.$index]
      // Ensure the register exists
      if (isNaN(i.reg) && !(i.reg in this.$registers)) {
        this.$registers[i.reg] = 0
      }

      // Follow the instruction
      const result = this.$instructions[i.inst](this.$registers, i.reg, i.value)

      if (this.$stuck) {
        return null
      }

      // If we received a value, set it as the result
      if (i.inst === 'rcv' && result !== null) {
        this.$index++
        return result
      }

      if (i.inst === 'jgz' && result !== 0) {
        // If we need to jump, do it
        this.$index += result
      } else {
        // Otherwise increment
        this.$index++

        if (this.$index >= this.$inst.length) {
          this.$finished = true
          return
        }
      }
    }
  }
}
