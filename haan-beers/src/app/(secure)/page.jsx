"use client";
import MyBill from "src/features/bill/components/my-bill";
import Card from "src/share/components/card/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Card>
        <Card.Title>
          <Link href="/bill">
            <button className="btn btn-submit">สร้างบิล</button>
          </Link>
        </Card.Title>
      </Card>
      <MyBill />
    </div>
  );
}
