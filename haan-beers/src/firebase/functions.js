import { getApp } from "firebase/app";
import { auth, app } from "./firebase";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";

const functions = getFunctions(getApp(), "asia-east1");
connectFunctionsEmulator(functions, "127.0.0.1", "5001");

export const createCustomtoken = httpsCallable(functions, "createCustomtoken");
