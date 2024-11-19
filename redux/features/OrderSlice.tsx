import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserOrder {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  userId: string;
}

interface OrdersState {
  orders: UserOrder[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<UserOrder[]>) {
      state.orders.push(...action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
