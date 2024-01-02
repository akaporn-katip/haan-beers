import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";
import { app } from "./firebase";

export const functions = getFunctions(app, "asia-east1");
if (process.env.NODE_ENV === "development")
  connectFunctionsEmulator(functions, "127.0.0.1", "5001");

export const createCustomtoken = httpsCallable(functions, "createCustomtoken");
