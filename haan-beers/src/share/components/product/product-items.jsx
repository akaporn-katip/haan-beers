"use client";

import { useSelector } from "react-redux";
import { selectOneBill } from "src/features/bill/billSlice";
import { redirect, useRouter } from "next/navigation";
import ProductItem from "src/share/components/product/product-item";
import Card from "../card/card";
import Link from "next/link";

export default function ProductItems({ billId }) {
  const found = useSelector(selectOneBill(billId));

  if (!found) {
    redirect("/");
  }

  const friends = useSelector((state) => state.friends);

  const products = Object.values(found.products);
  const total = products.reduce((prev, curr) => prev + Number(curr.total), 0);
  const productElements = products.map((product) => (
    <ProductItem key={product.itemId} product={product} friends={friends} />
  ));

  const editBill = () => {

  }

  return (
    <div className="flex flex-col gap-2 my-2">
      <Card sticky={true}>
        <Card.Title>
          <div className="flex justify-between items-center">
            <span>รวม {total} บาท</span>
            <Link href={`/bill/${billId}/item/add`}>
              <button className="btn btn-submit">เพิ่มรายการ</button>
            </Link>
          </div>
        </Card.Title>
      </Card>
      {productElements}
      <button className="btn btn-cancel">แก้ไขบิล</button>
      <button className="btn btn-primary">สรุปบิล</button>
    </div>
  );
}
