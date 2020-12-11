<template>
  <div>
    <b-form @submit.prevent>
      <b-form-group label="JSON API input" label-for="json" description="The JSON API output of a leaderboard.">
        <b-form-textarea v-model="input" rows=5 id="json" />
      </b-form-group>
    </b-form>

    <b-table table-class="star-table mt-3" :items="json" :fields="fields" stacked="sm" sort-by="local_score" :sort-desc="true" v-if="json">
      <template #cell(days)="data">
        <template v-for="day in tasks" >
          <span :key="`${data.id}-${day}`" v-b-tooltip.body.html="getTooltip(day, data.item.completion_day_level[day])" class="star star-gold" v-if="data.item.completion_day_level[day] && data.item.completion_day_level[day][2]">★</span>
          <span :key="`${data.id}-${day}`" v-b-tooltip.body.html="getTooltip(day, data.item.completion_day_level[day])" class="star star-silver" v-else-if="data.item.completion_day_level[day] && data.item.completion_day_level[day][1]">★</span>
          <span :key="`${data.id}-${day}`" class="star star-none" v-else>☆</span>
        </template>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      input: null,
      tasks: Array.from(Array(25).keys()).map(i => i + 1),
      fields: [{
        key: 'name',
        label: 'Name',
        sortable: true
      }, {
        key: 'local_score',
        label: 'Score',
        sortable: true
      }, {
        key: 'stars',
        label: 'Stars',
        sortable: true
      }, {
        key: 'days',
        label: 'Days',
        class: 'stars'
      }]
    }
  },
  computed: {
    json: function () {
      if (this.input) {
        try {
          const parsed = JSON.parse(this.input)

          return Object.keys(parsed.members).map(m => parsed.members[m])
        } catch (err) {
          return null
        }
      } else {
        return null
      }
    }
  },
  methods: {
    getTooltip: function (day, data) {
      let result = `<p>Day ${day}</p>`
      if (data[1] && data[1].get_star_ts) {
        result += `<p>Part 1: ${new Date(+data[1].get_star_ts * 1000).toLocaleString()}</p>`
      }
      if (data[2] && data[2].get_star_ts) {
        result += `<p>Part 2: ${new Date(+data[2].get_star_ts * 1000).toLocaleString()}</p>`
      }
      return result
    }
  }
}
</script>

<style>
.star-table td.stars div {
  word-break: break-all;
  cursor: default;
}
.star {
  font-size: 1.3em;
}
.star-gold {
  color: #fbc531;
}
.star-silver {
  color: #7f8fa6;
}
.star-none {
  color: #dcdde1;
}
</style>
