import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useBill from "../../services/useBill";
import PersonBasedSummary from "../../component/order-line/person-based-summary";
import { auth } from "../../firebase/auth";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function BillListPage() {
  const { billList } = useBill();
  const [uid] = useState(auth.currentUser.uid);

  return (
    <>
      <Helmet>
        <title>dashboard</title>
      </Helmet>
      <div className="flex flex-col space-y-2">
        <Link
          to={"/create"}
          className="flex flex-1 justify-center items-center space-x-2 text-3xl bg-white rounded-md p-2"
        >
          <div className="flex justify-center items-center btn btn-create-bill aspect-square">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div>สร้างบิล</div>
        </Link>
        {billList.map((bill) => (
          <div key={bill.docId} className="flex flex-col bg-white rounded-md">
            <PersonBasedSummary
              billName={bill.billName}
              summary={bill.summary}
            />
            <Link
              to={`/user/${uid}/bill/${bill.docId}`}
              className="text-center text-lg"
            >
              รายละเอียด
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
