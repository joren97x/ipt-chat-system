
const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: 'chat', component: () => import('../pages/Chats.vue') },
      { path: '', component: () => import('../pages/IndexPage.vue') },
      { path: 'people', component: () => import('../pages/People.vue') },

      { path: 'about', component: () => import('../pages/About.vue') },
      { path: 'settings', component: () => import('../pages/Settings.vue') },
    ],
    meta: { requiresAuth: true },
  },
  { 
    path: '/login', 
    component: () => import('../pages/Login.vue') 
  },
  { 
    path: '/register', 
    component: () => import('../pages/Register.vue') 
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
