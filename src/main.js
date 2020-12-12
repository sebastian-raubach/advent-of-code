import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin.js'

import { BootstrapVue } from 'bootstrap-vue'
import { install as VueMarkdown } from 'vue-markdown/src/build'

Vue.use(VueMarkdown)

Vue.use(BootstrapVue)
Vue.mixin(mixin)

Vue.config.productionTip = false

Vue.use({
  install: function (Vue) {
    // Make custom plotly available
    Vue.prototype.$plotly = require('@/custom-plotly')
    window.Plotly = Vue.prototype.$plotly
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
