import { useEffect, useState } from "react";
import Modal from "../common/modal";
import FirendItem from "./friend-item";

export default function FriendSelectorModal({
  children,
  item,
  setPerson,
  initialValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [friendList, setFriendList] = useState([
    { id: "1", name: "1 Tip", range: [], amount: "" },
    { id: "2", name: "2 Np", range: [], amount: "" },
    { id: "3", name: "3 B", range: [], amount: "" },
  ]);
  const [selectedFriend, setSelectedFirend] = useState([...initialValue]);

  function isSelected(f_id) {
    return selectedFriend.map((f) => f.id).includes(f_id);
  }

  useEffect(() => {
    setSelectedFirend(initialValue)
  }, [initialValue])

  function handleChangeIsSelected(friend) {
    if (isSelected(friend.id)) {
      setSelectedFirend((prev) => {
        const clone = [...prev];
        const foundIndex = clone.findIndex((f) => f.id === friend.id);
        clone.splice(foundIndex, 1);
        return clone;
      });
    } else {
      setSelectedFirend((prev) => [...prev, friend]);
    }
  }

  function open() {
    setIsOpen(true);
  }

  function handleSetPerson() {
    setPerson(selectedFriend);
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`รายการ "${item.item_name}" มีใครบ้าง ?`}
        footer={() => (
          <>
            <button
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleSetPerson}
            >
              ตกลง
            </button>
          </>
        )}
      >
        <div className="flex flex-col divide-y overflow-scroll max-h-96">
          {friendList.map((friend) => (
            <FirendItem
              key={friend.id}
              checked={isSelected(friend.id)}
              onChange={() => handleChangeIsSelected(friend)}
            >
              <span className="font-bold">{friend.name}</span>
            </FirendItem>
          ))}
        </div>
      </Modal>
      {children(open)}
    </>
  );
}
