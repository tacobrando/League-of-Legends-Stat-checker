export const useErrorStore = defineStore('error', {
  state: () => ({
    error: {
      statusCode: null,
      statusMessage: null,
    }
  }),
  actions: {
    setError({ statusCode, statusMessage }) {
      this.error.statusCode = statusCode
      this.error.statusMessage = statusMessage.toLowerCase()
    },
    resetErrors() {
      this.error.statusCode = null
      this.error.statusMessage = null
    }
  }
})