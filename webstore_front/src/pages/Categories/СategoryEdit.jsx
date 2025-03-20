import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { toast } from "react-toastify";

const CategoryEdit = () => {
  const { updateCategory, deleteCategory } = useActions();
  const { id } = useParams(); // id - це рядок (string)
  const navigate = useNavigate();
  const { categoryList } = useSelector((state) => state.category);
  const [categoryData, setCategoryData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (categoryList.length > 0) {
      // Шукаємо категорію за id (без parseInt, бо id - це рядок)
      const category = categoryList.find((c) => c.id === id);
      if (category) {
        setCategoryData(category);
        setFormData({
          name: category.name,
          description: category.description,
        });
      } else {
        // Якщо категорію не знайдено, перенаправляємо на сторінку категорій
        navigate("/categories");
      }
    }
  }, [id, categoryList, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateCategory({ id, ...formData });
    if (result.success) {
      toast.success("Категорію успішно оновлено");
      navigate("/categories");
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async () => {
    const result = await deleteCategory(id);
    if (result.success) {
      toast.success("Категорію успішно видалено");
      navigate("/categories");
    } else {
      toast.error(result.message);
    }
  };

  if (!categoryData) {
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
                Редагувати категорію
              </h3>
              <p className="text-white-50 text-center mb-0 mt-2">
                ID: {categoryData.id}
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Назва категорії</label>
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
                      placeholder="Введіть назву категорії"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Опис категорії</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="form-control"
                    required
                    placeholder="Введіть опис категорії"
                    style={{ resize: "none" }}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Видалити категорію
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      style={{ borderColor: "#6f42c1", color: "#6f42c1" }}
                      onClick={() => navigate("/categories")}
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
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Видалити категорію?"
        message="Ви впевнені, що хочете видалити категорію з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={categoryData?.id}
      />
    </div>
  );
};

export default CategoryEdit;