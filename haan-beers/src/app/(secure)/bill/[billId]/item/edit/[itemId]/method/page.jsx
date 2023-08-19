import MethodInput from "src/share/components/method/method-input";

export default function MethodPage({ params }) {
  const billId = params.billId;
  const itemId = params.itemId;
  return (
    <div>
      <MethodInput billId={billId} itemId={itemId}></MethodInput>
    </div>
  );
}
