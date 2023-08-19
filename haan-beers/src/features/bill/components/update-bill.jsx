"use client";

import { redirect, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBill,
  cancelBill,
  selectOneBill,
} from "/src/features/bill/billSlice";
import Form from "@/components/bill/form";

export default function UpdateBill({ id }) {
  const found = useSelector(selectOneBill(id));
  if (!found) {
    redirect("/");
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const handleUpdateBill = (bill) => {
    dispatch(updateBill(bill));
    router.push(`/bill/${bill.id}/item`);
  };

  const handleCancelBill = (bill) => {
    dispatch(cancelBill(bill));
  };

  const friends = useSelector((state) => state.friends);

  return (
    <Form
      form={found}
      onSubmit={handleUpdateBill}
      onCancel={handleCancelBill}
      friends={friends}
    />
  );
}
