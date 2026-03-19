import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArrestDetails from '@/views/ArrestDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/arrest/:id',
      name: 'arrest-details',
      component: ArrestDetails,
    },
  ],
})

export default router
