<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">Title</label>
      <input v-model="title" class="form-input" :class="errors.title ? 'form-input-error' : ''" required />
      <div v-if="errors.title" class="error-text" role="alert">{{ errors.title }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea v-model="description" class="form-input" rows="4"></textarea>
    </div>

    <div class="form-group">
      <label class="form-label">Status</label>
      <select v-model="status" class="form-input">
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
      <button type="button" class="btn" @click="$emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    initial: { type: Object, default: () => ({ title:'', description:'', status:'open' }) },
    submitLabel: { type: String, default: 'Save' }
  },
  emits: ['submit','cancel'],
  setup(props, { emit }){
    const title = ref(props.initial.title || '')
    const description = ref(props.initial.description || '')
    const status = ref(props.initial.status || 'open')
    const errors = ref({})

    function validate(){
      const e = {}
      if(!title.value || !title.value.trim()) e.title = 'Title is required'
      if(!['open','in_progress','closed'].includes(status.value)) e.status = 'Invalid status'
      errors.value = e
      return Object.keys(e).length === 0
    }

    function handleSubmit(){
      if(!validate()) return
      emit('submit', { title: title.value.trim(), description: description.value.trim(), status: status.value })
    }

    return { title, description, status, errors, handleSubmit }
  }
}
</script>
