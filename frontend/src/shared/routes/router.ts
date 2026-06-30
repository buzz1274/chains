import { createRouter, createWebHistory } from 'vue-router'

import { routes as landingPageRoutes } from '@/features/landing/routes/routes'
import { routes as chainsRoutes } from '@/features/chains/routes/routes'
import { useUserStore } from '@/features/users/stores/useUserStore.ts'

const routes = [...landingPageRoutes, ...chainsRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta['requiresAuth'] && !userStore.isAuthenticated) {
    return {
      path: '/',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta['guestOnly'] && userStore.isAuthenticated) {
    return {
      path: '/chains',
    }
  }
})

export default router
