import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function User({ user }) {
  return (
    <div className="flex gap-4 justify-start items-center">
      <Image
        className="rounded-full select-none"
        src={user.avatar}
        width={56}
        height={56}
        alt={user.id}
      />
      <div className="text-2xl flex-1 flex flex-col select-none">{user.id}</div>
    </div>
  );
}
