import User from "src/share/components/user/user";
import { FaCheckCircle } from "react-icons/fa";

export default function InputUser({ user, checked, onCheck, uniqueKey }) {
  return (
    <div
      id={user[uniqueKey]}
      className="flex gap-4 justify-start items-center hover:cursor-pointer"
      onClick={() => onCheck(user[uniqueKey])}
    >
      <FaCheckCircle
        size={"1.5rem"}
        className={checked ? "text-saffron-500" : "text-saffron-300"}
      />
      <User user={user} />
    </div>
  );
}
