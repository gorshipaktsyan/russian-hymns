class PersistentStore {
  set(key, value) {
    try {
      const currentItems = JSON.stringify(value);
      localStorage.setItem(key, currentItems);
    } catch (error) {
      console.error(`Error setting item in local storage: ${error.message}`);
    }
  }
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error getting item from local storage: ${error.message}`);
    }
  }
  clear(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing Items from local storage: ${error.message}`
      );
    }
  }
}
const persistentStore = new PersistentStore();

export default persistentStore;
