import Card from "src/share/components/card/card";
import Friend from "../../../features/friend/components/friend";
import { useState } from "react";

export default function ProductForm({ form, onSubmit, friends, onBack }) {
  const [product, setProduct] = useState(form);

  const participants = friends;

  const handleInput = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (participants) => {
    setProduct((prev) => ({
      ...prev,
      participants,
    }));
  };

  return (
    <div className="my-2">
      <Card>
        <Card.Title>
          <input
            type="text"
            placeholder="รายการ"
            name="name"
            defaultValue={product.name}
            onInput={handleInput}
            className="bg-white-smoke focus:outline-none"
            readOnly={false}
          />
        </Card.Title>
        <Card.Body>
          <div className="flex flex-col gap-4">
            <span>เลือกคนที่ต้องหารรายการนี้</span>
            <Friend
              friends={participants}
              defaultSelected={product.participants}
              onSelect={handleSelect}
            ></Friend>
          </div>
        </Card.Body>
        <Card.Action>
          <div className="flex justify-between">
            <button
              className="btn btn-submit"
              onClick={() => {
                onBack();
              }}
            >
              กลับ
            </button>
            <button
              className="btn btn-submit"
              onClick={() => onSubmit(product)}
            >
              ถัดไป
            </button>
          </div>
        </Card.Action>
      </Card>
    </div>
  );
}
