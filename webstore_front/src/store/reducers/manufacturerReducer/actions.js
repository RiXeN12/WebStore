import http from "../../../http_common";

export const getManufacturers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.get("manufacturer/get-all");
    const { data } = response;

    const manufacturers = data.payload

    dispatch({ type: "GET_ALL_MANUFACTURERS", payload: manufacturers });

  } catch (error) {
    console.error("get Manufacturers failed", error);
  }
};

export const createManufacturer = (model) => async (dispatch) => {
  try {
    const response = await http.post("manufacturer/create", model);

    const { data } = response;

    const manufacturer = data.payload

    dispatch({ type: "ADD_MANUFACTURER", payload: manufacturer });
    return { success: true, message: "Manufacturer created successfully" };

  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during manufacturer creation";
    return { success: false, message: errorMessage };
  }
};

export const deleteManufacturer = (id) => async (dispatch) => {
  try {
    const response = await http.delete(`manufacturer/delete?id=${id}`);

    const { data } = response;

    const manufacturer = data.payload

    dispatch({ type: "DELETE_MANUFACTURER", payload: manufacturer });
    return { success: true, message: "Manufacturer deleted successfully" };

  } catch (error) {
    return { success: false, message: error.response?.data || "Failed to delete manufacturer" };
  }
};

export const updateManufacturer = (model) => async (dispatch) => {
  try {
    const response = await http.put(`manufacturer/update`, model);

    const { data } = response;

    const manufacturer = data.payload

    dispatch({ type: "UPDATE_MANUFACTURER", payload: manufacturer });
    return { success: true, message: "Manufacturer updated successfully" };

  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during manufacturer update";
    return { success: false, message: errorMessage };
  }
};