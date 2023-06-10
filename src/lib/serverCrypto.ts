import crypto from "crypto";

export const cryptoServer = crypto.getDiffieHellman("modp18");
export const keys = cryptoServer.generateKeys();