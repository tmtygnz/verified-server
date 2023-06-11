import crypto, { createECDH } from "crypto";

export const serEnc = createECDH("secp384r1");

export const serEncPubKeyB64 = () => {
	serEnc.generateKeys();
	return serEnc.getPublicKey().toString("base64");
};
