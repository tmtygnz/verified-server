import crypto from "crypto";

export const encryptAES = (data: string, key: string) => {
	let iv = crypto.randomBytes(12);
	let sha = crypto.createHash("sha256");
	sha.update(key);

	let cipher = crypto.createCipheriv("chacha20-poly1305", sha.digest(), iv);
	let ch = cipher.update(data);
	let encrypted = Buffer.concat([iv, ch, cipher.final()]).toString("base64");
	return { iv: iv, encrypted };
};
