import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { serverPrivateKey, serverPublicKey } from "../lib/serverCrypto";
import { SessionProvider } from "../lib/sessionProvidider";

export default function diffieHellmanSocket(
	socket: Socket<DefaultEventsMap, any>
) {
	socket.on("exchange", (webPublicKey: Uint8Array) => {
		const ecdhSecretKey = nacl.box.before(webPublicKey, serverPrivateKey);
		SessionProvider.setSecretKey(socket.id, ecdhSecretKey);
		SessionProvider.setPublicKey(socket.id, webPublicKey);

		console.log("computed Shared Key: ", naclut.encodeBase64(ecdhSecretKey));

		socket.emit("re-exchange", serverPublicKey);
	});
}
