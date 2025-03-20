const initialState = {
    categoryList: [],
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_CATEGORIES":
        return { ...state, categoryList: action.payload };
      case "ADD_CATEGORY":
        return { ...state, categoryList: [...state.categoryList, action.payload] };
      case "DELETE_CATEGORY":
        return {
          ...state,
          categoryList: state.categoryList.filter(
            (m) => m.id !== action.payload.id
          ),
        };
      case "UPDATE_CATEGORY":
        return {
          ...state,
          categoryList: state.categoryList.map((m) =>
            m.id === action.payload.id ? action.payload : m
          ),
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;