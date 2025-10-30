<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './stores/auth'
import { storeToRefs } from 'pinia'
import Toaster from './components/Toaster.vue'

const auth = useAuth()
auth.loadFromStorage()
const router = useRouter()

// reactive user state
const { user } = storeToRefs(auth)

// handle logout action
function handleLogout() {
  auth.logout()
  router.push('/auth/login')
}

// computed authentication state
const isAuthenticated = computed(() => !!auth.user)
</script>

<template>
  <div>
    <header class="header">
      <div class="container" style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;gap:16px;align-items:center">
          <h2 style="margin:0">TicketApp</h2>
        </div>

        <nav class="nav" aria-label="Main navigation">
          <router-link to="/">Home</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/tickets">Tickets</router-link>
          <span v-if="!isAuthenticated">
            <router-link to="/auth/login">Login</router-link>
            <router-link to="/auth/signup">Sign up</router-link>
          </span>
          <button v-else class="btn" @click="handleLogout">Logout</button>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <Toaster />

    <footer class="footer container">
      <div class="footer-content">
        <div>&copy; TicketApp</div>
        <nav>
          <a href="#">Privacy</a>
          <a href="#" style="margin-left:12px">Terms</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.header { background: var(--color-card); box-shadow: var(--shadow-sm); }
.nav a { margin-right: 12px; }
.footer { margin-top: 48px; }
</style>

<style>
main { min-height: calc(100vh - 200px); }
</style>
