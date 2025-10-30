import { defineStore } from 'pinia'

const SESSION_KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users'

export const useAuth = defineStore('auth', {
  state: () => ({ user: null, token: null, sessionExpired: false, _expiryTimer: null }),
  actions: {
    loadFromStorage(){
      const raw = localStorage.getItem(SESSION_KEY)
      if(raw){
        try{ 
          const s = JSON.parse(raw); 
          this.user = s.user; 
          this.token = s.token;
          // check expiry (1 hour demo)
          const created = s.createdAt || 0
          const age = Date.now() - created
          const TTL = 1000 * 60 * 60 // 1 hour
          if(age > TTL){
            this.clearSessionExpired()
            this.sessionExpired = true
            this.logout()
          } else {
            this.sessionExpired = false
            // schedule expiry
            this._scheduleExpiry(TTL - age)
          }
        }catch(e){}
      }
    },
    _scheduleExpiry(ms){
      if(this._expiryTimer) clearTimeout(this._expiryTimer)
      this._expiryTimer = setTimeout(()=>{
        this.sessionExpired = true
        this.logout()
      }, ms)
    },
    clearSessionExpired(){
      this.sessionExpired = false
    },
    async login({ email, password }){
      // simple client-side auth: look up user from storage
      const raw = localStorage.getItem(USERS_KEY)
      const users = raw ? JSON.parse(raw) : []
      const found = users.find(u => u.email === email && u.password === password)
      if(!found) throw new Error('Invalid credentials')
      const token = Math.random().toString(36).slice(2)
      this.user = { email: found.email, name: found.name }
      this.token = token
      const session = { token, user: this.user, createdAt: Date.now() }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      // schedule expiry
      const TTL = 1000 * 60 * 60 // 1 hour
      this.sessionExpired = false
      this._scheduleExpiry(TTL)
    },
    async signup({ name, email, password }){
      const raw = localStorage.getItem(USERS_KEY) || '[]'
      const users = JSON.parse(raw)
      if(users.find(u => u.email === email)) throw new Error('User already exists')
      users.push({ name, email, password })
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      // auto-login
      await this.login({ email, password })
    },
    logout(){
      this.user = null
      this.token = null
      localStorage.removeItem(SESSION_KEY)
      if(this._expiryTimer) { clearTimeout(this._expiryTimer); this._expiryTimer = null }
    }
  }
})
