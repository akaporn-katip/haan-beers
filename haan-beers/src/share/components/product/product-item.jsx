import Card from "src/share/components/card/card";
import User from "src/share/components/user/user";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeProduct } from "src/features/bill/billSlice";

export default function ProductItem({ product }) {
  const participants = Object.values(product.participants);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeProduct(product));
  };
  return (
    <Card>
      <Card.Title>
        <div className="w-full inline-flex justify-between">
          <span>{product.name}</span>
          <span>{product.total | 0} บาท</span>
        </div>
      </Card.Title>
      <Card.Body>
        <div className="flex flex-col gap-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="inline-flex items-center justify-between"
            >
              <User user={participant} />
              <span className="text-2xl">{participant.total | 0} บาท</span>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Action>
        <div className="flex justify-between gap-2">
          <Link  href={`/bill/${product.billId}/item/edit/${product.itemId}`}>
            <button className="btn btn-submit">แก้ไข</button>
          </Link>
          <button className="btn btn-cancel" onClick={handleRemove}>
            ลบ
          </button>
        </div>
      </Card.Action>
    </Card>
  );
}
