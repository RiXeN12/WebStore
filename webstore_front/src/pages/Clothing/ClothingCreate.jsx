import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  const { createClothingItem, getCategories, getManufacturers } = useActions();

  const { manufacturerList } = useSelector((state) => state.manufacturer);
  const { categoryList } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stockQuantity: "",
    categoryId: "",
    manufacturerId: "",
    image: null,
  });

   useEffect(() => {
      getManufacturers();
      getCategories();
    }, []);

  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataImage = new FormData();
    if (formData.image) {
        formDataImage.append("ImageFile", formData.image);
    }

    const result = await createClothingItem(formData, formDataImage);
    if (result.success) {
      toast.success("Продукт успішно створено");
      navigate("/clothing");
    } else {
      toast.error(result.message);
    }
  };

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
                <i className="bi bi-bag-plus-fill me-2"></i>
                Створити новий продукт
              </h3>
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
                          placeholder="Введіть назву продукту"
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
                            placeholder="Введіть ціну"
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
                            placeholder="Введіть кількість"
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
                            <option key={category.id} value={category.id}>{category.name}</option>
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
                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label fw-bold">Фото продукту</label>
                      <div
                        className={`drag-drop-zone p-4 text-center border rounded-3 ${
                          dragActive ? "border-primary" : ""
                        }`}
                        style={{
                          minHeight: "200px",
                          backgroundColor: "#f8f9fa",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("imageInput").click()}
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="img-fluid rounded-3"
                            style={{ maxHeight: "200px" }}
                          />
                        ) : (
                          <div className="py-4">
                            <i className="bi bi-cloud-upload display-4 text-muted"></i>
                            <p className="mt-2 text-muted">
                              Перетягніть фото сюди або клікніть для вибору
                            </p>
                          </div>
                        )}
                        <input
                          id="imageInput"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="d-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Опис</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="form-control"
                    required
                    placeholder="Введіть опис продукту"
                    style={{ resize: "none" }}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
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
                    Створити продукт
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;