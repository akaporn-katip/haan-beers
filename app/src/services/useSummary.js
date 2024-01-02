import { doc, getDoc } from "firebase/firestore";
import { useMemo, useState } from "react";
import { db } from "../firebase/firestore";
import { calculate_bill } from "../lib/calculate";

export default function useSummary() {
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

  async function getBill(uid, docId) {
    try {
      setIsLoading(true);
      const docRef = doc(db, "user", uid, "bill", docId);
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

  return { getBill, isLoading, isNotFound, billName, orderLine, summary };
}
