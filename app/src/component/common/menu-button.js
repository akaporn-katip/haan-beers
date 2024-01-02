import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function MenuButton({ icon, children, to }) {
  return (
    <Link to={to}>
      <div className="flex flex-col items-center justify-center aspect-square h-[84px] text-white hover:bg-white/8 rounded-md p-2">
        <div className="text-4xl">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>{children}</div>
      </div>
    </Link>
  );
}
