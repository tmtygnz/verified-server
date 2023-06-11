import { encryptAES } from "./lib/encryptPass";
import { serEnc, serEncPubKeyB64 } from "./lib/serverCrypto";
import { Session } from "./lib/session";
import { app, io, server } from "./lib/socketProvider";
import { registerHome } from "./routes/home";

registerHome();

const sessionProvider = new Session();

io.on("connection", (socket) => {
	socket.on("session-pls", () => {
		let session = sessionProvider.newSession(socket.id);
		socket.emit("session-ok", session);
	});

	socket.on("exchange", (webEncPubKeyB64: string) => {
		socket.emit("re-exchange", serEncPubKeyB64());
		const sharedKey = serEnc.computeSecret(webEncPubKeyB64, "base64", "hex");
		sessionProvider.setSharedKey(socket.id, sharedKey);
		console.log(sessionProvider.sessions);
	});

	socket.on("test", () => {
		let a = encryptAES("abc", sessionProvider.getSharedKey(socket.id)!);
		console.log(a);
		socket.emit("re-test", a);
	});

	socket.on("disconnecting", () => {
		sessionProvider.removeSession(socket.id);
		console.log(sessionProvider.sessions);
	});
});

server.listen(3001);
