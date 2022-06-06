<template>
  <Day :day="15" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
  </Day>
</template>

<script>
import Day from '@/components/Day'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const pattern = /(?<name>.+): capacity (?<capacity>-?\d+), durability (?<durability>-?\d+), flavor (?<flavor>-?\d+), texture (?<texture>-?\d+), calories (?<calories>-?\d+)/
      const parsed = input.map(i => {
        const res = i.match(pattern).groups

        return {
          name: res.name,
          capacity: +res.capacity,
          durability: +res.durability,
          flavor: +res.flavor,
          texture: +res.texture,
          calories: +res.calories
        }
      })

      console.log(parsed)
    }
  }
}
</script>

<style>

</style>
