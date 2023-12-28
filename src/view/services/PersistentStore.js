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
  remove (key, values) {
    try {
      const savedHymnsId = this.get(key) || []
      const updatedItems = savedHymnsId.filter(id => !values.includes(id))
      this.set(key, updatedItems)
      console.log(key, updatedItems)
    } catch (error) {
      console.error(
        `Error removing item "${key}" from local storage: ${error.message}`
      )
    }
  }
}
const persistentStore = new PersistentStore()

export default persistentStore
