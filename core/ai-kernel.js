class AIKernel {
  constructor(bus) {
    this.bus = bus;
  }

  interpret(input) {
    if (input.includes("wallet")) {
      return { view: "wallet", mode: "htm" };
    }

    if (input.includes("report")) {
      return { view: "report", mode: "haml" };
    }

    return { view: "dashboard", mode: "htm" };
  }

  run(input) {
    const decision = this.interpret(input);
    this.bus.emit("ui:update", decision);
  }
}

module.exports = AIKernel;
