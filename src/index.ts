import { fromByteArray } from "base64-js";
import { ecryptAes } from "./lib/encryptPass";
import { Session } from "./lib/session";
import { app, io, server } from "./lib/socketProvider";
import { registerHome } from "./routes/home";
import { serverPrivateKey, serverPublicKey } from "./lib/serverCrypto";
import nacl from "tweetnacl";
import naclut from "tweetnacl-util";

registerHome();

const sessionProvider = new Session();

io.on("connection", (socket) => {
	socket.on("session-pls", () => {
		let session = sessionProvider.newSession(socket.id);
		socket.emit("session-ok", session);
	});

	socket.on("exchange", (webPublicKey: string) => {
		const ecdhSecretKey = nacl.box.before(
			naclut.decodeBase64(webPublicKey),
			serverPrivateKey
		);

		sessionProvider.setSecretKey(socket.id, ecdhSecretKey);
		sessionProvider.setPublicKey(socket.id, naclut.decodeBase64(webPublicKey));

		socket.emit("re-exchange", naclut.encodeBase64(serverPublicKey));
	});

	socket.on("test", () => {
		let a = ecryptAes("hello world");
		socket.emit("re-test", a);
	});

	socket.on("disconnecting", () => {
		sessionProvider.removeSession(socket.id);
	});
});

server.listen(3001);
