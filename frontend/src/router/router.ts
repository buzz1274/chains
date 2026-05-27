import { createRouter, createWebHistory } from 'vue-router'

import ChainsMainPage from '@/features/chains/pages/ChainsMainPage.vue'
import ChainsAddEdit from '@/features/chains/pages/ChainsAddEdit.vue'
import ChainsConfirmOutstanding from '@/features/chains/pages/ChainsConfirmOutstanding.vue'
import { useUserStore } from '@/stores/UserStore'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: ChainsMainPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/chains',
        name: 'home',
        component: ChainsMainPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/chains/:action/:id?',
        name: 'add_edit_chain',
        component: ChainsAddEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/chains/confirm-outstanding/:id?',
        name: 'chain_confirm_outstanding',
        component: ChainsConfirmOutstanding,
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        return {
            path: '/',
            query: { redirect: to.fullPath },
        }
    }
})

export default router
