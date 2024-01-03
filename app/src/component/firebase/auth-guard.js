import useFirebaseAuth from "../../services/useFirebaseAuth";
import LineLoginButton from "../common/line-login-btn";

export default function AuthGuard({ children }) {
  const { isLogin } = useFirebaseAuth();

  if (!isLogin)
    return (
      <>
        <LineLoginButton />
      </>
    );
  return <>{children}</>;
}
