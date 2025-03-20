import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { toast } from "react-toastify";

const ManufacturersList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [manufacturersToDelete, setManufacturersToDelete] = useState(null);
  const { manufacturerList } = useSelector((state) => state.manufacturer);
  const { getManufacturers, deleteManufacturer } = useActions();

  useEffect(() => {
    getManufacturers();
  }, []);

  const filteredManufacturers = manufacturerList.filter((manufacturer) =>
    manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await deleteManufacturer(id);
    if (result.success) {
      setManufacturersToDelete(null);
      toast.success("Виробника успішно видалено");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="manufacter-list-container">
      <div className="product-list-header">
        <h1 className="product-title">Виробники ({manufacturerList.length})</h1>
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Пошук"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={18} />
          </div>
          <button
            className="add-button"
            type="button"
            onClick={() => navigate(`create`)}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ВИРОБНИК</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredManufacturers.map((manufacturer) => (
              <tr key={manufacturer.id}>
                <td>{manufacturer.id}</td>
                <td>
                  <div className="category-tag category-shoes">
                    <span>{manufacturer.name}</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => navigate(`edit/${manufacturer.id}`)}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => setManufacturersToDelete(manufacturer.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={manufacturersToDelete !== null}
        onClose={() => setManufacturersToDelete(null)}
        onConfirm={() => handleDelete(manufacturersToDelete)}
        title="Видалити виробника?"
        message="Ви впевнені, що хочете видалити виробника з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={manufacturersToDelete}
      />
    </div>
  );
};

export default ManufacturersList;