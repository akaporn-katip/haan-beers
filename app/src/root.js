import { Outlet } from "react-router-dom";
import RootLayout from "./root-layout";

export default function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
