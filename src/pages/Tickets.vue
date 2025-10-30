<template>
  <div class="container">
    <h2>Tickets</h2>
    <div style="margin-top:16px;" class="card">
      <form @submit.prevent="createTicket">
        <div class="form-group">
          <label class="form-label">Title</label>
          <input class="form-input" v-model="title" required />
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-input" v-model="status">
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Create</button>
      </form>
    </div>

    <div style="margin-top:16px;" class="grid">
      <div v-for="t in tickets.tickets" :key="t.id" class="ticket-card card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-weight:600">{{ t.title }}</div>
            <div class="status" :class="t.status">{{ t.status.replace('_',' ') }}</div>
          </div>
          <div>
            <button class="btn" @click="openEdit(t)">Edit</button>
            <button class="btn btn-secondary" @click="confirmDelete(t.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <EditDialog :open="editing !== null" :ticket="editing" @save="saveEdit" @close="closeEdit" />
    <ConfirmDialog :open="deletePending !== null" title="Delete ticket" :message="'Are you sure you want to delete this ticket?'" @confirm="doDelete" @cancel="cancelDelete" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useTickets } from '../stores/tickets'
import EditDialog from '../components/EditDialog.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { useToast } from '../composables/useToast'

export default {
  components: { EditDialog, ConfirmDialog },
  setup(){
    const tickets = useTickets()
    tickets.load()
    const title = ref('')
    const status = ref('open')
    const editing = ref(null)
    const deletePending = ref(null)
    const toast = useToast()

    async function createTicket(){
      if(!title.value) { toast.error('Title is required'); return }
      try{
        await tickets.create({ title: title.value, status: status.value })
        toast.success('Ticket created')
        title.value = ''
        status.value = 'open'
      }catch(e){ toast.error('Failed to create ticket') }
    }

    function openEdit(t){ editing.value = t }
    function closeEdit(){ editing.value = null }
    async function saveEdit(updated){
      try{
        await tickets.update(updated)
        toast.success('Ticket updated')
      }catch(e){ toast.error('Failed to update ticket') }
    }

    function confirmDelete(id){ deletePending.value = id }
    function cancelDelete(){ deletePending.value = null }
    async function doDelete(){
      try{
        await tickets.remove(deletePending.value)
        toast.success('Ticket deleted')
      }catch(e){ toast.error('Failed to delete ticket') }
      deletePending.value = null
    }

    return { tickets, title, status, createTicket, openEdit, editing, closeEdit, saveEdit, confirmDelete, deletePending, cancelDelete, doDelete }
  }
}
</script>