<template>
  <div v-if="open" class="confirm-overlay" role="dialog" aria-modal="true" :aria-labelledby="titleId" ref="overlay" @click="onOverlayClick">
    <div class="confirm-card">
      <h3 :id="titleId">{{ title }}</h3>
      <p style="color:var(--color-text-light)">{{ message }}</p>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px">
        <button class="btn" @click="cancel">Cancel</button>
        <button class="btn btn-primary" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onBeforeUnmount } from 'vue'

export default {
  props: {
    open: { type: Boolean, default: false },
    title: { type: String, default: 'Confirm' },
    message: { type: String, default: '' }
  },
  emits: ['confirm','cancel'],
  setup(props, { emit }){
    const overlay = ref(null)
    const previouslyFocused = ref(null)
    const titleId = `confirm-${Math.random().toString(36).slice(2,8)}`

    function onKey(e){ if(e.key === 'Escape') cancel() }

    function focusFirst(){
      setTimeout(()=>{
        const el = overlay.value && overlay.value.querySelector('button')
        el && el.focus()
      },0)
    }

    function confirm(){ emit('confirm') }
    function cancel(){ emit('cancel') }

    function onOverlayClick(e){ if(e.target === overlay.value) cancel() }

    watch(()=>props.open, (v)=>{
      if(v){
        previouslyFocused.value = document.activeElement
        document.addEventListener('keydown', onKey)
        focusFirst()
      } else {
        document.removeEventListener('keydown', onKey)
        previouslyFocused.value && previouslyFocused.value.focus()
      }
    })

    onBeforeUnmount(()=>{ document.removeEventListener('keydown', onKey) })

    return { overlay, titleId, confirm, cancel, onOverlayClick }
  }
}
</script>

<style scoped>
.confirm-overlay { position: fixed; inset:0; background: rgba(2,6,23,0.5); display:flex; align-items:center; justify-content:center; z-index:60; padding:24px }
.confirm-card { background: var(--color-card); border-radius:12px; padding:20px; width:100%; max-width:520px; box-shadow: var(--shadow-lg) }
</style>
