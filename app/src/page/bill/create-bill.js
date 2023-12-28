import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

export default function CreateBillPage() {
  const bill_name_ref = useRef();

  useEffect(() => {
    bill_name_ref.current.focus();
  }, []);

  return (
    <div className="flex flex-col bg-white px-2 rounded-md divide-y-2">
      <div className="w-full">
        <input
          ref={bill_name_ref}
          className="w-full font-bold text-4xl h-16 focus:outline-none"
          placeholder="ชื่อบิล..."
          maxLength={30}
        />
      </div>
      <div className="flex justify-center py-4">
        <button
          className="py-1 px-2 rounded-lg outline outline-2 
        outline-create-item-button-outline 
        text-create-item-button-outline 
        hover:bg-create-item-button-hover 
        active:bg-create-item-button-active"
        >
          <FontAwesomeIcon icon={faPlus} /> เพิ่มรายการ
        </button>
      </div>
    </div>
  );
}
