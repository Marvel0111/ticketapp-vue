<template>
  <div class="container">
    <h2>Dashboard</h2>
    <div class="grid grid-3" style="margin-top:16px;">
      <div class="card">Total tickets: {{ total }}</div>
      <div class="card">Open: {{ open }}</div>
      <div class="card">Closed: {{ closed }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useTickets } from '../stores/tickets'

export default {
  setup(){
    const tickets = useTickets()
    const total = computed(()=> tickets.tickets.length)
    const open = computed(()=> tickets.tickets.filter(t=>t.status==='open').length)
    const closed = computed(()=> tickets.tickets.filter(t=>t.status==='closed').length)
    tickets.load()
    return { total, open, closed }
  }
}
</script>