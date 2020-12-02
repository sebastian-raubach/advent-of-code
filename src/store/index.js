import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editingEnabled: false
  },
  getters: {
    editingEnabled: (state) => state.editingEnabled
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
