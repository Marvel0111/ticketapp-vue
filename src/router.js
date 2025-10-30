import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Landing.vue'
import Login from './pages/auth/Login.vue'
import Signup from './pages/auth/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import Tickets from './pages/Tickets.vue'
import { useAuth } from './stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', component: Tickets, meta: { requiresAuth: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  auth.loadFromStorage()
  if (to.meta.requiresAuth && !auth.user) {
    return next('/auth/login')
  }
  next()
})

export default router
