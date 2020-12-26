<template>
  <div>
    <h1>Advent of Code</h1>

    <b-row>
      <b-col cols=12 sm=6 md=6 v-for="year in years" :key="`year-${year}`" class="aoc-year mb-3 d-flex align-items-stretch">
        <b-card no-body bg-variant="dark">
          <div class="position-relative">
            <b-img fluid class="card-img" :src="require(`@/assets/card-background.jpg`)" />
            <h1 class="year">{{ year }}</h1>
          </div>
          <b-button block :to="{ name: `year-${year}` }" variant="primary">Year {{ year }}</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'currentDay'
    ]),
    years: function () {
      return Object.keys(this.currentDay).sort((a, b) => b - a)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas&display=swap');

.aoc-year .btn {
  border-radius: 0.1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.aoc-year .year {
  font-family: 'Mountains of Christmas', cursive, sans-serif;
  font-weight: bold;
  font-size: 4em;
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
