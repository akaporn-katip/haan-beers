"use client";
import ProductItems from "src/share/components/product/product-items";

export default function Item({ params }) {
  const billId = params.billId;
  return <ProductItems billId={billId} />;
}
