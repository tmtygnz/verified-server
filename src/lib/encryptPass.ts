import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { serverKeys, serverPrivateKey } from "./serverCrypto";
import { server } from "./socketProvider";

function generateNonce() {
	return nacl.randomBytes(nacl.secretbox.nonceLength);
}

export function ecryptAes(data: string) {
	try {
		const nonce = generateNonce();
		let encryptedData = nacl.secretbox(
			Uint8Array.from(data, (c) => c.charCodeAt(0)),
			nonce,
			serverKeys.secretKey
		);

		// console.log(
		// 	naclut.encodeUTF8(
		// 		nacl.secretbox.open(encryptedData, nonce, serverKeys.secretKey)!
		// 	)
		// );

		console.log({
			data: Uint8Array.from(data, (c) => c.charCodeAt(0)),
			nonce: nonce,
			secret: serverKeys.secretKey,
		});

		return {
			nonce: naclut.encodeBase64(nonce),
			encrypted: naclut.encodeBase64(encryptedData),
		};
	} catch (e) {
		console.log(e);
	}
}
