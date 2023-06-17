import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    dobleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounter(num: number) {
      this.counter = num
    }
  }
})
export default useCounterStore
