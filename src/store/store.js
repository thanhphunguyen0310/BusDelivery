import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./feature/counterSlice";
import orderListSlice from "./feature/orderListSlice";
import currenUserReducer from "./feature/currentUserSlice";
import reRenderReducer from "./feature/reRenderSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    orderList: orderListSlice,
    currentUser: currenUserReducer,
    reRender: reRenderReducer,
  },
});
