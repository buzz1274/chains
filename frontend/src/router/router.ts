import { createRouter, createWebHistory } from 'vue-router'

import HomeMainPage from '@/components/home/HomeMainPage.vue'
import AddEditChain from '@/components/chains/AddEditChain.vue'
import { useUserStore } from '@/stores/UserStore'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeMainPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/add',
        name: 'add chain',
        component: AddEditChain,
        meta: { requiresAuth: true }
    }
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
