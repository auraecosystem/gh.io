const assert = require("node:assert/strict");
const test = require("node:test");

const EventBus = require("../core/Eventbus.cjs");

test("EventBus emits payloads to subscribed handlers", () => {
  const bus = new EventBus();
  const received = [];

  bus.on("auth:change", (status) => received.push(status));
  const emitted = bus.emit("auth:change", "logged_in");

  assert.equal(emitted, true);
  assert.deepEqual(received, ["logged_in"]);
});

test("EventBus unsubscribe removes handlers", () => {
  const bus = new EventBus();
  let calls = 0;

  const unsubscribe = bus.on("quota:update", () => {
    calls += 1;
  });

  bus.emit("quota:update");
  unsubscribe();
  const emitted = bus.emit("quota:update");

  assert.equal(emitted, false);
  assert.equal(calls, 1);
});

test("EventBus once handlers run at most one time", () => {
  const bus = new EventBus();
  let calls = 0;

  bus.once("kernel:ready", () => {
    calls += 1;
  });

  bus.emit("kernel:ready");
  bus.emit("kernel:ready");

  assert.equal(calls, 1);
});
