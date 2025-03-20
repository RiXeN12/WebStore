import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { toast } from "react-toastify";

const CategoriesList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { categoryList } = useSelector((state) => state.category);
  const { getCategories, deleteCategory } = useActions();

  useEffect(() => {
    getCategories();
  }, []);

  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await deleteCategory(id);
    if (result.success) {
      setCategoryToDelete(null);
      toast.success("Категорію успішно видалено");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="category-list-container">
      <div className="product-list-header">
        <h1 className="product-title">Категорії ({categoryList.length})</h1>
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
              <th>КАТЕГОРІЯ</th>
              <th>ОПИС</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  <div className="category-tag category-shoes">
                    <span>{category.name}</span>
                  </div>
                </td>
                <td>{category.description}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => navigate(`edit/${category.id}`)}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => setCategoryToDelete(category.id)}
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
        isOpen={categoryToDelete !== null}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={() => handleDelete(categoryToDelete)}
        title="Видалити категорію?"
        message="Ви впевнені, що хочете видалити категорію з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={categoryToDelete}
      />
    </div>
  );
};

export default CategoriesList;