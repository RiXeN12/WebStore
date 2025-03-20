const initialState = {
    manufacturerList: [],
  };
  
  const manufacturerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_MANUFACTURERS":
        return { ...state, manufacturerList: action.payload };
      case "ADD_MANUFACTURER":
        return { ...state, manufacturerList: [...state.manufacturerList, action.payload] };
      case "DELETE_MANUFACTURER":
        return {
          ...state,
          manufacturerList: state.manufacturerList.filter(
            (m) => m.id !== action.payload.id
          ),
        };
      case "UPDATE_MANUFACTURER":
        return {
          ...state,
          manufacturerList: state.manufacturerList.map((m) =>
            m.id === action.payload.id ? action.payload : m
          ),
        };
      default:
        return state;
    }
  };
  
  export default manufacturerReducer;