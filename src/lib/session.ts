import { ISession } from "../interface/ISession";

export class Session {
	sessions: Array<ISession>;
	constructor() {
		this.sessions = [];
	}

	newSession(sessionId: string) {
		let newSession: ISession = {
			sessionId: sessionId,
			publicKey: new Uint8Array(),
			secretKey: new Uint8Array(),
		};
		this.sessions.push(newSession);
		return newSession;
	}

	removeSession(sessionId: string) {
		let toDelete = this.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toDelete > -1) this.sessions.splice(toDelete, 1);
	}

	setSecretKey(sessionId: string, publicKey: Uint8Array) {
		let toChange = this.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toChange > -1) {
			this.sessions[toChange].secretKey = publicKey;
		}
	}

	getSecretKey(sessionId: string) {
		let session = this.sessions.find((e) => e.sessionId == sessionId);
		if (session) {
			return session.secretKey;
		}
	}

	setPublicKey(sessionId: string, publicKey: Uint8Array) {
		let toChange = this.sessions.findIndex(
			(session) => session.sessionId == sessionId
		);
		if (toChange > -1) {
			this.sessions[toChange].publicKey = publicKey;
		}
	}

	getPublicKey(sessionId: string) {
		let session = this.sessions.find((e) => e.sessionId == sessionId);
		if (session) {
			return session.publicKey;
		}
	}
}
