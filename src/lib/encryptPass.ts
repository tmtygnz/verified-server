import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { serverKeys, serverPrivateKey } from "./serverCrypto";
import { server } from "./socketProvider";

function generateNonce() {
	return nacl.randomBytes(nacl.secretbox.nonceLength);
}

export function encryptNacl(data: string, shared: Uint8Array) {
	const nonce = generateNonce();
	let encryptedData = nacl.secretbox(
		Uint8Array.from(data, (c) => c.charCodeAt(0)),
		nonce,
		shared
	);

	console.log("encrypted message sent: ", data);

	return {
		nonce: naclut.encodeBase64(nonce),
		encrypted: naclut.encodeBase64(encryptedData),
	};
}
