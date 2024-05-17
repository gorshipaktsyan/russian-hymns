import persistentStorage from "./PersistentStorage";

const key = "settings";
class SettingsService {
  set(name, value) {
    const settings = persistentStorage.get(key) || {};
    settings[name] = value;
    persistentStorage.set(key, settings);
  }
  get() {
    return persistentStorage.get(key) || {};
  }
  getKey(name) {
    const settings = persistentStorage.get(key) || {};
    return settings[name];
  }
}
const settingsService = new SettingsService();

export default settingsService;
