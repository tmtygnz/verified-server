import { ISession } from "../interface/ISession";

export class SessionProvider {
	static sessions: Array<ISession> = [];
	static newSession(sessionId: string) {
		let newSession: ISession = {
			sessionId: sessionId,
			publicKey: new Uint8Array(),
			secretKey: new Uint8Array(),
		};
		SessionProvider.sessions.push(newSession);
		return newSession;
	}

	static removeSession(sessionId: string) {
		let toDelete = SessionProvider.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toDelete > -1) SessionProvider.sessions.splice(toDelete, 1);
	}

	static setSecretKey(sessionId: string, publicKey: Uint8Array) {
		let toChange = SessionProvider.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toChange > -1) {
			SessionProvider.sessions[toChange].secretKey = publicKey;
		}
	}

	static getSecretKey(sessionId: string) {
		let session = SessionProvider.sessions.find((e) => e.sessionId == sessionId);
		if (session) {
			return session.secretKey;
		}
	}

	static setPublicKey(sessionId: string, publicKey: Uint8Array) {
		let toChange = SessionProvider.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toChange > -1) {
			SessionProvider.sessions[toChange].publicKey = publicKey;
		}
	}

	static getPublicKey(sessionId: string) {
		let session = SessionProvider.sessions.find((e) => e.sessionId == sessionId);
		if (session) {
			return session.publicKey;
		}
	}
}
