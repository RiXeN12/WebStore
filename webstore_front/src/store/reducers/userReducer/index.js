const initState = {
  users: [],
  roles: [],
  currentUser: null,
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_ROLES":
      return { ...state, roles: action.payload };
    case "LOAD_USERS":
      return { ...state, users: action.payload };
    case "GET_USER_BY_ID":
    case "GET_USER_BY_EMAIL":
    case "GET_USER_BY_USERNAME":
      return { ...state, currentUser: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default UserReducer;
