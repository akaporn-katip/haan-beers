export default function ItemBasedSummary({ billName, orderLine, summary }) {
  return (
    <>
      <div className="flex p-2 bg-white text-3xl">{billName}</div>
      {orderLine.map((item, id) => (
        <div className="flex flex-col bg-white p-2" key={id}>
          <div className="flex flex-1 justify-between text-xl">
            <div>{item.item_name}</div>
            <div>{item.actual_price}</div>
          </div>
          <div className=" divide-y">
            {item.person.map((person, id) => (
              <div
                key={person.id}
                className="flex justify-between pl-4 text-lg"
              >
                <div>{person.name}</div>
                <div>{person.amount}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between text-xl bg-white p-2">
        <div>รวม</div>
        <div>{summary.summary} Baht</div>
      </div>
    </>
  );
}
