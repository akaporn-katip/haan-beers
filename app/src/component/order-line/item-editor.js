import {
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendSelectorModal from "../friend/friend-selector-modal";

const FriendComponent = function ({ item, person, updatePerson }) {
  function handleUpdatePerson(e) {
    updatePerson((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  }

  return (
    <>
      <div>
        <input
          className="text-left w-full border-b-2 border-dashed "
          defaultValue={person.name}
          readOnly
        />
      </div>
      <div>
        <input
          className="text-right w-full border-b-2 border-dashed bg-friend-list-bg"
          value={person.amount}
          onChange={handleUpdatePerson}
          readOnly={item.type === "equality"}
          inputMode="numeric"
          placeholder={item.type === "adjust" ? "ใส่ราคา" : ""}
        />
      </div>
    </>
  );
};

export default function ItemEditor({ initialValue, updateItem, removeItem }) {
  function handleUpdateItem(e) {
    updateItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleTypeChange(e) {
    updateItem((prev) => ({
      ...prev,
      type: e.target.value,
      unit: e.target.value === "ratio" ? "Baht/Unit" : "Baht",
    }));
  }

  // eslint-disable-next-line no-unused-vars
  function handleAddPeople() {
    updateItem((prev) => ({
      ...prev,
      person: [...prev.person, { name: "", amount: "0.00" }],
    }));
  }

  function handleSetPerson(person) {
    updateItem((prev) => ({
      ...prev,
      person: [...person],
    }));
  }

  function updatePerson(index) {
    return function (value) {
      updateItem((prev) => {
        const clone = [...prev.person];
        clone.splice(index, 1, value(clone[index]));
        return {
          ...prev,
          person: clone,
        };
      });
    };
  }

  return (
    <div className="relative border border-1 border-gray-300">
      <div className="absolute top-3 right-3">
        <button className="text-red-500" onClick={removeItem}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-2 p-2">
        <div className="col-span-2">
          <input
            name="item_name"
            className="w-full text-xl"
            value={initialValue.item_name}
            onChange={handleUpdateItem}
            placeholder="ใส่ชื่อรายการ..."
            maxLength={20}
            autoComplete={"off"}
          />
        </div>
        <div className="flex items-start text-xl">เลือกวิธีคำนวณ</div>
        <div className="flex flex-col">
          <label className="flex items-center text-xl">
            <input
              className="accent-primary"
              type="radio"
              value="equality"
              checked={initialValue.type === "equality"}
              onChange={handleTypeChange}
            />
            หารเท่า
          </label>

          <label className="flex items-center text-xl">
            <input
              className="accent-primary"
              type="radio"
              value="adjust"
              checked={initialValue.type === "adjust"}
              onChange={handleTypeChange}
            />
            กำหนดเอง
          </label>

          <label className="flex items-center text-xl">
            <input
              className="accent-primary"
              type="radio"
              value="ratio"
              checked={initialValue.type === "ratio"}
              onChange={handleTypeChange}
            />
            สัดส่วน
          </label>
        </div>
        <div>
          <input
            name="price"
            inputMode="numeric"
            className="w-full text-xl text-right"
            value={initialValue.price}
            onChange={handleUpdateItem}
            placeholder="ราคา"
            readOnly={initialValue.type === "adjust"}
          />
        </div>
        <div className="flex items-center text-xl">{initialValue.unit}</div>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-2 p-2 rounded-sm bg-friend-list-bg gap-2">
        <div>ชื่อ</div>
        <div className="text-right">ราคา/ช่วง</div>
        {initialValue.person.map((person, idx) => (
          <FriendComponent
            key={person.id}
            item={initialValue}
            person={person}
            updatePerson={updatePerson(idx)}
          />
        ))}
        <div className="col-span-2 flex justify-end">
          <FriendSelectorModal
            item={initialValue}
            initialValue={initialValue.person}
            setPerson={handleSetPerson}
          >
            {(open) => (
              <button
                className="py-1 px-2 rounded-lg outline outline-2 
        outline-create-item-button-outline 
        text-create-item-button-outline 
        hover:bg-create-item-button-hover 
        active:bg-create-item-button-active"
                onClick={open}
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            )}
          </FriendSelectorModal>
        </div>
      </div>
    </div>
  );
}
