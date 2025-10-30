<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Create account</h1>
      <p class="auth-subtitle">Sign up to manage your tickets</p>

      <form @submit.prevent="handleSubmit" novalidate class="auth-form">
        <div class="form-group">
          <label for="name" class="form-label">Full name</label>
          <input id="name" type="text" v-model="name" :class="['form-input', errors.name ? 'form-input-error' : '']" :disabled="loading" required aria-describedby="name-error" />
          <div v-if="errors.name" id="name-error" class="error-text" role="alert">{{ errors.name }}</div>
        </div>

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

        <button type="submit" class="btn btn-primary w-full" :disabled="loading">{{ loading ? 'Creating...' : 'Create account' }}</button>
      </form>

      <p class="auth-footer">
        Already have an account? <router-link to="/auth/login">Log in</router-link>
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
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const errors = ref({})
    const loading = ref(false)
    const auth = useAuth()
    const router = useRouter()
  const toast = useToast()

    function validate(){
      const e = {}
      if(!name.value) e.name = 'Name is required'
      if(!email.value) e.email = 'Email is required'
      else if(!EMAIL_REGEX.test(email.value)) e.email = 'Please enter a valid email address'
      if(!password.value) e.password = 'Password is required'
      else if(password.value.length < 6) e.password = 'Password must be at least 6 characters'
      errors.value = e
      return Object.keys(e).length === 0
    }

    async function handleSubmit(){
      if(!validate()) return
      loading.value = true
      try{
        await auth.signup({ name: name.value, email: email.value, password: password.value })
        toast.success('Account created')
        router.push('/dashboard')
      }catch(err){
        toast.error(err.message || 'Signup failed')
      }finally{ loading.value = false }
    }

    return { name, email, password, errors, loading, handleSubmit }
  }
}
</script>