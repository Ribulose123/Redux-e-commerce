import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketItem {
  id: string;
  title: string;
  price: number; // Ensure price is a number
  quantity: number; // Ensure quantity is a number
  image: string;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket(state, action: PayloadAction<BasketItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increase quantity if item already exists
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1, // Default quantity to 1 if not provided
          price: action.payload.price || 0, // Default price to 0 if not provided
        });
      }
    },
    removeItemFromBasket(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItemQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity > 0 ? action.payload.quantity : 1; // Prevent invalid quantity
      }
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { addItemToBasket, removeItemFromBasket, updateItemQuantity, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
