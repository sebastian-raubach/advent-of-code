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
  },
  {
    path: '/2',
    name: 'day-2',
    component: () => import(/* webpackChunkName: "day-2" */ '@/components/Day2.vue')
  },
  {
    path: '/3',
    name: 'day-3',
    component: () => import(/* webpackChunkName: "day-3" */ '@/components/Day3.vue')
  },
  {
    path: '/4',
    name: 'day-4',
    component: () => import(/* webpackChunkName: "day-4" */ '@/components/Day4.vue')
  },
  {
    path: '/5',
    name: 'day-5',
    component: () => import(/* webpackChunkName: "day-5" */ '@/components/Day5.vue')
  },
  {
    path: '/6',
    name: 'day-6',
    component: () => import(/* webpackChunkName: "day-6" */ '@/components/Day6.vue')
  },
  {
    path: '/7',
    name: 'day-7',
    component: () => import(/* webpackChunkName: "day-7" */ '@/components/Day7.vue')
  },
  {
    path: '/8',
    name: 'day-8',
    component: () => import(/* webpackChunkName: "day-8" */ '@/components/Day8.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
