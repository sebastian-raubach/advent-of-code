<template>
  <div class="mb-3">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Day {{ day }}<template v-if="currentDay"> - {{ currentDay.title }}</template></h1>
      <b-button-group>
        <b-button :disabled="day <= 1" :to="{ name: `year-${year}-day-${day - 1}` }"><BIconCaretLeftFill /></b-button>
        <b-button :disabled="day >= solvedDays[year].length" :to="{ name: `year-${year}-day-${day + 1}` }"><BIconCaretRightFill /></b-button>
      </b-button-group>
    </div>

    <div v-if="markdown && markdown.partOne" class="mb-3">
      <b-button v-b-toggle.part-one>Show Part 1</b-button>
      <b-collapse id="part-one">
        <b-card class="mt-3 markdown">
          <VueMarkdown :source="markdown.partOne" />
        </b-card>
      </b-collapse>
    </div>

    <div v-if="markdown && markdown.partTwo" class="mb-3">
      <b-button v-b-toggle.part-two>Show Part 2</b-button>
      <b-collapse id="part-two">
        <b-card class="mt-3 markdown">
          <VueMarkdown :source="markdown.partTwo" />
        </b-card>
      </b-collapse>
    </div>

    <h2>Input</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Task input" description="The task input provided for this day." label-for="task-input">
        <b-form-textarea rows="8" v-model="input" id="task-input" wrap="soft" :disabled="!storeEditingEnabled" />
      </b-form-group>
      <b-button type="submit" @click.prevent="onSubmit">Run</b-button>
      <div v-if="currentDay.warnings">
        <small class="text-warning" v-for="(warning, index) in currentDay.warnings" :key="`warning-${index}`">{{ warning }}</small>
      </div>
    </b-form>

    <template v-if="solutions.partOne !== undefined && solutions.partOne !== null">
      <h2 class="mt-3">Solution Part 1</h2>
      <slot name="partOne" />
      <b-form-input class="mb-3" readonly :value="solutions.partOne" @focus="$event.target.select()" />
    </template>

    <template v-if="solutions.partTwo !== undefined && solutions.partTwo !== null">
      <h2>Solution Part 2</h2>
      <slot name="partTwo" />
      <b-form-input class="mb-3" readonly :value="solutions.partTwo" @focus="$event.target.select()" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BIconCaretRightFill, BIconCaretLeftFill } from 'bootstrap-vue'
import VueMarkdown from '@adapttive/vue-markdown'
import { solvedDays } from '@/util/days'

export default {
  components: {
    BIconCaretRightFill,
    BIconCaretLeftFill,
    VueMarkdown
  },
  props: {
    day: {
      type: Number,
      default: 1
    },
    year: {
      type: Number,
      default: 2023
    },
    solutions: {
      type: Object,
      default: () => {
        return {
          partOne: null,
          partTwo: null
        }
      }
    }
  },
  data: function () {
    return {
      solvedDays,
      input: null
    }
  },
  computed: {
    ...mapGetters([
      'storeEditingEnabled'
    ]),
    currentDay: function () {
      return this.solvedDays[this.year][this.day - 1]
    },
    taskInput: function () {
      try {
        return require(`@/assets/input/${this.year}/Day-${this.day}.txt`).default
      } catch (err) {
        return null
      }
    },
    markdown: function () {
      let markdown

      try {
        markdown = require(`@/assets/markdown/${this.year}/Day-${this.day}.md`).default
      } catch (err) {
        // Ignore errors
      }

      if (markdown) {
        const parts = markdown.split('[comment]: <> (PART 2)')

        return {
          partOne: parts[0],
          partTwo: parts.length > 1 ? parts[1] : null
        }
      } else {
        return {
          partOne: null,
          partTwo: null
        }
      }
    },
    splitData: function () {
      if (this.input) {
        return this.input.split(/\r?\n/)
      } else {
        return null
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.$emit('input-changed', this.splitData)
    }
  },
  mounted: function () {
    if (this.taskInput) {
      this.input = this.taskInput
    }
  }
}
</script>

<style>
#task-input {
  font-family: monospace;
  white-space: pre;
  overflow: auto;
}
.markdown strong code,
.markdown pre b,
.markdown code b {
  font-weight: 900;
  text-shadow: 0 0 3px #e83e8c;
}
.markdown strong {
  text-shadow: 0 0 3px #333333;
  font-weight: 500;
}
body.dark-mode .markdown strong {
  text-shadow: 0 0 3px #cccccc;
  font-weight: 500;
}
body.dark-mode .markdown strong code,
body.dark-mode .markdown pre b,
body.dark-mode .markdown code b {
  text-shadow: 0 0 3px #ff9bc9;
}
</style>
