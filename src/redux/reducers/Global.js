const initialState = {
  loadingTable: false,
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOADING_TABLE':
          return { ...state, loadingTable: action.payload }
      default:
          return state
    }
}

export default globalReducer
