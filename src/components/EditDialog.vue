<template>
  <div v-if="open" class="confirm-overlay" role="dialog" aria-modal="true" :aria-labelledby="titleId" ref="overlay" @click="onOverlayClick">
    <div class="confirm-card" style="max-width:680px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h3 :id="titleId">Edit ticket</h3>
        <button class="btn btn-icon" @click="$emit('close')" aria-label="Close">×</button>
      </div>
      <TicketForm :initial="ticket" submitLabel="Save changes" @submit="onSave" @cancel="$emit('close')" />
    </div>
  </div>
</template>

<script>
import { ref, watch, onBeforeUnmount } from 'vue'
import TicketForm from './TicketForm.vue'

export default {
  components: { TicketForm },
  props: { open: { type:Boolean, default:false }, ticket: { type:Object, default: null } },
  emits:['save','close'],
  setup(props, { emit }){
    const overlay = ref(null)
    const previouslyFocused = ref(null)
    const titleId = `edit-${Math.random().toString(36).slice(2,8)}`

    function onKey(e){ if(e.key === 'Escape') emit('close') }
    function onOverlayClick(e){ if(e.target === overlay.value) emit('close') }

    watch(()=>props.open, (v)=>{
      if(v){ previouslyFocused.value = document.activeElement; document.addEventListener('keydown', onKey); setTimeout(()=>{ const el = overlay.value && overlay.value.querySelector('input,select,button'); el && el.focus() },0) }
      else { document.removeEventListener('keydown', onKey); previouslyFocused.value && previouslyFocused.value.focus() }
    })

    onBeforeUnmount(()=>{ document.removeEventListener('keydown', onKey) })

    function onSave(vals){ emit('save', {...props.ticket, ...vals}) }

    return { overlay, titleId, onOverlayClick, onSave }
  }
}
</script>
