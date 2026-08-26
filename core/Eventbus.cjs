class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    this.assertEvent(event);
    this.assertHandler(handler);

    const handlers = this.listeners.get(event) ?? new Set();
    handlers.add(handler);
    this.listeners.set(event, handlers);

    return () => this.off(event, handler);
  }

  once(event, handler) {
    this.assertHandler(handler);

    const unsubscribe = this.on(event, (...args) => {
      unsubscribe();
      handler(...args);
    });

    return unsubscribe;
  }

  off(event, handler) {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return false;
    }

    const removed = handlers.delete(handler);

    if (handlers.size === 0) {
      this.listeners.delete(event);
    }

    return removed;
  }

  emit(event, ...args) {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return false;
    }

    for (const handler of [...handlers]) {
      handler(...args);
    }

    return true;
  }

  clear(event) {
    if (event === undefined) {
      this.listeners.clear();
      return;
    }

    this.listeners.delete(event);
  }

  assertEvent(event) {
    if (typeof event !== "string" || event.length === 0) {
      throw new TypeError("Event name must be a non-empty string.");
    }
  }

  assertHandler(handler) {
    if (typeof handler !== "function") {
      throw new TypeError("Event handler must be a function.");
    }
  }
}

module.exports = EventBus;
