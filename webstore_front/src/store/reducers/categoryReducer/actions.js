import http from "../../../http_common";

export const getCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.get("category/get-all");
    const { data } = response;

    const categories = data.payload

    dispatch({ type: "GET_ALL_CATEGORIES", payload: categories });

  } catch (error) {
    console.error("get Categories failed", error);
  }
};

export const createCategory = (model) => async (dispatch) => {
  try {
    const response = await http.post("category/create", model);

    const { data } = response;

    const category = data.payload

    dispatch({ type: "ADD_CATEGORY", payload: category });
    return { success: true, message: "Category created successfully" };

  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during category creation";
    return { success: false, message: errorMessage };
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await http.delete(`category/delete?id=${id}`);

    const { data } = response;

    const category = data.payload

    dispatch({ type: "DELETE_CATEGORY", payload: category });
    return { success: true, message: "Category deleted successfully" };

  } catch (error) {
    return { success: false, message: error.response?.data || "Failed to delete category" };
  }
};

export const updateCategory = (model) => async (dispatch) => {
  try {
    const response = await http.put(`category/update`, model);

    const { data } = response;

    const category = data.payload

    dispatch({ type: "UPDATE_CATEGORY", payload: category });
    return { success: true, message: "Category updated successfully" };

  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during category update";
    return { success: false, message: errorMessage };
  }
};