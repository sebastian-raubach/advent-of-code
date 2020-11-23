<template>
  <Day :day="1" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'

export default {
  components: {
    Day
  },
  methods: {
    onInputChanged: function (input) {
      // TODO: Implement on day 1
    }
  }
}
</script>

<style>

</style>
