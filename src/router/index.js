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

for (let day = 1; day <= store.getters.currentDay; day++) {
  routes.push({
    path: `/${day}`,
    name: `day-${day}`,
    component: () => import(`@/components/Day${day}.vue`)
  })
}

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
