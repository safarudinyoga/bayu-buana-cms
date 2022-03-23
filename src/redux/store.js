import { configureStore } from "@reduxjs/toolkit"
import uiStore from "./ui-store"

export const store = configureStore({
  reducer: {
    ui: uiStore,
  },
})
