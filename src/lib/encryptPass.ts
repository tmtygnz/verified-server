import nacl from "tweetnacl";
import naclut from "tweetnacl-util";
import { serverKeys, serverPrivateKey } from "./serverCrypto";

function generateNonce() {
	return nacl.randomBytes(nacl.box.nonceLength);
}

export function ecryptAes(data: string, webPublicKey: string) {
	try {
		const nonce = generateNonce();
		let encryptedData = nacl.box(
			naclut.decodeBase64(data),
			nonce,
			naclut.decodeBase64(webPublicKey),
			serverKeys.secretKey
		);

		console.log(
			naclut.encodeUTF8(
				nacl.box.open(
					encryptedData,
					nonce,
					naclut.decodeBase64(webPublicKey),
					serverKeys.secretKey
				)!
			)
		);
		return { nonce, encryptedData };
	} catch (e) {
		console.log(e);
	}
}
