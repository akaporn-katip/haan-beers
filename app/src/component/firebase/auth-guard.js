import useFirebaseAuth from "../../services/useFirebaseAuth";
import LoginForm from "../login/login-form";

export default function AuthGuard({ children }) {
  const { isLogin } = useFirebaseAuth();
  if (!isLogin) return <LoginForm />;
  return <>{children}</>;
}
