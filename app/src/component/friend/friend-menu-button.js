import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import MenuButton from "../common/menu-button";

export default function FriendMenuButton() {
  return (
    <MenuButton to={"friend"} icon={faUserCircle}>
      จัดการคน
    </MenuButton>
  );
}
