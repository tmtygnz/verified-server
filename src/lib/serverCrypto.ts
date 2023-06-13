import nacl from "tweetnacl";
import { server } from "./socketProvider";

export const serverKeys = nacl.box.keyPair();
export const serverPrivateKey = serverKeys.secretKey;
export const serverPublicKey = serverKeys.publicKey;
