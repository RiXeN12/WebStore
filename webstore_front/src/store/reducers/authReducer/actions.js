import { jwtDecode } from "jwt-decode";
import http from "../../../http_common";

export const signInByToken = (tokens) => async (dispatch) => {
  const user = await saveToken(tokens.auth);
  localStorage.setItem("urt", tokens.urt);

  dispatch({ type: "SIGN_IN", payload: user });
};

const saveToken = async (token) => {
  if (token === null || token === undefined) {
    return null;
  }

  const decodedToken = jwtDecode(token);

  const user = await getUser(decodedToken.id);

  if (!user) return;

  localStorage.setItem("auth", token);

  return user;
};

export const signIn = (model) => async (dispatch) => {
  try {
    const response = await http.post("account/signin", model);
    const { data } = response;
    const tokens = data.payload;
    const user = await saveToken(tokens.accessToken);
    localStorage.setItem("urt", tokens.refreshToken);

    dispatch({ type: "SIGN_IN", payload: user });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const signUp = (model) => async (dispatch) => {
  try {
    const response = await http.post("account/signup", model);
    const { data } = response;
    const tokens = data.payload;
    const user = await saveToken(tokens.accessToken);
    localStorage.setItem("urt", tokens.refreshToken);

    dispatch({ type: "SIGN_UP", payload: user });

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("urt");
  dispatch({ type: "LOGOUT" });
};

export const uploadImage = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }
    
    const response = await http.post("user/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    dispatch({ type: "SIGN_IN", payload: await saveToken(token) });
    return { success: true, message: "Image saved!" };
  } catch (error) {
    const errorMessage =
      error.response?.data || "Помилка завантаження зображення";
    return { success: false, message: errorMessage };
  }
};

export const updateUser = (model) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (token == null) {
      return;
    }

    const response = await http.put("user", model, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    const errorMessage = error.response?.data || "Failed to update user";
    return { success: false, message: errorMessage };
  }
};

const getUser = async (id) => {
  try {
    const response = await http.get("user?id=" + id);

    return response.data.payload;
  } catch (error) {
    return { success: false, message: error.response?.data || "Failed to fetch user" };
  }
};
