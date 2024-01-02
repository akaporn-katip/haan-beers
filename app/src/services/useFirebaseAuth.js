import { signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { createCustomtoken } from "../firebase/function";
import { auth } from "../firebase/auth";
import { useState } from "react";

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  async function signIn(code) {
    try {
      const { data } = await createCustomtoken({
        code,
      });

      const result = await signInWithCustomToken(auth, data.customToken);

      setIsLogin(true);
      return result;
    } catch (error) {
      setIsLogin(false);
      throw error;
    }
  }

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return { signIn, isLogin, user };
}
