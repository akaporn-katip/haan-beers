import { useEffect } from "react";
import useLineLogin from "../hooks/useLineLogin";
import { signIn } from "next-auth/react";

export default function LineLoginButton() {
  const { provider, getLineProvider } = useLineLogin();

  useEffect(() => {
    getLineProvider();
  }, []);

  return (
    <button disabled={!provider} onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
      Login With Line
    </button>
  );
}
