import { ISession } from "../interface/ISession";

export class Session {
  sessions: Array<ISession>;
  constructor() {
    this.sessions = [];
  }

  newSession() {
    let newSession: ISession = {
      userId: genRand(),
      sessionId: genRand(),
      publicKey: "",
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

  addPublicKey(sessionId: string, publicKey: string) {
    let toChange = this.sessions.findIndex(
      (session) => session.sessionId == sessionId
    );
    if (toChange > -1) {
      this.sessions[toChange].publicKey = publicKey;
    }
  }
}

const genRand = () => {
  return Math.random()
    .toString(36)
    .substring(2, 128 + 2);
};
