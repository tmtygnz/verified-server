import { fastify } from "./lib/fastifyProvider";
import { registerHome } from "./routes/home";

fastify.get("/", async (req, rep) => {
  return { hello: "world" };
});

registerHome();

const boot = () => {
  try {
    console.log("hello world");
    fastify.listen({ port: 3001 });
  } catch (e) {
    console.error("Something went wrong");
  }
};

boot();
