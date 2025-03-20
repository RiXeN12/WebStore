import { toast } from "react-toastify";
import http from "../../../http_common";

export const loadRoles = () => async (dispatch) => {
    try {
        const response = await http.get("role");
        const { data } = response;

        dispatch({
            type: "LOAD_ROLES",
            payload: data.payload
        });
        
    } catch (error) {
        toast.error(error);
    }
};

export const createRole = (newRole) => async (dispatch) => {
    try {

        const response = await http.post("role", newRole);
        const { data } = response;

        if(data === undefined) {
            const responseData = response.response.data;
            if(responseData.statusCode != 200) {
                return { success: false, message: responseData.message };
            }
        }

        return { success: true, message: data.message };
    } catch(error) {
        return { success: false, message: error.response.data.message };
    };
};

export const updateRole = (role) => async (dispatch) => {
    try {

        const response = await http.put("role", role);
        const { data } = response;

        if(data === undefined) {
            const responseData = response.response.data;
            if(responseData.statusCode != 200) {
                return { success: false, message: responseData.message };
            }
        }

        return { success: true, message: data.message };
    } catch(error) {
        return { success: false, message: error.response.data.message };
    };
};

export const deleteRole = (id) => async (dispatch) => {
    try {

        const response = await http.delete("role?id=" + id);
        const { data } = response;

        if(data === undefined) {
            const responseData = response.response.data;
            if(responseData.statusCode != 200) {
                return { success: false, message: responseData.message };
            }
        }

        dispatch({type: "DELETE_ROLE", payload: id});

        return { success: true, message: data.message };
    } catch(error) {
        return { success: false, message: error.response.data.message };
    };
};