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
  }
]

Object.keys(store.getters.currentDay).forEach(year => {
  routes.push({
    path: `/${year}`,
    name: `year-${year}`,
    component: () => import(`@/views/Year${year}.vue`)
  })

  for (let day = 1; day <= store.getters.currentDay[year]; day++) {
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
