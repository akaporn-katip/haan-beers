"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

export default function AppBar() {
  const { data, status } = useSession();
  if (status === "authenticated")
    return (
      <div className="appbar-container flex">
        <div className="flex-1 flex items-center">
          <FaBars size={24} />
        </div>
        <div className="flex-1 flex items-center justify-center text-3xl">หารเบียร์</div>
        <div className="flex-1 flex items-center justify-end">
          <Image
            className="rounded-full ring-4 ring-black"
            src={data.user.image}
            alt={data.user.name}
            width={56}
            height={56}
            priority={true}
          />
        </div>
      </div>
    );

  if (status === "loading") {
    return <div className="appbar-container"></div>;
  }

  return (
    <div className="appbar-container">
    </div>
  );
}
