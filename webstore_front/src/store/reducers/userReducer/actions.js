import http from "../../../http_common";
import { toast } from "react-toastify";

export const loadUsers = (page, pageSize) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.get(
      `user/users?page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;
    const users = data.payload;

    dispatch({ type: "LOAD_USERS", payload: users });
  } catch (error) {
    console.error("Помилка завантаження користувачів", error);
    toast.error("Не вдалося завантажити користувачів");
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.get(`user?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    const user = data.payload;

    dispatch({ type: "GET_USER_BY_ID", payload: user });
    return { success: true, message: "Користувача знайдено" };
  } catch (error) {
    console.error("Помилка отримання користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося знайти користувача",
    };
  }
};

export const getUserByEmail = (email) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.get(`user?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    const user = data.payload;

    dispatch({ type: "GET_USER_BY_EMAIL", payload: user });
    return { success: true, message: "Користувача знайдено" };
  } catch (error) {
    console.error("Помилка отримання користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося знайти користувача",
    };
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.get("user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    const user = data.payload;

    dispatch({ type: "LOAD_USERS", payload: user });
    return { success: true, message: "Користувачів знайдено" };
  } catch (error) {
    console.error("Помилка отримання користувачів", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося знайти користувачів",
    };
  }
};

export const getUserByUserName = (userName) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.get(`user?userName=${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    const user = data.payload;

    dispatch({ type: "GET_USER_BY_USERNAME", payload: user });
    return { success: true, message: "Користувача знайдено" };
  } catch (error) {
    console.error("Помилка отримання користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося знайти користувача",
    };
  }
};

export const createUser = (model) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.post("user", model, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    dispatch({ type: "ADD_USER", payload: data.payload });
    return { success: true, message: "Користувача успішно створено" };
  } catch (error) {
    console.error("Помилка створення користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося створити користувача",
    };
  }
};

export const updateUser = (model) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const response = await http.put("user", model, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    dispatch({ type: "UPDATE_USER", payload: data?.payload });
    return { success: true, message: "Користувача успішно оновлено" };
  } catch (error) {
    console.error("Помилка оновлення користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося оновити користувача",
    };
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    await http.delete(`user?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "DELETE_USER", payload: id });
    return { success: true, message: "Користувача успішно видалено" };
  } catch (error) {
    console.error("Помилка видалення користувача", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося видалити користувача",
    };
  }
};

export const uploadUserImage = (model) => async (dispatch) => {
  try {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Авторизуйтесь для доступу до цієї функції");
      return;
    }

    const formData = new FormData();
    formData.append("UserId", model.userId);
    formData.append("Image", model.image);

    const response = await http.post("user/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = response;

    dispatch({ type: "UPDATE_USER", payload: data.payload });
    return { success: true, message: "Зображення успішно завантажено" };
  } catch (error) {
    console.error("Помилка завантаження зображення", error);
    return {
      success: false,
      message: error.response?.data || "Не вдалося завантажити зображення",
    };
  }
};
