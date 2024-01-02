import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
export { signInWithCustomToken };

if (process.env.NODE_ENV === "development")
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
