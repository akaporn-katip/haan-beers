import { useParams } from "react-router-dom";
import useBill from "../../services/useBill";
import { Fragment, useEffect } from "react";
import ShareButton from "../../component/common/share-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPerson, faShare } from "@fortawesome/free-solid-svg-icons";
import { Tab } from "@headlessui/react";
import PersonBasedSummary from "../../component/order-line/person-based-summary";
import ItemBasedSummary from "../../component/order-line/item-based-summary";

export default function SummaryPage() {
  const { docId, userId } = useParams();
  const { getBill, billName, orderLine, summary, isLoading, isNotFound } = useBill();

  useEffect(() => {
    getBill(userId, docId);
  }, [docId]);

  if (isLoading) return <div>Loadding</div>;
  if (isNotFound) return <div>Not Found</div>;
  return (
    <>
      <Tab.Group>
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected ? "bg-white rounded-t-md p-2" : "p-2 text-white"
                }
              >
                บุคคล <FontAwesomeIcon icon={faPerson} />
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected ? "bg-white rounded-t-md p-2" : "p-2 text-white"
                }
              >
                รายการ <FontAwesomeIcon icon={faList} />
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PersonBasedSummary billName={billName} summary={summary} />
          </Tab.Panel>
          <Tab.Panel>
            <ItemBasedSummary
              billName={billName}
              orderLine={orderLine}
              summary={summary}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
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
