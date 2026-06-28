import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterByCustomerName: "",
  filteredDate: "",
  status: "",
  sortByFreshness: "",
};

const orderFiltersSlice = createSlice({
  name: "orderFilters",
  initialState,
  reducers: {
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.filterByCustomerName = action.payload;
    },
    setOrderDate: (state, action: PayloadAction<string>) => {
      state.filteredDate = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSortByFreshness: (state, action: PayloadAction<string>) => {
      state.sortByFreshness = action.payload;
    },
  },
});

export const { setCustomerName, setOrderDate, setStatus, setSortByFreshness } =
  orderFiltersSlice.actions;
export default orderFiltersSlice.reducer;
