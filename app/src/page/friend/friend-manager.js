import Header from "../../component/common/header";
import FriendEditor from "../../component/friend/friend-editor";
import FirendItem from "../../component/friend/friend-item";
import useFriend from "../../services/useFriend";

export default function FriendManagerPage() {
  const { friendList } = useFriend();

  return (
    <>
      <Header></Header>
      <div className="flex flex-col divide-y overflow-scroll bg-white p-2 rounded-md space-y-1">
        {friendList.map((friend) => (
          <FirendItem key={friend.id} disabledSelector={true}>
            <span className="font-bold">{friend.name}</span>
          </FirendItem>
        ))}
        <FriendEditor />
      </div>
    </>
  );
}
