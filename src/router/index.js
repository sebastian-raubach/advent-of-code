import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import(/* webpackChunkName: "home" */ '@/views/About.vue')
  },
  {
    path: '/1',
    name: 'day-1',
    component: () => import(/* webpackChunkName: "day-1" */ '@/components/Day1.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
