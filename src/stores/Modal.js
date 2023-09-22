import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hideClass(state) {
      return state.isOpen
    }
  }
})
