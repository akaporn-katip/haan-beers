import CreateProduct from "src/share/components/product/create-product";
export default function AddProductItemPage({ params }) {
  const billId = params.billId;
  return <CreateProduct billId={billId} />;
}
