import MainLayout from "../../layout/main-layout";
import useFirebaseAuth from "../../services/useFirebaseAuth";
import AnonymousLoginButton from "../common/anonymous-login-btn";
import LineLoginButton from "../common/line-login-btn";

export default function LoginForm() {
  const { isAllowAnonymous, anonymouslyLogin } = useFirebaseAuth();

  return (
    <MainLayout>
      <div className="flex flex-col space-y-2">
        <LineLoginButton />
        {isAllowAnonymous ? <AnonymousLoginButton onClick={anonymouslyLogin} /> : null}
      </div>
    </MainLayout>
  );
}
