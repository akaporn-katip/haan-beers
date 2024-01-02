import { useNavigate } from "react-router-dom";
export default function PersonBasedItem({ billName, summary }) {
  return (
    <>
      <div className="flex bg-white rounded-t-md p-2">
        <div className="text-3xl">{billName}</div>
      </div>

      <div className="flex justify-between text-xl bg-white p-2">
        <div>ชื่อ</div>
        <div>ราคา</div>
      </div>

      <div className="flex flex-col bg-white p-2 divide-y">
        {summary.person.map((p) => (
          <div key={p.id} className="flex justify-between text-xl">
            <div>{p.name}</div>
            <div>{p.amount}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xl bg-white p-2">
        <div>รวม</div>
        <div>{summary.summary} Baht</div>
      </div>
    </>
  );
}
