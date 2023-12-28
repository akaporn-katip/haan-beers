import { Outlet } from "react-router-dom";
import AppBar from "../component/common/appbar";


export default function MainLayout() {
  return (
    <>
      <div className="container">
        <AppBar />
        <Outlet />
      </div>
    </>
  );
}
