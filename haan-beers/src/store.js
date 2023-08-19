import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./features/bill/billSlice";
import friendSlice from "./features/friend/friendSlice";
export default configureStore({
  reducer: {
    bill: billSlice,
    friends: friendSlice,
  },
});
