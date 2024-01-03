import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firestore";

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
  const [summary, setSummary] = useState({ summary: "", person: [] });

  function getBill(uid, docId) {
    setIsLoading(true);
    const docRef = doc(db, "user", uid, "bill", docId);
    getDoc(docRef)
      .then((docSnap) => {
        setIsNotFound(!docSnap.exists());
        if (docSnap.exists()) {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          const data = docSnap.data();
          setBillName(data.billName);
          setOrderLine(data.orderLine);
          setSummary(data.summary);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }

  return { getBill, isLoading, isNotFound, billName, orderLine, summary };
}
