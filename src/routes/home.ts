import { fastify } from "../lib/fastifyProvider";

export const registerHome = () => {
  fastify.get("/home", async () => {
    return "bruh";
  });
};
