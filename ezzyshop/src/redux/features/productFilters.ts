import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: "",
  status: "",
  sortByPrice: "",
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSortByPrice: (state, action: PayloadAction<string>) => {
      state.sortByPrice = action.payload;
    },
  },
});

export const { setCategories, setStatus, setSortByPrice } =
  productFiltersSlice.actions;
export default productFiltersSlice.reducer;
