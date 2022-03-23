import { createSlice } from "@reduxjs/toolkit"

export const uiStore = createSlice({
  name: "uiStore",
  initialState: {
    breadcrumbs: [],
    title: "",
    alert: null,
    showCreateModal: {show: false, id: null, disabled_form: false},
    reloadTable: false,
    modalTitle: ""
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
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setCreateModal: (state, action) => {
      state.showCreateModal = { ...state.showCreateModal, ...action.payload}
      state.reloadTable = !action.payload.show
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload
    },
    setReloadTable: (state, action) => {
      state.reloadTable = action.payload
    },
  },
})

export const { 
  setTitle, 
  setBreadcrumbs, 
  setAlert, 
  setCreateModal, 
  setReloadTable, 
  setUIParams, 
  setModalTitle 
} = uiStore.actions

export default uiStore.reducer
