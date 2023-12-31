class PersistentStore {
  set (key, value) {
    try {
      const currentItems = JSON.stringify(value)
      localStorage.setItem(key, currentItems)
    } catch (error) {
      console.error(`Error setting item in local storage: ${error.message}`)
    }
  }
  get (key) {
    try {
      const value = localStorage.getItem(key)
      return JSON.parse(value)
    } catch (error) {
      console.error(`Error getting item from local storage: ${error.message}`)
    }
  }
  clear () {
    try {
      localStorage.clear()
    } catch (error) {
      console.error(`Error clearing local storage: ${error.message}`)
    }
  }
  remove (key, value) {
    try {
      const items = this.get(key) || []
      const updatedItems = items.filter(item => item !== value)
      this.set(key, updatedItems)
    } catch (error) {
      console.error(
        `Error removing item "${key}" from local storage: ${error.message}`
      )
    }
  }
}
const persistentStore = new PersistentStore()

export default persistentStore
