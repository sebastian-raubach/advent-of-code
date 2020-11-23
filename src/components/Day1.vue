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
      console.log(input)
    }
  }
}
</script>

<style>

</style>
