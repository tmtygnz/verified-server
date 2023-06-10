import { app, io, server } from "./lib/socketProvider";
import { registerHome } from "./routes/home";

registerHome();

io.on("connection", () => {
  console.log("connected");
});

server.listen(3000);
