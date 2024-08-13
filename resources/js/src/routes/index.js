import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'
import guest from './middlewares/guest'
import auth from './middlewares/auth'
import admin from './middlewares/admin'

import dashboardLayout from '@/layouts/dashboardLayout.vue';
import pageLayout from '@/layouts/pagesLayout.vue';
import authLayout from '@/layouts/authLayout.vue';
import paysLayout from '@/layouts/paysLayout.vue';
import profile from '@/pages/profile.vue';


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
          name: "profile",
          path: '/profile',
          component: profile,
          beforeEnter: auth,
          meta: {
            title : 'Perfil'
          },
        },
        {
          name: "dashboard_admin",
          path: '/admin/dashboard',
          component: () => import('@/pages/admin/dashboard.vue'),
          beforeEnter: admin,
          meta: {
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
    
  ]
})



export default router
