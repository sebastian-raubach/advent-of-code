<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand :to="{ name: 'home' }" class="d-flex align-items-center">
        <!-- <img src="img/aoc.svg" height="40px" class="d-inline-block align-top mr-3" alt="Advent of code"> -->
        Advent of Code
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="year in years" :key="`year-${year}`" :to="{ name: 'year', params: { year: year } }">{{ year }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent>
            <b-form-checkbox v-model="localEditingEnabled" switch v-b-tooltip="editingEnabled ? 'Disable editing' : 'Enable editing'" />
          </b-nav-form>
          <b-nav-item @click="toggleDarkMode" v-b-tooltip="darkMode ? 'Disable dark mode' : 'Enable dark mode'"><BIconSun v-if="darkMode" /><BIconMoon v-else /></b-nav-item>
          <b-nav-item :to="{ name: 'json-parser' }">Stats</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
    <b-container class="mt-3">
      <router-view :key="$route.path"/>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { BIconMoon, BIconSun } from 'bootstrap-vue'

export default {
  components: {
    BIconMoon,
    BIconSun
  },
  data: function () {
    return {
      localEditingEnabled: false,
      localDarkMode: false
    }
  },
  computed: {
    ...mapGetters([
      'currentDay',
      'darkMode',
      'editingEnabled'
    ]),
    years: function () {
      return Object.keys(this.currentDay).sort((a, b) => b - a)
    }
  },
  watch: {
    darkMode: function (newValue) {
      this.localDarkMode = newValue
    },
    editingEnabled: function (newValue) {
      this.localEditingEnabled = newValue
    },
    localDarkMode: function () {
      document.body.classList.toggle('dark-mode')
    },
    localEditingEnabled: function () {
      this.onEditingChanged()
    }
  },
  methods: {
    toggleDarkMode: function () {
      if (this.darkMode === true) {
        this.$store.dispatch('setDarkMode', false)
      } else {
        this.$store.dispatch('setDarkMode', true)
      }
    },
    onEditingChanged: function () {
      if (this.localEditingEnabled === true) {
        this.$bvModal.msgBoxConfirm('I\'m assuming you aren\'t using this to cheat... Enable anyway?', {
          okTitle: 'Yes',
          cancelTitle: 'No'
        })
          .then(value => {
            if (value === true) {
              this.$store.dispatch('setEditingEnabled', true)
            } else {
              this.localEditingEnabled = false
            }
          })
      } else {
        this.$store.dispatch('setEditingEnabled', false)
      }
    }
  },
  mounted: function () {
    this.localDarkMode = this.darkMode
    this.localEditingEnabled = this.editingEnabled
  }
}
</script>

<style lang="scss">
// Import the bootswatch theme
$primary: #c0392b;
@import '~bootswatch/dist/united/variables';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import '~bootswatch/dist/united/bootswatch';

// Import dark mode
@import 'assets/scss/custom-dark';

.tooltip { top: 0; }
</style>
