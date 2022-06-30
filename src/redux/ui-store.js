import { createSlice } from "@reduxjs/toolkit"

export const uiStore = createSlice({
  name: "uiStore",
  initialState: {
    breadcrumbs: [],
    title: "",
    alert: null,
    showCreateModal: {show: false, id: null, disabled_form: false},
    showCreateNewModal: {show: false, id: null, disabled_form: false},
    showModalDelete: {show: false, id: null, disabled_form: false},
    reloadTable: false,
    modalTitle: "",
    modalTitleNew: "",
    contentTitle: "",
    corporateClient: []
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
    setCreateNewModal: (state, action) => {
      state.showCreateNewModal = { ...state.showCreateNewModal, ...action.payload}
      state.reloadTable = !action.payload.show
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload
    },
    setModalTitleNew: (state, action) => {
      state.modalTitleNew = action.payload
    },
    setReloadTable: (state, action) => {
      state.reloadTable = action.payload
    },
    setModalDelete: (state, action) => {
      state.showModalDelete = { ...state.showModalDelete, ...action.payload}
      state.reloadTable = !action.payload.show
    },
    setContentTitle: (state, action) => {
      state.contentTitle = action.payload
    },
    setCorporateClient: (state, action) => {
      console.log(action);
      state.corporateClient = {...state.corporateClient, ...action.payload.data}
      // state.corporateClient = action.payload.data
    }
  },
})

export const { 
  setTitle, 
  setBreadcrumbs, 
  setAlert, 
  setCreateModal, 
  setCreateNewModal, 
  setReloadTable, 
  setUIParams, 
  setModalTitle,
  setModalTitleNew,
  setModalDelete,
  setContentTitle,
  setCorporateClient
} = uiStore.actions

export default uiStore.reducer
