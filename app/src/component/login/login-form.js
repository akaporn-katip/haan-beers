import MainLayout from "../../layout/main-layout";
import useFirebaseAuth from "../../services/useFirebaseAuth";
import AnonymousLoginButton from "../common/anonymous-login-btn";
import Header from "../common/header";
import LineLoginButton from "../common/line-login-btn";

export default function LoginForm() {
  const { isAllowAnonymous, anonymouslyLogin } = useFirebaseAuth();

  return (
    <MainLayout>
      <Header>
        <title>เข้าสู่ระบบ</title>
      </Header>
      <div className="flex flex-col  justify-center space-y-2">
        <div className="flex flex-col justify-between p-4 bg-white rounded-md h-64 space-y-2">
          <div className="text-3xl text-center">เข้าสู่ระบบ</div>
          <LineLoginButton />
          {isAllowAnonymous ? (
            <AnonymousLoginButton onClick={anonymouslyLogin} />
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}
