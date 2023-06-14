import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SessionProvider } from "../lib/sessionProvidider";

export default function sessionHandlerSocket(socket: Socket<DefaultEventsMap>) {
	socket.on("session-pls", () => {
		console.log("hit");
		let session = SessionProvider.newSession(socket.id);
		socket.emit("session-ok", session);
	});

	socket.on("disconnecting", () => {
		SessionProvider.removeSession(socket.id);
	});
}
