<template>
  <div>
    <h1>Advent of Code 2018</h1>

    <b-row cols-lg=5>
      <b-col cols=12 sm=6 md=4 v-for="day in days" :key="`day-${day}`" class="aoc-task mb-3 d-flex align-items-stretch">
        <b-card no-body :class="`${day > currentDay[2018] ? 'disabled' : ''}`" bg-variant="dark">
          <div class="position-relative">
            <b-img fluid class="card-img" :src="require(`@/assets/card-background.jpg`)" />
            <h1 class="day">{{ day }}</h1>
          </div>
          <b-card-body>
            <b-card-text class="text-center">
              <BIconStarFill class="mx-1 badge-gold" v-if="solutions[day] && solutions[day].partOne === true" />
              <BIconStar class="mx-1 badge-default" v-else />
              <BIconStarFill class="mx-1 badge-gold" v-if="solutions[day] && solutions[day].partTwo === true" />
              <BIconStar class="mx-1 badge-default" v-else />
            </b-card-text>
            <b-card-text class="text-center text-white" v-if="titles[day]">{{ titles[day] }}</b-card-text>
          </b-card-body>
          <b-button block :to="{ name: `year-2018-day-${day}` }" variant="primary">Day {{ day }}</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BIconStarFill, BIconStar } from 'bootstrap-vue'

export default {
  name: 'Home',
  components: {
    BIconStarFill,
    BIconStar
  },
  data: function () {
    return {
      days: Array.from(Array(25).keys()).map(i => i + 1),
      titles: {
        1: 'Chronal Calibration',
        2: 'Inventory Management System',
        3: 'No Matter How You Slice It',
        4: 'Repose Record',
        5: 'Alchemical Reduction',
        6: 'Chronal Coordinates',
        7: 'The Sum of Its Parts',
        8: 'Memory Maneuver',
        9: 'Marble Mania',
        10: 'The Stars Align',
        11: 'Chronal Charge',
        12: 'Subterranean Sustainability'
      },
      solutions: {
        1: { partOne: true, partTwo: true },
        2: { partOne: true, partTwo: true },
        3: { partOne: true, partTwo: true },
        4: { partOne: true, partTwo: true },
        5: { partOne: true, partTwo: true },
        6: { partOne: true, partTwo: true },
        7: { partOne: true, partTwo: true },
        8: { partOne: true, partTwo: true },
        9: { partOne: true, partTwo: true },
        10: { partOne: true, partTwo: true },
        11: { partOne: true, partTwo: true },
        12: { partOne: true, partTwo: true }
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentDay'
    ])
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas&display=swap');

.aoc-task .badge-gold {
  color: #fbc531;
}
.aoc-task .badge-default {
  color: #7f8fa6;
}
.aoc-task .disabled {
  pointer-events: none;
  opacity: 0.5;
}
.aoc-task .btn {
  border-radius: 0.1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.aoc-task .day {
  font-family: 'Mountains of Christmas', cursive, sans-serif;
  font-weight: bold;
  font-size: 3em;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  top: 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
}
</style>
