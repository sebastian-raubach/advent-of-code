<template>
  <div>
    <h1>Advent of Code</h1>

    <b-row>
      <b-col cols=12 sm=6 md=3 v-for="year in years" :key="`year-${year}`" class="aoc-year mb-3 d-flex align-items-stretch">
        <b-card no-body bg-variant="dark">
          <div class="position-relative">
            <b-img fluid class="card-img" :src="require(`@/assets/card-background-2.jpg`)" />
            <h1 class="year text-light pb-5">{{ year }}</h1>
          </div>
          <b-button block :to="{ name: 'year', params: { year: year } }" variant="primary" class="stretched-link">Year {{ year }}</b-button>
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
      'storeCurrentDay'
    ]),
    years: function () {
      return Object.keys(this.storeCurrentDay).sort((a, b) => b - a)
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
