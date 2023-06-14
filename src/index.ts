import { fromByteArray } from "base64-js";
import { encryptNacl } from "./lib/encryptPass";
import { SessionProvider } from "./lib/sessionProvidider";
import { app, io, server } from "./lib/socketProvider";
import { registerHome } from "./routes/home";
import { serverPrivateKey, serverPublicKey } from "./lib/serverCrypto";
import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import diffieHellmanSocket from "./routes/diffieHellman";
import sessionHandle from "./routes/sessionHandler";
import sessionHandlerSocket from "./routes/sessionHandler";
import { pingPongSocket } from "./routes/pingPong";

registerHome();

io.on("connection", (socket) => {
	sessionHandlerSocket(socket);

	diffieHellmanSocket(socket);

	pingPongSocket(socket);

	socket.on("test", () => {
		let a = encryptNacl(`asd`, SessionProvider.getSecretKey(socket.id)!);
		socket.emit("re-test", a);
	});
});

server.listen(3001);
