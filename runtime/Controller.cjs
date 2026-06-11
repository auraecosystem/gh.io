class RuntimeController {
  constructor({ kernel, bus, logger }) {
    this.kernel = kernel;
    this.bus = bus;
    this.logger = logger;

    this.state = {
      auth: "unknown",
      busy: false,
      quota: null,
      features: {}
    };

    this.subscriptions = [];
  }

  start() {
    this.logger?.info("Runtime starting...");

    this.subscribe("auth:change", this.onAuthChange.bind(this));
    this.subscribe("quota:update", this.onQuotaUpdate.bind(this));
    this.subscribe("system:busy", this.onBusy.bind(this));

    this.kernel.start();
  }

  subscribe(event, handler) {
    this.bus.on(event, handler);
    this.subscriptions.push({ event, handler });
  }

  onAuthChange(status) {
    this.state.auth = status;
    this.render();
  }

  onQuotaUpdate(quota) {
    this.state.quota = quota;
    this.render();
  }

  onBusy(flag) {
    this.state.busy = flag;
    this.render();
  }

  render() {
    this.bus.emit("ui:update", {
      state: this.state
    });
  }

  stop() {
    this.logger?.info("Runtime stopping...");
    this.subscriptions.forEach(({ event, handler }) => {
      this.bus.off(event, handler);
    });
  }
}

module.exports = RuntimeController;
