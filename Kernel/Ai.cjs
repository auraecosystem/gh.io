class AiKernel {
  constructor({ bus, providers }) {
    this.bus = bus;
    this.providers = providers;
    this.running = false;
  }

  start() {
    this.running = true;
    this.bus.emit("kernel:ready", true);
  }

  async signIn() {
    this.bus.emit("auth:change", "loading");

    try {
      const provider = this.providers.github;

      const session = await provider.preSignIn();

      this.bus.emit("auth:device_code", session);

      const result = await provider.completeSignIn(session);

      this.bus.emit("auth:change", result.status);
      this.bus.emit("quota:update", result.quota);
    } catch (err) {
      this.bus.emit("auth:change", "failed");
      this.bus.emit("error", err.message);
    }
  }

  signOut() {
    this.providers.github.signOutAll?.();
    this.bus.emit("auth:change", "logged_out");
  }
}

module.exports = AiKernel;
