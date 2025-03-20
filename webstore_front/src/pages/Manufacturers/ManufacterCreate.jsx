import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { toast } from "react-toastify";

const ManufacterCreate = () => {
  const { createManufacturer } = useActions();
  const [formData, setFormData] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createManufacturer(formData);
    if (result.success) {
      toast.success("Виробника успішно створено");
      navigate("/manufacturers");
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
                <i className="bi bi-folder-plus me-2"></i>
                Створити нового виробника
              </h3>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Назва виробника</label>
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
                      placeholder="Введіть назву виробника"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    style={{ borderColor: "#6f42c1", color: "#6f42c1" }}
                    onClick={() => navigate("/manufacturers")}
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
                    Створити виробника
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

export default ManufacterCreate;