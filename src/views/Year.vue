<template>
  <div>
    <h1>Advent of Code {{ year }}</h1>

    <b-row cols-lg=5>
      <template v-for="day in allDays">
        <b-col cols=12 sm=6 md=4  :key="`day-${day}`" class="aoc-task mb-3 d-flex align-items-stretch">
          <b-card no-body :class="`${day > currentDay[year] ? 'disabled' : ''}`" bg-variant="dark">
            <div class="position-relative">
              <b-img fluid class="card-img" :src="require(`@/assets/card-background.jpg`)" />
              <h1 class="day">{{ day }}</h1>
            </div>
            <b-card-body>
              <b-card-text class="text-center">
                <BIconStarFill class="mx-1 badge-gold" v-if="days[day - 1] && days[day - 1].solutions[0]" />
                <BIconStar class="mx-1 badge-default" v-else />
                <BIconStarFill class="mx-1 badge-gold" v-if="days[day - 1] && days[day - 1].solutions[1]" />
                <BIconStar class="mx-1 badge-default" v-else />
              </b-card-text>
              <b-card-text class="text-center text-white" v-if="days[day - 1]">{{ days[day - 1].title }}</b-card-text>
              <b-card-text class="text-center text-white" v-if="days[day - 1] && days[day - 1].isVisual"><BIconEaselFill /></b-card-text>
            </b-card-body>
            <b-button block :to="{ name: `year-${year}-day-${day}` }" variant="primary" class="stretched-link">Day {{ day }}</b-button>
          </b-card>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BIconStarFill, BIconStar, BIconEaselFill } from 'bootstrap-vue'

export default {
  components: {
    BIconStarFill,
    BIconStar,
    BIconEaselFill
  },
  data: function () {
    return {
      allDays: Array.from(Array(25).keys()).map(i => i + 1),
      year: null
    }
  },
  computed: {
    ...mapGetters([
      'currentDay'
    ]),
    days: function () {
      return this.solvedDays[this.year]
    }
  },
  created: function () {
    this.year = this.$route.params.year
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
