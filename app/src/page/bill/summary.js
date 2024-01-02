import { useParams } from "react-router-dom";
import useBill from "../../services/useBill";
import { useEffect } from "react";
import PersonBasedItem from "../../component/order-line/person-based-item";
import ShareButton from "../../component/common/share-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export default function SummaryPage() {
  const { docId, userId } = useParams();
  const { getBill, billName, summary, isLoading, isNotFound } = useBill();

  useEffect(() => {
    getBill(userId, docId);
  }, [docId]);

  if (isLoading) return <div>Loadding</div>;
  if (isNotFound) return <div>Not Found</div>;
  return (
    <>
      <PersonBasedItem billName={billName} summary={summary} />
      <div className="flex justify-end bg-white p-2 rounded-b-md">
        <ShareButton
          className="btn"
          title={billName}
          text={`บิลรวม ${summary.summary}`}
          url={window.location.href}
        >
          แชร์ <FontAwesomeIcon icon={faShare} />
        </ShareButton>
      </div>
    </>
  );
}
