<template>
  <Day :day="16" :year="2015" :solutions="solutions" @input-changed="onInputChanged">
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
      // Define the desired outcome for part one and two
      const desired = {
        children: { value: 3, comp: '=' },
        cats: { value: 7, comp: '>' },
        samoyeds: { value: 2, comp: '=' },
        pomeranians: { value: 3, comp: '<' },
        akitas: { value: 0, comp: '=' },
        vizslas: { value: 0, comp: '=' },
        goldfish: { value: 5, comp: '<' },
        trees: { value: 3, comp: '>' },
        cars: { value: 2, comp: '=' },
        perfumes: { value: 1, comp: '=' }
      }

      // Define some helper functions that check whether the current Sue matches
      const comp = {
        '=': (prop, sue) => sue[prop] === undefined || sue[prop] === desired[prop].value,
        '>': (prop, sue) => sue[prop] === undefined || sue[prop] > desired[prop].value,
        '<': (prop, sue) => sue[prop] === undefined || sue[prop] < desired[prop].value
      }

      const sues = input.map(i => {
        // Split into sue info and properties
        const [sue, ...props] = i.split(': ')
        // Get the id
        const id = +sue.split(' ')[1]
        // Split into property parts
        const parts = props.join(': ').split(', ')

        // Create a new Sue
        const temp = {}
        parts.forEach(p => {
          // Add each property
          const [title, quantity] = p.split(': ')
          temp[title] = +quantity
        })

        return {
          id: id,
          ...temp
        }
      })

      // Keep the Sues where each desired property is either undefined or is equal to the desired value
      this.solutions.partOne = sues.find(s => Object.keys(desired).filter(k => !comp['='](k, s)).length === 0).id

      // Keep the Sues where each desired property is either undefined or fulfils the comparison to the desired value
      this.solutions.partTwo = sues.find(s => Object.keys(desired).filter(k => !comp[desired[k].comp](k, s)).length === 0).id
    }
  }
}
</script>

<style>

</style>
