import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { encryptNacl } from "../lib/encryptPass";
import { SessionProvider } from "../lib/sessionProvidider";

export function pingPongSocket(socket: Socket<DefaultEventsMap>) {
	console.log(SessionProvider.getSecretKey(socket.id));
	socket.on("ping", () => {
		socket.emit(
			"pong",
			encryptNacl("ping pong", SessionProvider.getSecretKey(socket.id)!)
		);
	});
}
