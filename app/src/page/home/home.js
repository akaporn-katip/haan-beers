import { Outlet } from "react-router-dom";
import FriendMenuButton from "../../component/friend/friend-menu-button";
import OrderMenuButton from "../../component/order-line/order-menu-button";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-2 mx-2">
      <div className="flex">
        <OrderMenuButton />
        <FriendMenuButton />
      </div>
      <Outlet />
    </div>
  );
}
