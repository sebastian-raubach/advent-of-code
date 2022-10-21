<template>
  <Day :day="2" :year="2016" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <div class="grid-one">
        <div v-for="(cell, index) in heatOne" :key="`heat-${index}`" :style="{ backgroundColor: gradientOne[cell - 1] }" class="d-flex justify-content-center align-items-center">
          <span>{{ index + 1 }}</span>
        </div>
      </div>
    </template>
    <template v-slot:partTwo>
      <div class="grid-two">
        <!-- Row 1 -->
        <div />
        <div />
        <div :style="{ backgroundColor: gradientTwo[dir2[1].count - 1] }" class="d-flex justify-content-center align-items-center"><span>1</span></div>
        <div />
        <div />
        <!-- Row 2 -->
        <div />
        <div :style="{ backgroundColor: gradientTwo[dir2[2].count - 1] }" class="d-flex justify-content-center align-items-center"><span>2</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[3].count - 1] }" class="d-flex justify-content-center align-items-center"><span>3</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[4].count - 1] }" class="d-flex justify-content-center align-items-center"><span>4</span></div>
        <div />
        <!-- Row 3 -->
        <div :style="{ backgroundColor: gradientTwo[dir2[5].count - 1] }" class="d-flex justify-content-center align-items-center"><span>5</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[6].count - 1] }" class="d-flex justify-content-center align-items-center"><span>6</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[7].count - 1] }" class="d-flex justify-content-center align-items-center"><span>7</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[8].count - 1] }" class="d-flex justify-content-center align-items-center"><span>8</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2[9].count - 1] }" class="d-flex justify-content-center align-items-center"><span>9</span></div>
        <!-- Row 4 -->
        <div />
        <div :style="{ backgroundColor: gradientTwo[dir2.A.count - 1] }" class="d-flex justify-content-center align-items-center"><span>A</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2.B.count - 1] }" class="d-flex justify-content-center align-items-center"><span>B</span></div>
        <div :style="{ backgroundColor: gradientTwo[dir2.C.count - 1] }" class="d-flex justify-content-center align-items-center"><span>C</span></div>
        <div />
        <!-- Row 5 -->
        <div />
        <div />
        <div :style="{ backgroundColor: gradientTwo[dir2.D.count - 1] }" class="d-flex justify-content-center align-items-center"><span>D</span></div>
        <div />
        <div />
      </div>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'
import { createColorGradient } from '@/util/color'

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
      dir: {
        U: (curr) => curr > 3 ? curr - 3 : curr,
        L: (curr) => curr % 3 !== 1 ? curr - 1 : curr,
        R: (curr) => curr % 3 !== 0 ? curr + 1 : curr,
        D: (curr) => curr < 7 ? curr + 3 : curr
      },
      dir2: {
        1: { D: 3 },
        2: { D: 6, R: 3 },
        3: { D: 7, L: 2, U: 1, R: 4 },
        4: { D: 8, L: 3 },
        5: { R: 6 },
        6: { U: 2, R: 7, D: 'A', L: 5 },
        7: { U: 3, R: 8, D: 'B', L: 6 },
        8: { U: 4, R: 9, D: 'C', L: 7 },
        9: { L: 8 },
        A: { U: 6, R: 'B' },
        B: { U: 7, R: 'C', D: 'D', L: 'A' },
        C: { U: 8, L: 'B' },
        D: { U: 'B' }
      },
      heatOne: [],
      gradientOne: null,
      gradientTwo: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Keep track of the current key position and the resulting numbers for the keypad
      let currOne = 5
      let resultOne = ''
      let currTwo = 5
      let resultTwo = ''

      // Keep track of how often a key has been visited for visualization
      this.heatOne = Array(9).fill(0)
      this.heatOne[4] = 1

      input.forEach(r => {
        // Split each line into bits
        r.split('').forEach(d => {
          // Adjust the current positions for part one and two
          currOne = this.dir[d](currOne)
          currTwo = this.dir2[currTwo][d] || currTwo

          // Increment the counters for part one and two
          this.heatOne[currOne - 1]++
          this.dir2[currTwo].count = (this.dir2[currTwo].count + 1) || 1
        })

        // Add to the result
        resultOne += currOne
        resultTwo += currTwo
      })

      // Create the gradients for the visualizations
      this.gradientOne = createColorGradient('#FFC312', '#EA2027', Math.max(...this.heatOne))
      this.gradientTwo = createColorGradient('#FFC312', '#EA2027', Math.max(...Object.keys(this.dir2).map(k => this.dir2[k].count)))

      // Set the result
      this.solutions.partOne = resultOne
      this.solutions.partTwo = resultTwo
    }
  }
}
</script>

<style scoped>
.grid-one {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
  width: 300px;
  height: 300px;
  justify-content: center;
  align-content: center;
}
.grid-two {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . . ."
    ". . . . ."
    ". . . . ."
    ". . . . ."
    ". . . . .";
  width: 300px;
  height: 300px;
  justify-content: center;
  align-content: center;
}
</style>
