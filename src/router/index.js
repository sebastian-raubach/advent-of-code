import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/stats',
    name: 'json-parser',
    component: () => import(/* webpackChunkName: "stats" */ '@/views/JsonStats.vue')
  },
  {
    path: '/:year',
    name: 'year',
    component: () => import(/* webpackChunkName: "year" */ '@/views/Year.vue')
  }
]

Object.keys(store.getters.storeCurrentDay).forEach(year => {
  for (let day = 1; day <= store.getters.storeCurrentDay[year]; day++) {
    routes.push({
      path: `/${year}/${day}`,
      name: `year-${year}-day-${day}`,
      component: () => import(`@/components/${year}/Day${day}.vue`)
    })
  }
})

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
