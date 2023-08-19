import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation({ children }) {
  return (
    <div className="sidebar-container">
      <div className="grid gap-2 grid-cols-1">{children}</div>
    </div>
  );
}

Navigation.Item = function Item({ children, to, icon }) {
  const pathname = usePathname();

  function isMatch() {
    const matchRex = new RegExp(`^${to}(?:\/.*|)$`, "g");
    return matchRex.test(pathname);
  }

  const activeClassName = isMatch() ? "bg-saffron-500" : "hover:bg-saffron-300";
  return (
    <Link
      className={`p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer ${activeClassName}`}
      href={to}
    >
      {/* <i className="bi bi-house-door-fill"></i> */}
      <i>{icon}</i>
      <span className="text-[15px] ml-4 text-black font-bold">{children}</span>
    </Link>
  );
};
