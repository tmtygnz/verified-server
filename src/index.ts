import { Session } from "./lib/session";
import { app, io, server } from "./lib/socketProvider";
import { registerHome } from "./routes/home";

registerHome();

const sessionProvider = new Session();

io.on("connection", (socket) => {
  console.log("connected ", socket.id);
  socket.on("session-new", () => {
    socket.emit("session-here", sessionProvider.newSession());
  });
});

server.listen(3001);
