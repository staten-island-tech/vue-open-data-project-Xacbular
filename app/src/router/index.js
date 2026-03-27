import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArrestDetails from '@/views/ArrestDetails.vue'
import Statistics from '@/views/Statistics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    },
    {
      path: '/arrest/:id',
      name: 'arrest-details',
      component: ArrestDetails,
    },
  ],
})

export default router
