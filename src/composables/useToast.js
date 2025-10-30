import { useToastStore } from '../stores/toast'

export function useToast(){
  const store = useToastStore()
  return {
    success(message){ store.push({ type: 'success', message, duration: 3500 }) },
    error(message){ store.push({ type: 'error', message, duration: 5000 }) }
  }
}
