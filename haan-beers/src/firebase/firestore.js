import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", "8080");
