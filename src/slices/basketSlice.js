import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      //keep original items in current state and add current payload
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //if the basketItem's id is same as the id we pass as payload in checkoutProd(removeitemfromBasket)
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      //create a new basket because we are going to modify the basket
      let newBasket = [...state.items];
      //if item exists then index will be greater than or equal to 0 else it will be -1
      if (index >= 0) {
        //item exist it .. remove item
        newBasket.splice(index, 1);
        //cutting that index by 1 ie removes that item
      } else {
        console.warn(
          `Can't remove product (id:${action.payload.id}) as its not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

//to use them in rest of the application
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

//total starts at 0
export default basketSlice.reducer;
