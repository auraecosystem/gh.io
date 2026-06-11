class StatusHUD {
  constructor(bus) {
    this.bus = bus;

    this.state = null;

    this.bus.on("ui:update", ({ state }) => {
      this.state = state;
      this.render();
    });
  }

  render() {
    if (!this.state) return;

    console.clear();

    console.log("=== WEB4 AI STATUS ===");
    console.log("Auth:", this.state.auth);
    console.log("Busy:", this.state.busy);
    console.log("Quota:", this.state.quota);
  }
}

module.exports = StatusHUD;
