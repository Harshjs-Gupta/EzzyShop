import { configureStore } from "@reduxjs/toolkit";
import adminPanelContentReducer from "./features/panelContent";
import productFiltersReducer from "./features/productFilters";
import orderFiltersReducer from "./features/orderFilter";

export const store = configureStore({
  reducer: {
    adminPanelContent: adminPanelContentReducer,
    productFilters: productFiltersReducer,
    orderFilters: orderFiltersReducer,
  },
});

// Types (important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
