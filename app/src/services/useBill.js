import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { calculate_bill } from "../lib/calculate";
import { auth } from "../firebase/auth";

export default function useBill() {
  const [isLoading, setIsLoading] = useState(false);

  const [billList, setBillList] = useState([]);
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
    setIsLoading(true);
    try {
      const docRef = addDoc(
        collection(db, "user", auth.currentUser.uid, "bill"),
        {
          billName,
          orderLine,
          summary: calculate_bill(orderLine),
        }
      );

      return docRef.then((doc) => {
        setIsLoading(false);
        return ["user", auth.currentUser.uid, "bill", doc.id];
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function fetchBillList() {
    const uid = auth.currentUser.uid;
    return onSnapshot(collection(db, "user", uid, "bill"), (docs) => {
      const results = [];
      docs.forEach((doc) => {
        results.push({ docId: doc.id, ...doc.data() });
      });
      setBillList(results);
    });
  }

  useEffect(() => {
    const unsubscribe = fetchBillList();
    return () => unsubscribe();
  }, []);

  const summary = useMemo(() => calculate_bill(orderLine), [orderLine]);

  return {
    saveBill,
    billName,
    setBillName,
    orderLine,
    setOrderLine,
    addItem,
    summary,
    isLoading,
    billList,
  };
}
