import { useParams } from "react-router-dom";
import useBill from "../../services/useBill";
import { useEffect } from "react";

export default function SummaryPage() {
  const { docId } = useParams();
  const { getBill, billName, summary, isLoading, isNotFound } = useBill();

  useEffect(() => {
    getBill(docId);
  }, [docId]);

  if (isLoading) return <div>Loadding</div>;
  if (isNotFound) return <div>Not Found</div>;
  return (
    <div className="flex flex-col bg-white">
      <div>{billName}</div>
      <div>{summary.summary}</div>
      {summary.person.map((p) => (
        <div key={p.id}>
          {p.name} {p.amount}
        </div>
      ))}
    </div>
  );
}
