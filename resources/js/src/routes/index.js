import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'
import guest from './middlewares/guest'
import auth from './middlewares/auth'
import admin from './middlewares/admin'

import dashboardLayout from '@/layouts/dashboardLayout.vue';
import pageLayout from '@/layouts/pagesLayout.vue';
import authLayout from '@/layouts/authLayout.vue';
import paysLayout from '@/layouts/paysLayout.vue';
import bankPage from '@/pages/bank.vue';
import bankAccountPage from '@/pages/accountBank.vue';
import lastOperationPage from '@/pages/lastOperations.vue';
import notificationsPage from '@/pages/notifications.vue';
import profilePage from '@/pages/profile.vue';
import deposit from '@/pages/deposit.vue'
import creditApply from '@/pages/creditApply.vue'
import loanPage from '@/pages/loan.vue'
import userInfo from '@/components/profile/userInfo.vue'
import userAddress from '@/components/profile/userAddress.vue'
import userProffesion from '@/components/profile/userProffesion.vue'
import addAccountBank from '@/components/accountsBank/addAccountBank.vue'
import loanPay from '@/components/loan/loanPay.vue'
import loanView from '@/components/loan/loanView.vue'
import link_card from '@/pages/link_card.vue'
import cardPage from '@/pages/card.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: "/",
      name:"home",
      component: dashboardLayout,
      
      children: [
        {
          name: "dashboard",
          path: '/dashboard',
          component: () => import('@/pages/dashboard.vue'),
          beforeEnter: auth,
          meta: {
            // middleware: [
            //   auth
            // ],
            title : 'Dashboard'
          },
        },
        {
          name: "dashboard_admin",
          path: '/admin/dashboard',
          component: () => import('@/pages/admin/dashboard.vue'),
          beforeEnter: admin,
          meta: {
            // middleware: [
            //   auth
            // ],
            title : 'Dashboard'
          },
        }
      ]
    },
    {
      path: "/",
      name:"pages",
      component: pageLayout,
      beforeEnter: auth,
      children: [
        {
          path: "/bank",
          component: bankPage,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Agregar cuenta bancaria'
          },
        },
        {
          path: "/deposit",
          component:deposit,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Cargar dinero a tu billetera'
          },
        },
        {
          path: "/account_bank",
          component: bankAccountPage,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Banco'
          },
        },
        {
          path: "/last-operations",
          component: lastOperationPage,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Ult. Trans.'
          },
        },
        {
          path: "/notifications",
          component: notificationsPage,
          meta: {
            title : 'Notificaciones'
          },
        },
        {
          path: "/profile",
          component: profilePage,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Perfil'
          },
        },
        {
          path: "/apply",
          component: creditApply,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Solicitar'
          },
        },
        {
          path: "/user_info",
          component: userInfo,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Perfil'
          },
        }, 
        {
          path: "/user_address",
          component: userAddress,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Perfil'
          },
        },
        {
          path: "/user_proffesion",
          component: userProffesion,
          meta: {
            // middleware: [
            //   auth,
              
            // ],
            title : 'Perfil'
          },
        },
        {
          path: "/add_account_bank/:id",
          component: addAccountBank,
          meta: {
            title : 'Agregar cuenta bancaria'
          },
        },
        {
          path: "/card",
          component: cardPage,
          meta: {
            title : 'Vincular tarjeta de crédito'
          },
        },
        {
          path:'/loan',
          component: loanPage,
          meta: {
            title: 'Mi préstamo'
          }
        },
        {
          path: '/loan_pay',
          component: loanPay,
          meta: {
            title: 'Paga tu préstamo'
          }
        },
        {
          path: '/loan_view',
          component: loanView,
          meta: {
            title: 'Mi préstamo'
          }
        }
        
      ]
    },
    
    {
      path: "/",
      name:"auth",
      component: authLayout,
      beforeEnter:guest,
      children: [
        {
          path: "/login",
          name: "Login",
          component: () => import('@/pages/login.vue'),
          meta: {
            title: 'Bienvenido'
          },
        },
        {
          path: "/register",
          name: "register",
          component: () => import('@/pages/register.vue'),
          meta: {
            title: 'Crea tu cuenta'
          },
        },
      ]
    },
    {
      path: "/link_card",
      name:"link_card",
      component: link_card,
      meta: {
        title : 'Vincular tarjeta'
      },
      beforeEnter: auth,
    },
    {
      path: "/transfer",
      name:"transfer",
      component: () => import('@/pages/transfer.vue'),
      meta: {
        title : 'Transferir'
      },
      beforeEnter: auth,
    },
    {
      path: "/finish_transfer/:id",
      name:"finish_transfer",
      component: () => import('@/components/transfer/finishTransfer.vue'),
      meta: {
        title : '¡Envío exitoso!'
      },
      beforeEnter: auth,
    },
    {
      path: "/",
      name:"link",
      component: paysLayout,
      beforeEnter:auth,
      children: [
        {
          path: "/link_card_form",
          name: "link_card_form",
          component: () => import('@/pages/creditForDebit.vue'),
          meta: {
            title: 'Credito por debito'
          },
        },
        {
          path: "/linked_card/:id_card",
          name: "linki",
          component: () => import('@/pages/linked_card.vue'),
          meta: {
            title: 'Vincular tarjeta'
          },
        },
        {
          path: "/transfer_send",
          name: "send_transfer",
          component: () => import('@/components/transfer/sendTransfer.vue'),
          meta: {
            title: 'Enviar dinero'
          },
        },
      ]
    }
    
  ]
})



export default router
