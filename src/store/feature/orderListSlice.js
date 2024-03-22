import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderList: [],
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    updateOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});

export const { updateOrderList } = orderListSlice.actions;
export default orderListSlice.reducer;
