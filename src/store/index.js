import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editingEnabled: false,
    currentDay: {
      2017: 25,
      2018: 23,
      2020: 25,
      2021: 2
    }
  },
  getters: {
    editingEnabled: (state) => state.editingEnabled,
    currentDay: (state) => state.currentDay
  },
  mutations: {
    ON_EDITING_ENABLED_CHANGED_MUTATION: function (state, newEditingEnabled) {
      state.editingEnabled = newEditingEnabled
    }
  },
  actions: {
    setEditingEnabled: function ({ commit }, editingEnabled) {
      commit('ON_EDITING_ENABLED_CHANGED_MUTATION', editingEnabled)
    }
  },
  modules: {
  }
})
