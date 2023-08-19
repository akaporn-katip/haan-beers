"use client";

import BillItem from "src/features/bill/components/bill-item";
import { useSelector } from "react-redux";
// import { selectAllBill } from "src/features/bill/billSlice";

export default function MyBill() {
  // const bills = Object.values(useSelector(selectAllBill));
  const bills = [];
  return (
    <div className="flex flex-col gap-2">
      {bills.map((b) => (
        <BillItem form={b} key={b.id} />
      ))}
    </div>
  );
}
