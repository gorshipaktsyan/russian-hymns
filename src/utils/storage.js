class Store {
  addItem(key, newItem) {
    const items = this.get(key);
    items.push(newItem);
    this.set(key, items);
  }
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
      const value = localStorage.getItem("searchedNumbers");
      return JSON.parse(value) || [];
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
  // remove(key) {
  //   try {
  //     localStorage.removeItem(key);
  //   } catch (error) {
  //     console.error(`Error removing item "${key}" from local storage: ${error.message}`);
  //   }
  // }
}
const hymnsStorage = new Store();

export default hymnsStorage;
