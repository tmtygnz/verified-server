import forge from "node-forge";

export const encryptAES = (data: string, keyf: string) => {
	var key = keyf;

	// Generate random IV
	var iv = forge.random.getBytesSync(16);

	// Create cipher using AES-CBC mode
	var cipher = forge.cipher.createCipher(
		"AES-CBC",
		forge.util.createBuffer(key)
	);
	cipher.start({ iv: iv });
	cipher.update(forge.util.createBuffer(data));
	cipher.finish();

	// Get the encrypted bytes
	var encrypted = cipher.output;

	// Combine IV and encrypted data
	var combined = forge.util.createBuffer();
	combined.putBytes(iv);
	combined.putBuffer(encrypted);

	// Return base64-encoded encrypted data
	let b64enc = forge.util.encode64(combined.getBytes());
	return { iv, encrypted: b64enc };
};
