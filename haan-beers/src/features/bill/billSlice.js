import { createSlice } from "@reduxjs/toolkit";

export const billSlice = createSlice({
  name: "bill",
  initialState: {
    id: nanoid(),
    title: "",
    participants: [],
    items: {},
    active: true,
  },
  reducers: {
    createBill: (state, action) => {
      state[action.payload.id] = {
        ...action.payload,
      };
    },
    cancelBill: (state, action) => {
      delete state[action.payload.id];
    },
    updateBill: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    addProduct: (state, action) => {
      state[action.payload.billId].products[action.payload.itemId] =
        action.payload;
    },
    updateProduct: (state, action) => {
      state[action.payload.billId].products[action.payload.itemId] =
        action.payload;
    },
    removeProduct: (state, action) => {
      delete state[action.payload.billId].products[action.payload.itemId];
    },
  },
});

export const {
  createBill,
  updateBill,
  cancelBill,
  addProduct,
  updateProduct,
  removeProduct,
} = billSlice.actions;

export const selectAllBill = (state) => state.bill;

export const selectOneBill = (id) => (state) => state.bill[id];

export const selectOneProduct =
  ({ billId, itemId }) =>
  (state) => {
    const bill = selectOneBill(billId)(state);
    if (!bill) return null;
    return bill.products[itemId];
  };

export default billSlice.reducer;
