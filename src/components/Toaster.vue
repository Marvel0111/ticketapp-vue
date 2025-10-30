<template>
  <div class="toaster" aria-live="polite" aria-atomic="true">
    <div v-for="t in toasts.items" :key="t.id" class="toast" :class="t.type">
      <div class="toast-message">{{ t.message }}</div>
      <button class="btn btn-icon" @click="remove(t.id)" aria-label="Dismiss">×</button>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '../stores/toast'
import { computed } from 'vue'

export default {
  setup(){
    const toasts = useToastStore()
    return { toasts }
  }
}
</script>

<style scoped>
.toaster { position: fixed; right: 16px; top: 16px; display:flex; flex-direction:column; gap:8px; z-index:80 }
.toast { background: var(--color-card); padding:8px 12px; border-radius:8px; box-shadow: var(--shadow); display:flex; gap:8px; align-items:center }
.toast.success { border-left: 4px solid var(--color-open) }
.toast.error { border-left: 4px solid #dc2626 }
.toast-message { color: var(--color-text) }
.btn-icon { background:transparent; border:none; font-size:16px; cursor:pointer }
</style>
