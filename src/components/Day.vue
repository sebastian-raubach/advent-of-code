<template>
  <div>
    <h1>Day {{ day }}</h1>

    <div v-if="markdown && markdown.partOne" class="mb-3">
      <b-button v-b-toggle.part-one>Show Part 1</b-button>
      <b-collapse id="part-one">
        <vue-markdown :source="markdown.partOne" />
      </b-collapse>
    </div>

    <div v-if="markdown && markdown.partTwo" class="mb-3">
      <b-button v-b-toggle.part-two>Show Part 2</b-button>
      <b-collapse id="part-two">
        <vue-markdown :source="markdown.partTwo" />
      </b-collapse>
    </div>

    <h2>Input</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Task input" description="The task input provided for this day." label-for="task-input">
        <b-form-textarea rows="5" v-model="input" id="task-input" :disabled="!editingEnabled" />
      </b-form-group>
      <b-button type="submit" @click.prevent="onSubmit">Run</b-button>
    </b-form>

    <template v-if="solutions.partOne !== undefined && solutions.partOne !== null">
      <h2 class="mt-3">Solution Part 1</h2>
      <slot name="partOne" />
      <p>{{ solutions.partOne }}</p>
    </template>

    <template v-if="solutions.partTwo !== undefined && solutions.partTwo !== null">
      <h2>Solution Part 2</h2>
      <slot name="partTwo" />
      <p>{{ solutions.partTwo }}</p>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      input: null
    }
  },
  props: {
    day: {
      type: Number,
      default: 1
    },
    solutions: {
      type: Object,
      default: () => {
        return {
          partOne: null,
          partTwo: null
        }
      }
    },
    taskInput: {
      type: String,
      default: null
    }
  },
  watch: {
    taskInput: function (newValue) {
      this.input = newValue
    }
  },
  computed: {
    ...mapGetters([
      'editingEnabled'
    ]),
    markdown: function () {
      let mdOne
      let mdTwo

      try {
        mdOne = require(`@/assets/markdown/Day-${this.day}.1.md`)
      } catch (err) {
        // Ignore errors
      }
      try {
        mdTwo = require(`@/assets/markdown/Day-${this.day}.2.md`)
      } catch (err) {
        // Ignore errors
      }
      return {
        partOne: mdOne ? mdOne.default : null,
        partTwo: mdTwo ? mdTwo.default : null
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

</style>
