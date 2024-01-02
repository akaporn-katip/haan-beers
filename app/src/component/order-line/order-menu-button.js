import { faHome } from "@fortawesome/free-solid-svg-icons";
import MenuButton from "../common/menu-button";

export default function OrderMenuButton() {
  return (
    <MenuButton to={"/"} icon={faHome}>
      หน้าหลัก
    </MenuButton>
  );
}
