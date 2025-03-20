import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { toast } from "react-toastify";
import ProductImages from "./ClothingEditImages/ProductImages";

const ClothingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateClothingItem, deleteClothingItem, getClothingItemById, getCategories, getManufacturers } = useActions();
  const { currentClothingItem } = useSelector((state) => state.product);
  const { manufacturerList } = useSelector((state) => state.manufacturer);
  const { categoryList } = useSelector((state) => state.category);

  const [productData, setProductData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
    manufacturerId: "",
    stockQuantity: "",
    description: "",
  });

  useEffect(() => {
    getClothingItemById(id);
    getCategories();
    getManufacturers();
  }, [id]);

  useEffect(() => {
    if (currentClothingItem) {
      setProductData(currentClothingItem);
      setFormData({
        name: currentClothingItem.name,
        price: currentClothingItem.price,
        categoryId: currentClothingItem.categoryId,
        manufacturerId: currentClothingItem.manufacturerId,
        stockQuantity: currentClothingItem.stockQuantity,
        description: currentClothingItem.description,
      });
    }
  }, [currentClothingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateClothingItem({ id, ...formData });
    if (result.success) {
      toast.success("Продукт успішно оновлено");
      navigate("/clothing");
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async () => {
    const result = await deleteClothingItem(id);
    if (result.success) {
      toast.success("Продукт успішно видалено");
      navigate("/clothing");
    } else {
      toast.error(result.message);
    }
  };

  if (!productData) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div
              className="card-header text-white p-4"
              style={{
                background: "linear-gradient(135deg, #6f42c1 0%, #8a5cd0 100%)",
                borderRadius: "0.5rem 0.5rem 0 0",
              }}
            >
              <h3 className="mb-0 text-center">
                <i className="bi bi-pencil-square me-2"></i>
                Редагувати продукт
              </h3>
              <p className="text-white-50 text-center mb-0 mt-2">
                ID: {productData.id}
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 pe-md-4">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Назва продукту</label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <i className="bi bi-tag"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-6">
                        <label className="form-label fw-bold">Ціна</label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            ₴
                          </span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-bold">Кількість</label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <i className="bi bi-123"></i>
                          </span>
                          <input
                            type="number"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Категорія</label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="form-select"
                        required
                        style={{ borderColor: "#dee2e6" }}
                      >
                        <option value="">Виберіть категорію</option>
                        {categoryList.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold">Виробник</label>
                      <select
                        name="manufacturerId"
                        value={formData.manufacturerId}
                        onChange={handleChange}
                        className="form-select"
                        required
                        style={{ borderColor: "#dee2e6" }}
                      >
                        <option value="">Виберіть виробника</option>
                        {manufacturerList.map((manufacturer) => (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Опис</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={9}
                        className="form-control"
                        required
                        style={{ resize: "none" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Видалити продукт
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      style={{ borderColor: "#6f42c1", color: "#6f42c1" }}
                      onClick={() => navigate("/clothing")}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      className="btn text-white px-4"
                      style={{
                        backgroundColor: "#6f42c1",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Зберегти зміни
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <ProductImages/>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Видалити продукт?"
        message="Ви впевнені, що хочете видалити продукт з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={productData?.id}
      />
    </div>
  );
};

export default ClothingEdit;