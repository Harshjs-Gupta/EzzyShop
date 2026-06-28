import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "dashboard",
};

const adminPanelContentSlice = createSlice({
  name: "adminPanelContent",
  initialState,
  reducers: {
    dashboard: (state) => {
      state.value = "dashboard";
    },
    products: (state) => {
      state.value = "products";
    },
    orders: (state) => {
      state.value = "orders";
    },
    analysis: (state) => {
      state.value = "analysis";
    },
    setting: (state) => {
      state.value = "setting";
    },
    logOut: (state) => {
      state.value = "logOut";
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {
  dashboard,
  products,
  orders,
  analysis,
  setting,
  logOut,
  setValue,
} = adminPanelContentSlice.actions;
export default adminPanelContentSlice.reducer;
