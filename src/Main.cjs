const EventBus = require("../core/Eventbus.cjs");
const RuntimeController = require("../runtime/Controller.cjs");
const AiKernel = require("../Kernel/Ai.cjs");
const StatusHUD = require("../ui/statushud.cjs");

function bootstrap() {
  const bus = new EventBus();

  const kernel = new AiKernel({
    bus,
    providers: {
      github: {
        async preSignIn() {
          return {
            userCode: "ABCD-1234",
            verificationURL: new URL("https://github.com/login/device")
          };
        },
        async completeSignIn() {
          return {
            status: "logged_in",
            quota: { used: 10, limit: 100 }
          };
        },
        signOutAll() {}
      }
    }
  });

  const runtime = new RuntimeController({
    kernel,
    bus,
    logger: console
  });

  new StatusHUD(bus);

  runtime.start();

  // simulate auth flow
  setTimeout(() => kernel.signIn(), 2000);
}

bootstrap();
