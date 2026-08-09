const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2184708",
  key: "5551079ec0aee047975f",
  secret: "60e1fbbd5d59f771e929",
  cluster: "mt1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});
