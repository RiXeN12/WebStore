import http from "../../../http_common";

export const getClothingItems = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.get("clothingitem/get-all");
    const { data } = response;

    const clothingItems = data.payload;

    dispatch({ type: "GET_ALL_CLOTHING_ITEMS", payload: clothingItems });
  } catch (error) {
    console.error("get Clothing Items failed", error);
  }
};

export const getClothingItemById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.get(`clothingitem/get-by-id?id=${id}`);
    const { data } = response;

    const clothingItem = data.payload;

    dispatch({ type: "GET_CLOTHING_ITEM_BY_ID", payload: clothingItem });
    return { success: true, message: "Clothing Item fetched successfully" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || "Failed to fetch Clothing Item",
    };
  }
};

export const createClothingItem = (model, imageFile) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.post(
      `ClothingItem/create?Name=${model.name}&Price=${model.price}&Description=${model.description}&StockQuantity=${model.stockQuantity}&CategoryId=${model.categoryId}&ManufacturerId=${model.manufacturerId}`,
      imageFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { data } = response;

    const clothingItem = data.payload;

    dispatch({ type: "ADD_CLOTHING_ITEM", payload: clothingItem });
    return { success: true, message: "Clothing Item created successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during Clothing Item creation";
    return { success: false, message: errorMessage };
  }
};

export const updateClothingItem = (model) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.put("clothingitem/update", model);
    const { data } = response;

    const clothingItem = data.payload;

    dispatch({ type: "UPDATE_CLOTHING_ITEM", payload: clothingItem });
    return { success: true, message: "Clothing Item updated successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.Name?.[0] ||
      "An error occurred during Clothing Item update";
    return { success: false, message: errorMessage };
  }
};

export const deleteClothingItem = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await http.delete(`clothingitem/delete?id=${id}`);
    const { data } = response;

    const clothingItem = data?.payload;

    dispatch({ type: "DELETE_CLOTHING_ITEM", payload: clothingItem });
    return { success: true, message: "Clothing Item deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data || "Failed to delete Clothing Item",
    };
  }
};

export const uploadClothingItemImages =
  (productId, imagesFiles) => async (dispatch) => {
    try {
      const token = localStorage.getItem("accessToken");
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const formData = new FormData();
      imagesFiles.forEach((file) => {
        formData.append("imagesFiles", file);
      });

      const response = await http.put(
        `clothingitem/upload-images/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;

      const updatedClothingItem = data.payload;

      dispatch({ type: "UPDATE_CLOTHING_ITEM", payload: updatedClothingItem });
      return { success: true, message: "Images uploaded successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || "Failed to upload images",
      };
    }
  };

export const deleteClothingItemImage =
  (productId, imageId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("accessToken");
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await http.put(
        `ClothingItem/delete-image/${productId}?imageId=${imageId}`
      );
      const { data } = response;

      const updatedClothingItem = data.payload;

      dispatch({ type: "UPDATE_CLOTHING_ITEM", payload: updatedClothingItem });
      return { success: true, message: "Image deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || "Failed to delete image",
      };
    }
  };
