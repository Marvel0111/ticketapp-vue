<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Welcome back</h1>
      <p class="auth-subtitle">Login to manage your tickets</p>

      <form @submit.prevent="handleSubmit" novalidate class="auth-form">
        <div class="form-group">
          <label for="email" class="form-label">Email address</label>
          <input id="email" type="email" v-model="email" :class="['form-input', errors.email ? 'form-input-error' : '']" :disabled="loading" required aria-describedby="email-error" />
          <div v-if="errors.email" id="email-error" class="error-text" role="alert">{{ errors.email }}</div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input id="password" type="password" v-model="password" :class="['form-input', errors.password ? 'form-input-error' : '']" :disabled="loading" required minlength="6" aria-describedby="password-error" />
          <div v-if="errors.password" id="password-error" class="error-text" role="alert">{{ errors.password }}</div>
        </div>

        <button type="submit" class="btn btn-primary w-full" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
      </form>

      <p class="auth-footer">
        Don't have an account? <router-link to="/auth/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'
import { useToast } from '../../composables/useToast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  setup(){
    const email = ref('')
    const password = ref('')
    const errors = ref({})
    const loading = ref(false)
    const router = useRouter()
    const auth = useAuth()
  const toast = useToast()

    function validateForm(){
      const newErrors = {}
      if(!email.value) newErrors.email = 'Email is required'
      else if(!EMAIL_REGEX.test(email.value)) newErrors.email = 'Please enter a valid email address'
      if(!password.value) newErrors.password = 'Password is required'
      else if(password.value.length < 6) newErrors.password = 'Password must be at least 6 characters'
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(){
      if(!validateForm()) return
      loading.value = true
      try {
        await auth.login({ email: email.value, password: password.value })
        toast.success('Welcome back!')
        router.push('/dashboard')
      } catch(err){
        toast.error(err.message || 'Failed to login. Please try again.')
      } finally {
        loading.value = false
      }
    }

    return { email, password, errors, loading, handleSubmit }
  }
}
</script>
