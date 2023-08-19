"use client";

import AppBar from "src/features/appbar/components/appbar";
import FirebaseAuth from "src/features/authen/components/firebase-auth";
import LineLoginButton from "src/features/line-login/components/line-login-btn";
import Navigation from "src/share/components/navigation/navigation";

function Unauthenticated() {
  return (
    <div className="container mx-auto px-8">
      <LineLoginButton />
    </div>
  );
}

function Loading() {
  return <div className="container mx-auto px-8">loading...</div>;
}

export default function SecureLayout({ children }) {
  return (
    <>
      <FirebaseAuth unauthenticated={<Unauthenticated />} loading={<Loading />}>
        <AppBar></AppBar>
        <div className="layout">
          <div className="nav">
            <Navigation>
              <Navigation.Item to="/">
                แดชบอร์ด
              </Navigation.Item>
              <Navigation.Item to="/statics">
                สถิติ
              </Navigation.Item>
              <Navigation.Item to="/bill">
                จัดการบิล
              </Navigation.Item>
              <Navigation.Item to="/my-bill">
                รายการที่ฉันต้องจ่าย
              </Navigation.Item>
              <Navigation.Item to="/friends">
                เพื่อน
              </Navigation.Item>
            </Navigation>
          </div>
          <div className="main">{children}</div>
          <div className="empty"></div>
        </div>
      </FirebaseAuth>
    </>
  );
}
