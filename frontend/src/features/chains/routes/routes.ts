import ChainsLayout from '@/features/chains/layouts/ChainsLayout.vue'
import ChainsMainPage from '@/features/chains/pages/ChainsMainPage.vue'
import ChainsAddEdit from '@/features/chains/pages/ChainsAddEdit.vue'
import ChainsConfirmOutstanding from '@/features/chains/pages/ChainsConfirmOutstanding.vue'

export const routes = [
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
