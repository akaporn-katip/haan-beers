import useFirebaseAuth from "../../services/useFirebaseAuth";
import LineLoginButton from "../common/line-login-btn";

export default function VerifyLogin({ children }) {
  const { isLogin } = useFirebaseAuth();

  if (!isLogin)
    return (
      <>
        <LineLoginButton />
      </>
    );
  return <>{children}</>;
}
