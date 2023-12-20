<template>
  <Day :day="19" :year="2023" :solutions="solutions" @input-changed="onInputChanged">
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
      },
      checks: {
        '<': (rule, rating) => rating[rule.variable] < rule.value,
        '>': (rule, rating) => rating[rule.variable] > rule.value
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      const workflows = {}
      const ratings = []

      let isRating = false

      const workflowPattern = /(?<name>.+)\{(?<rules>.+)\}/
      const rulePattern = /(?<variable>.{1})(?<check>.{1})(?<value>\d+):(?<target>.+)/

      input.forEach(i => {
        if (i === '') {
          isRating = true
          return
        }

        if (isRating) {
          ratings.push(JSON.parse(i.replace('{', '{"').replaceAll(',', ',"').replaceAll('=', '":').replace('}', '}')))
        } else {
          const res = i.match(workflowPattern).groups
          const parts = res.rules.split(',')

          const workflow = {
            name: res.name,
            rules: [],
            target: null
          }

          parts.forEach(p => {
            if (p.includes(':')) {
              const rule = p.match(rulePattern).groups

              workflow.rules.push({
                variable: rule.variable,
                check: rule.check,
                value: +rule.value,
                target: rule.target
              })
            } else {
              workflow.target = p
            }
          })

          workflows[workflow.name] = workflow
        }
      })

      this.solutions.partOne = ratings.map(r => {
        let current = 'in'

        while (current !== 'A' && current !== 'R') {
          const workflow = workflows[current]
          let found = false

          for (let j = 0; j < workflow.rules.length; j++) {
            if (this.checks[workflow.rules[j].check](workflow.rules[j], r)) {
              current = workflow.rules[j].target
              found = true
              break
            }
          }

          if (!found) {
            current = workflow.target
          }
        }

        return current === 'A' ? Object.values(r).reduce((a, b) => a + b) : 0
      }).reduce((a, b) => a + b)

      const range = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }
      this.solutions.partTwo = this.getRanges(workflows, 'in', range).map(range => {
        return Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1)
      }).reduce((a, b) => a + b)
    },
    getRanges: function (workflows, workflowName, range) {
      if (workflowName === 'R') {
        return []
      } if (workflowName === 'A') {
        return [JSON.parse(JSON.stringify(range))]
      } else {
        const workflow = workflows[workflowName]

        const ranges = []

        for (let j = 0; j < workflow.rules.length; j++) {
          const r = workflow.rules[j]

          if (r.check === '<') {
            const newRange = JSON.parse(JSON.stringify(range))
            newRange[r.variable][1] = r.value - 1
            ranges.push(...this.getRanges(workflows, r.target, newRange))
            range[r.variable][0] = r.value
          } else {
            const newRange = JSON.parse(JSON.stringify(range))
            newRange[r.variable][0] = r.value + 1
            ranges.push(...this.getRanges(workflows, r.target, newRange))
            range[r.variable][1] = r.value
          }
        }

        ranges.push(...this.getRanges(workflows, workflow.target, JSON.parse(JSON.stringify(range))))

        return ranges
      }
    }
  }
}
</script>

<style>
</style>
