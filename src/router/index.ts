import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/views/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Panel',
        component: () => import(/* webpackChunkName: "panel" */ '../components/Panel.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "add" */ '../views/user/add.vue'),
      },
      {
        path: '/edit',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/user/add.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const login = localStorage.getItem('login');
  if (to.path === '/login' || login) {
    next();
  } else {
    next('/login');
  }
});

export default router;
