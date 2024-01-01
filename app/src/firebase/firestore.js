import { app } from "./firebase";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export const db = getFirestore(app);
if (process.env.NODE_ENV === "development")
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
