export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }
    this.listeners.get(event).forEach((listener) => {
      listener(payload);
    });
  }

  remove(event, listenerToRemove) {
    if (!this.listeners.has(event)) {
      return;
    }
    const filteredListeners = this.listeners.filter((listener) => listener !== listenerToRemove);
    this.listeners.set(event, filteredListeners);
  }
}
