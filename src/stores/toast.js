import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({ items: [] }),
  actions: {
    push(toast){
      const id = Math.random().toString(36).slice(2)
      this.items.push({ id, ...toast })
      if(toast.duration !== 0){
        setTimeout(()=> this.remove(id), toast.duration || 4000)
      }
    },
    remove(id){ this.items = this.items.filter(t=>t.id !== id) }
  }
})
