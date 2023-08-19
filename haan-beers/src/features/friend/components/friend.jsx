"use client";

import InputUser from "src/share/components/user/input-user";
import { useEffect, useState } from "react";

export default function Friend({ friends, onSelect, defaultSelected }) {
  const [checked, setChecked] = useState({ ...defaultSelected });

  const _friends = friends.map((f) => ({ ...f, checked: !!checked[f.id] }));

  const handleCheck = (friend) => {
    setChecked((prev) => {
      if (prev[friend.id]) {
        delete prev[friend.id];
        return { ...prev };
      }
      return { ...prev, [friend.id]: { ...friend, total: 0 } };
    });
  };

  useEffect(() => {
    onSelect(checked);
  }, [checked]);

  return (
    <div className="flex gap-2 flex-col">
      {_friends.map((friend) => (
        <InputUser
          key={friend.id}
          user={friend}
          uniqueKey="id"
          onCheck={() => handleCheck(friend)}
          checked={friend.checked}
        />
      ))}
    </div>
  );
}
