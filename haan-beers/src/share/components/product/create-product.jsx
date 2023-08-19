"use client";

import ProductForm from "./product-form";
import { useSelector, useDispatch } from "react-redux";
import { selectOneBill, addProduct } from "src/features/bill/billSlice";
import { redirect } from "next/navigation";
import ID from "src/share/utils/id";
import { useRouter } from "next/navigation";

export default function CreateProduct({ billId }) {
  const bill = useSelector(selectOneBill(billId));

  if (!bill) {
    redirect("/bill");
  }

  const route = useRouter();
  const dispatch = useDispatch();
  const addProductHandler = (product) => {
    dispatch(addProduct(product));
    route.push(`/bill/${billId}/item/edit/${product.itemId}/method`);
  };

  const onBack = () => {
    route.back();
  };

  const initialForm = {
    billId,
    itemId: ID(),
    name: "",
    method: "",
    participants: bill.participants,
    total: 0,
    active: true,
  };

  const friends = [...Object.values(bill.participants)];
  return (
    <ProductForm
      form={initialForm}
      onSubmit={addProductHandler}
      onBack={onBack}
      friends={friends}
    ></ProductForm>
  );
}
