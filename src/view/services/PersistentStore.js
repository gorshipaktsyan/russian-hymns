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
      const parsedValue = [JSON.parse(value)];
      return Array.isArray(parsedValue) ? parsedValue : [];
    } catch (error) {
      console.error(`Error getting item from local storage: ${error.message}`);
      return [];
    }
  }
  // clear() {
  //   try {
  //     localStorage.clear();
  //   } catch (error) {
  //     console.error(`Error clearing local storage: ${error.message}`);
  //   }
  // }
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing item "${key}" from local storage: ${error.message}`
      );
    }
  }
}
const persistentStore = new PersistentStore();

export default persistentStore;
