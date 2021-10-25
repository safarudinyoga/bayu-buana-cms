import { createSlice } from "@reduxjs/toolkit"

export const uiStore = createSlice({
  name: "uiStore",
  initialState: {
    breadcrumbs: [],
    title: "",
  },
  reducers: {
    setUIParams(state, action) {
      let params = ["breadcrumbs", "title"]
      for (let i in params) {
        let payload = action.payload[params[i]]
        if (typeof payload !== "undefined") {
          state[params[i]] = payload
        }
      }
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload
    },
  },
})

export const { setTitle, setBreadcrumbs, setUIParams } = uiStore.actions

export default uiStore.reducer
