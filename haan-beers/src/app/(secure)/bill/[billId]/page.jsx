import UpdateBill from "src/features/bill/components/update-bill";

export default function UpdateBillPage({ params }) {
  const id = params.billId;
  return (
    <div>
      <UpdateBill id={id} />
    </div>
  );
}
