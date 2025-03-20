import * as authActions from "./authReducer/actions";
import * as userActions from "./userReducer/actions";
import * as roleActions from "./userReducer/roleActions";
import * as manufacturerActions from "./manufacturerReducer/actions";
import * as categoryActions from "./categoryReducer/actions";
import * as productActions from "./productReducer/actions";

const actions = {
    ...authActions,
    ...userActions,
    ...roleActions,
    ...manufacturerActions,
    ...categoryActions,
    ...productActions,
};

export default actions;