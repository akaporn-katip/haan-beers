import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ItemEditor from "../../component/order-line/item-editor";
import Divider from "../../component/common/divider";
import { useNavigate } from "react-router-dom";

export default function CreateBillPage() {
  const bill_name_ref = useRef();
  const navigate = useNavigate();
  const [orderLine, setOrderLine] = useState([]);

  function addItem() {
    setOrderLine((prev) => [
      ...prev,
      {
        item_name: "",
        type: "equality",
        price: "",
        summary: "",
        unit: "Baht",
        person: [],
      },
    ]);
  }

  function updateItem(index) {
    return function (item) {
      setOrderLine((prev) => {
        const clone = [...prev];
        clone.splice(index, 1, item(clone[index]));
        return clone;
      });
    };
  }

  function removeItem(index) {
    return function () {
      setOrderLine((prev) => {
        const clone = [...prev];
        clone.splice(index, 1);
        return clone;
      });
    };
  }

  useEffect(() => {
    bill_name_ref.current.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-white px-2 rounded-t-md">
        <div className="w-full">
          <input
            ref={bill_name_ref}
            className="w-full font-bold text-4xl h-16 focus:outline-none"
            placeholder="ใส่ชื่อบิล..."
            maxLength={30}
          />
        </div>
        <Divider>รายการ</Divider>
        <div className="flex justify-center py-4">
          <button
            className="py-1 px-2 rounded-lg outline outline-2 
        outline-create-item-button-outline 
        text-create-item-button-outline 
        hover:bg-create-item-button-hover 
        active:bg-create-item-button-active"
            onClick={addItem}
          >
            <FontAwesomeIcon icon={faPlus} /> เพิ่มรายการ
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-white space-y-2 p-2">
        {orderLine.map((order, idx) => (
          <ItemEditor
            key={idx}
            initialValue={order}
            updateItem={updateItem(idx)}
            removeItem={removeItem(idx)}
          />
        ))}
      </div>
      <div className="flex flex-row text-white sticky bottom-0">
        <button className="flex-grow bg-primary w-full h-16">submit</button>
        <button
          className="flex-1 bg-danger w-full h-16 px-14"
          onClick={() => {
            navigate("/");
          }}
        >
          cancel
        </button>
      </div>
    </>
  );
}
