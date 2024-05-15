import hymns from "../storage/hymns.json";
import persistentStore from "./PersistentStore";

const key = "settings";
class SettingsStore {
  set(name, value) {
    const settings = persistentStore.get(key) || {};
    settings[name] = value;
    persistentStore.set(key, settings);
  }
  get() {
    return persistentStore.get(key) || {};
  }
  getKey(name) {
    const settings = persistentStore.get(key) || {};
    return settings[name];
  }
}
const settingsStore = new SettingsStore();

export default settingsStore;
