"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createBill } from "/src/features/bill/billSlice";
import Form from "src/features/bill/components/form";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 8);

export default function CreateBill() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateBill = (bill) => {
    dispatch(createBill(bill));
    router.push(`/bill/${bill.id}/item`);
  };

  const handleCancelBill = (bill) => {
    router.push("/");
  };

  const friends = useSelector((state) => state.friends);
  const form = {
    id: nanoid(),
    title: "",
    participants: {},
    products: {},
    active: true,
  };

  return (
    <Form
      form={form}
      onSubmit={handleCreateBill}
      onCancel={handleCancelBill}
      friends={friends}
    />
  );
}
