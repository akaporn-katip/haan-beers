import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firestore";
import { auth } from "../firebase/auth";

export default function useFriend() {
  const [isLoading, setIsLoading] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friend, setFriend] = useState({ name: "", uid: "" });

  async function fetchFriend() {
    const uid = auth.currentUser.uid;

    onSnapshot(collection(db, "user", uid, "friend"), (docs) => {
      const results = [];
      docs.forEach((doc) => {
        results.push({ id: doc.id, amount: "", range: [], ...doc.data() });
      });
      setFriendList(results);
    });
  }

  async function saveFriend() {
    setIsLoading(true);
    const uid = auth.currentUser.uid;
    try {
      const docRef = await addDoc(
        collection(db, "user", uid, "friend"),
        friend
      );

      setIsLoading(false);
      return docRef.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { fetchFriend, saveFriend, friend, setFriend, friendList, isLoading };
}
