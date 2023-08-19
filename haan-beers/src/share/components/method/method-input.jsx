"use client";
import Card from "src/share/components/card/card";
import { useState } from "react";
import DynamicMethodForm from "./dynamic-method-form";
import { useSelector, createSelectorHook, useDispatch } from "react-redux";
import { selectOneProduct, updateProduct } from "src/features/bill/billSlice";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function MethodInput({ billId, itemId }) {
  const product = useSelector(selectOneProduct({billId, itemId}));
  if (!product) {
    redirect("/");
  }

  const [method, setMethod] = useState("custom");

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const dispatch = useDispatch();
  const route = useRouter();
  const handleFormChange = (_product) => {
    dispatch(updateProduct(_product));

    // http://localhost:3000/bill/egusx7jh/item/edit/0kgttb1l/method
    route.push(`/bill/${_product.billId}/item`);
  }

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <Card.Title>
          {product.name}
        </Card.Title>
      </Card>
      <Card>
        <Card.Title>
          <select className="bg-white-smoke" onChange={handleMethodChange}>
            <option value="custom">กำหนดเอง</option>
            <option value="proportions">หารแบ่งตามสัดส่วน</option>
          </select>
        </Card.Title>
      </Card>
      <DynamicMethodForm method={method} product={product} onSubmit={handleFormChange}  />
    </div>
  );
}
