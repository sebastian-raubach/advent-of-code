import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editingEnabled: false,
    currentDay: {
      2015: 18,
      2016: 5,
      2017: 25,
      2018: 23,
      2020: 25,
      2021: 25,
      2022: 1
    },
    darkMode: false
  },
  getters: {
    storeEditingEnabled: (state) => state.editingEnabled,
    storeCurrentDay: (state) => state.currentDay,
    storeDarkMode: (state) => state.darkMode
  },
  mutations: {
    ON_EDITING_ENABLED_CHANGED_MUTATION: function (state, newEditingEnabled) {
      state.editingEnabled = newEditingEnabled
    },
    ON_DARK_MODE_CHANGED_MUTATION: function (state, newDarkMode) {
      state.darkMode = newDarkMode
    }
  },
  actions: {
    setEditingEnabled: function ({ commit }, editingEnabled) {
      commit('ON_EDITING_ENABLED_CHANGED_MUTATION', editingEnabled)
    },
    setDarkMode: function ({ commit }, darkMode) {
      commit('ON_DARK_MODE_CHANGED_MUTATION', darkMode)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'advent-of-code',
      reducer: (state) => {
        const result = JSON.parse(JSON.stringify(state))

        delete result.currentDay

        return result
      }
    })
  ]
})
