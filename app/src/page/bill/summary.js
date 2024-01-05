import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import ShareButton from "../../component/common/share-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPerson, faShare } from "@fortawesome/free-solid-svg-icons";
import { Tab } from "@headlessui/react";
import PersonBasedSummary from "../../component/order-line/person-based-summary";
import ItemBasedSummary from "../../component/order-line/item-based-summary";
import useSummary from "../../services/useSummary";
import { Helmet } from "react-helmet";

export default function SummaryPage() {
  const { docId, userId } = useParams();
  const { isLoading, isNotFound, getBill, billName, summary, orderLine } =
    useSummary();

  function handleGetBill() {
    getBill(userId, docId);
  }

  useEffect(() => {
    handleGetBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loadding</div>;
  if (isNotFound) return <div>Not Found</div>;
  return (
    <>
      <Helmet>
        <title>{billName} - haan-beer</title>
      </Helmet>
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
            <div className="bg-white rounded-tr-md">
              <PersonBasedSummary billName={billName} summary={summary} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-white rounded-tr-md">
              <ItemBasedSummary
                billName={billName}
                orderLine={orderLine}
                summary={summary}
              />
            </div>
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
