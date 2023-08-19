"use client";

import Card from "src/share/components/card/card";
import { useState } from "react";
import Friend from "src/features/friend/components/friend";

export default function Form(props) {
  const [bill, setBill] = useState(props.form);

  const handleInput = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setBill({
      ...bill,
      participants: e,
    });
  };

  return (
    <Card>
      <Card.Title>
        <input
          type="text"
          className="bg-white-smoke focus:outline-none"
          placeholder="ชื่อบิล..."
          name="title"
          defaultValue={bill.title}
          onInput={(e) => handleInput(e)}
          readOnly={props.readOnly}
        />
      </Card.Title>
      <Card.Body>
        <Friend
          friends={props.friends}
          defaultSelected={bill.participants}
          onSelect={(e) => handleSelect(e)}
        ></Friend>
      </Card.Body>
      <Card.Action>
        <div className="flex justify-between">
          <button
            className="btn btn-submit"
            color="btn-submit"
            onClick={() => props.onSubmit(bill)}
          >
            บันทึก
          </button>

          <button
            className="btn btn-cancel"
            onClick={() => props.onCancel(bill)}
          >
            ยกเลิก
          </button>
        </div>
      </Card.Action>
    </Card>
  );
}
