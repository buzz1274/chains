import LandingPage from '@/features/landing/pages/LandingPage.vue'

export const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    meta: { guestOnly: true },
  },
]
