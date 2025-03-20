const initState = {
    user: null,
    isAuth: false,
    role: null
};

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case "SIGN_IN":
            return { ...state, user: action.payload, isAuth: true, role: action.payload.role };
        case "SIGN_UP":
            return { ...state, user: action.payload, isAuth: true, role: action.payload.role };
        case "LOGOUT":
            return { ...state, user: null, isAuth: false, role: null };
        default:
            return state;
    }
};

export default AuthReducer;