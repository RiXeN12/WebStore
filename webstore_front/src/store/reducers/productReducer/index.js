const initialState = {
    clothingItemList: [],
    currentClothingItem: null,
  };
  
  const clothingItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_CLOTHING_ITEMS":
        return { ...state, clothingItemList: action.payload };
      case "GET_CLOTHING_ITEM_BY_ID":
        return { ...state, currentClothingItem: action.payload };
      case "ADD_CLOTHING_ITEM":
        return { ...state, clothingItemList: [...state.clothingItemList, action.payload] };
      case "UPDATE_CLOTHING_ITEM":
        return {
          ...state,
          clothingItemList: state.clothingItemList.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
          currentClothingItem: action.payload
        };
      case "DELETE_CLOTHING_ITEM":
        return {
          ...state,
          clothingItemList: state.clothingItemList.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      default:
        return state;
    }
  };
  
  export default clothingItemReducer;