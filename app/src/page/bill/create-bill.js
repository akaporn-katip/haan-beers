import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import ItemEditor from "../../component/order-line/item-editor";
import Divider from "../../component/common/divider";
import { useNavigate } from "react-router-dom";
import { calculate_item } from "../../lib/calculate";
import useBill from "../../services/useBill";
import { Helmet } from "react-helmet";

export default function CreateBillPage() {
  const bill_name_ref = useRef();
  const navigate = useNavigate();
  const {
    saveBill,
    billName,
    setBillName,
    orderLine,
    setOrderLine,
    addItem,
    summary,
  } = useBill();

  function updateItem(index) {
    return function (current) {
      setOrderLine((prev) => {
        const clone = [...prev];
        const calculated_item = calculate_item(current(clone[index]));
        clone.splice(index, 1, {
          ...current(clone[index]),
          is_rounded: calculated_item.is_rounded,
          price: calculated_item.price,
          actual_price: calculated_item.actual_price,
          person: calculated_item.person,
        });
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

  function handleChangeBillName(e) {
    setBillName(e.target.value);
  }

  function handleSaveBill() {
    saveBill().then((id) => {
      navigate(`/${id.join("/")}`);
    });
  }

  useEffect(() => {
    bill_name_ref.current.focus();
  }, []);

  return (
    <>
      <Helmet>
        <title>สร้างบิล</title>
      </Helmet>
      <div className="flex flex-col bg-white px-2 rounded-t-md">
        <div className="w-full">
          <input
            ref={bill_name_ref}
            className="w-full font-bold text-4xl h-16 focus:outline-none"
            placeholder="ใส่ชื่อบิล..."
            maxLength={30}
            value={billName}
            onChange={handleChangeBillName}
          />
        </div>
      </div>
      <div className="flex justify-end bg-white text-3xl p-2">
        รวม {summary.summary} บาท
      </div>
      <div className="bg-white">
        <Divider>รายการ</Divider>
      </div>
      <div className="flex justify-center py-4 bg-white">
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
        <button
          className="flex-grow bg-primary w-full h-16"
          onClick={handleSaveBill}
        >
          submit
        </button>
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
