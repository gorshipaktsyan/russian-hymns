import persistentStore from "./PersistentStore";

const key = "currentNumber";

export default function findLocation(pathname, currentNumber, navItems) {
  return pathname === "/hymns"
    ? `Гимн ${currentNumber}`
    : pathnamesTitle(pathname);

  function pathnamesTitle(pathname) {
    const selectedItem = navItems.find((item) => `/${item.route}` === pathname);

    return selectedItem ? selectedItem.title : "Поиск";
  }
}

class CurrentNumberStore {
  set(value) {
    persistentStore.set(key, value);
  }
  get() {
    const result = persistentStore.get(key);
    return result ? result : [1];
  }
}
export const currentNumberStore = new CurrentNumberStore();
