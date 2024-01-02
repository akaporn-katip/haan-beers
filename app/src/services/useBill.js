import { addDoc, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { useMemo, useState } from "react";
import { calculate_bill } from "../lib/calculate";
import { auth } from "../firebase/auth";

export default function useBill() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const [billName, setBillName] = useState("");
  const [orderLine, setOrderLine] = useState([
    {
      item_name: "",
      type: "equality",
      price: "",
      summary: "",
      unit: "Baht",
      person: [],
    },
  ]);

  function addItem() {
    setOrderLine((prev) => [
      ...prev,
      {
        item_name: "",
        type: "equality",
        is_rounded: false,
        actual_price: "",
        price: "",
        summary: "",
        unit: "Baht",
        person: [],
      },
    ]);
  }

  async function saveBill() {
    try {
      const docRef = await addDoc(
        collection(db, "bill", "user", auth.currentUser.uid),
        {
          billName,
          orderLine,
          summary: calculate_bill(orderLine),
        }
      );

      return ["bill", "user", auth.currentUser.uid, docRef.id];
    } catch (error) {
      console.error(error);
    }
  }

  async function getBill(uid, id) {
    try {
      setIsLoading(true);
      const docRef = doc(db, "bill", "user", uid, id);
      const docSnap = await getDoc(docRef);
      setIsNotFound(!docSnap.exists());
      if (docSnap.exists()) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        const data = docSnap.data();
        setBillName(data.billName);
        setOrderLine(data.orderLine);
      }
      setIsLoading(false);
      return null;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const summary = useMemo(() => calculate_bill(orderLine), [orderLine]);

  return {
    saveBill,
    getBill,
    billName,
    setBillName,
    orderLine,
    setOrderLine,
    addItem,
    summary,
    isLoading,
    isNotFound,
  };
}
