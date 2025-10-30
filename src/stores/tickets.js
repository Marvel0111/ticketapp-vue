import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const TICKETS_KEY = 'ticketapp_tickets'

export const useTickets = defineStore('tickets', {
  state: () => ({ tickets: [], loading: false }),
  actions: {
    load(){
      const raw = localStorage.getItem(TICKETS_KEY) || '[]'
      try{ this.tickets = JSON.parse(raw) }catch(e){ this.tickets = [] }
    },
    async create(ticket){
      const t = { id: uuidv4(), createdAt: Date.now(), ...ticket }
      this.tickets.unshift(t)
      localStorage.setItem(TICKETS_KEY, JSON.stringify(this.tickets))
      return t
    },
    async update(updated){
      this.tickets = this.tickets.map(t=> t.id===updated.id ? {...t, ...updated, updatedAt: Date.now()} : t)
      localStorage.setItem(TICKETS_KEY, JSON.stringify(this.tickets))
    },
    async remove(id){
      this.tickets = this.tickets.filter(t=>t.id!==id)
      localStorage.setItem(TICKETS_KEY, JSON.stringify(this.tickets))
    }
  }
})
