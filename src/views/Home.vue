<template>
  <div>
    <h1>Advent of Code 2020</h1>

    <b-row>
      <b-col cols=12 sm=6 md=4 lg=3 v-for="day in Array.from(Array(24).keys())" :key="`day-${day}`" class="aoc-task mb-3">
        <b-card no-body :class="`${day > 0 ? 'disabled' : ''}`">
          <div class="position-relative">
            <b-img fluid class="card-img" :src="require(`@/assets/card-background.jpg`)" />
            <h1 class="day">{{ day + 1 }}</h1>
          </div>
          <b-card-body>
            <b-card-text>
              Task page for day {{ day + 1 }}
            </b-card-text>
          </b-card-body>
          <b-button block :to="{ name: `day-${day + 1}` }" variant="primary">View</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'
}
</script>

<style scoped>
.aoc-task .disabled {
  pointer-events: none;
  opacity: 0.5;
}
.aoc-task .btn {
  border-radius: 0.1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.day {
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
