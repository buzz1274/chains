import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/features/landing/pages/LandingPage.vue'
import ChainsLayout from '@/features/chains/layouts/ChainsLayout.vue'
import ChainsMainPage from '@/features/chains/pages/ChainsMainPage.vue'
import ChainsAddEdit from '@/features/chains/pages/ChainsAddEdit.vue'
import ChainsConfirmOutstanding from '@/features/chains/pages/ChainsConfirmOutstanding.vue'
import { useUserStore } from '@/stores/UserStore'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    meta: { guestOnly: true },
  },
  {
    path: '/chains/',
    component: ChainsLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'chains',
        component: ChainsMainPage,
      },
      {
        path: ':action/:id?',
        name: 'add_edit_chain',
        component: ChainsAddEdit,
      },
      {
        path: 'confirm-outstanding/:id?',
        name: 'chain_confirm_outstanding',
        component: ChainsConfirmOutstanding,
      },
    ],
  },
]

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
