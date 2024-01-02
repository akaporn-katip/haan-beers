import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFriend from "../../services/useFriend";

export default function FriendEditor() {
  const { friend, setFriend, saveFriend, isLoading } = useFriend();

  function handleUpdateFriend(e) {
    setFriend((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function clear() {
    setFriend((prev) => ({ ...prev, name: "" }));
  }

  function handleSaveFriend() {
    saveFriend().then(() => {
      clear();
    });
  }
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <input
          name="name"
          value={friend.name}
          className="text-xl font-bold w-full"
          placeholder="ใส่ชื่อคนเพิ่ม..."
          onChange={handleUpdateFriend}
          disabled={isLoading}
        ></input>
      </div>
      <div>
        <button
          className="bg-green-700 text-white rounded-md aspect-square h-8"
          onClick={handleSaveFriend}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
      <div>
        <button
          className="bg-red-700 text-white rounded-md aspect-square h-8"
          onClick={clear}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
