<template>
  <div>
    <h1>Day {{ day }}</h1>

    <h2>Input</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Task input" description="The task input provided for this day." label-for="task-input">
        <b-form-textarea rows="5" v-model="input" id="task-input" :disabled="!editingEnabled" />
      </b-form-group>
      <b-button type="submit" @click.prevent="onSubmit">Run</b-button>
    </b-form>

    <template v-if="solutions.partOne !== undefined && solutions.partOne !== null">
      <h2 class="mt-3">Solution part 1</h2>
      <slot name="partOne" />
      <p>{{ solutions.partOne }}</p>
    </template>

    <template v-if="solutions.partTwo !== undefined && solutions.partTwo !== null">
      <h2>Solution part 2</h2>
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
