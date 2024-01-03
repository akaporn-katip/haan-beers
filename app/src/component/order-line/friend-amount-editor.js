import { useEffect, useState } from "react";

export default function FriendAmountEditor({
  item,
  person,
  handleUpdatePerson,
}) {
  const [from, to] = person.range;
  const [range, setRange] = useState({ from, to });

  function handleUpdatePersonAmount(e) {
    handleUpdatePerson((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  }

  function handleUpdateRange(key) {
    return function (e) {
      setRange((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  function handleUpdatePersonRange(from, to) {
    handleUpdatePerson((prev) => ({
      ...prev,
      range: [from, to],
    }));
  }

  useEffect(() => {
    handleUpdatePersonRange(range.from, range.to);
  }, [range]);

  return (
    <>
      <div>
        <input
          className="text-left w-full border-b-2 border-dashed "
          defaultValue={person.name}
          readOnly
        />
      </div>
      {item.type !== "ratio" ? (
        <div>
          <input
            className="text-right w-full border-b-2 border-dashed bg-friend-list-bg"
            value={person.amount}
            onChange={handleUpdatePersonAmount}
            readOnly={item.type === "equality"}
            inputMode="numeric"
            placeholder={item.type === "adjust" ? "ใส่ราคา" : ""}
          />
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <input
                value={range.from}
                onChange={handleUpdateRange("from")}
                className="border-b-2 border-dashed w-full"
                placeholder="from"
              />
            </div>
            <div>
              <input
                value={range.to}
                onChange={handleUpdateRange("to")}
                className="border-b-2 border-dashed w-full"
                placeholder="to"
              />
            </div>
          </div>
          <div className="col-end-1" readOnly>
            <input
              className="text-right w-full border-b-2 border-dashed bg-friend-list-bg"
              value={person.amount}
              readOnly
              inputMode="numeric"
            />
          </div>
        </div>
      )}
    </>
  );
}
