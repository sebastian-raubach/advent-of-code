import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

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
