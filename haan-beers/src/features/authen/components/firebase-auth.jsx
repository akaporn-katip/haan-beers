"use client";

import { signInWithCustomToken } from "firebase/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";

export default function FirebaseAuth({ children, loading, unauthenticated }) {
  const { data } = useSession();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function signin() {
      const customtoken = data.user.customtoken;
      
      const success = await signInWithCustomToken(auth, customtoken)
        .then(() => true)
        .catch(() => false);
      if (success) {
        setStatus("authenticated");
        return;
      }

      setStatus("unauthenticated");
    }

    if (data) {
      signin();
    } else {
      setStatus("unauthenticated");
    }
  }, [data]);
  if (status === "unauthenticated") {
    return <>{unauthenticated}</>;
  }

  if (status === "loading") {
    return <>{loading}</>;
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }
}
