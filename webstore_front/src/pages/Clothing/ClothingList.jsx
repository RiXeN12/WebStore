import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import productImage from "../../hooks/productImage";
import { toast } from "react-toastify";

const ClothingList = () => {
  const { getClothingItems, deleteClothingItem } = useActions();

  const { clothingItemList } = useSelector((state) => state.product);

  useEffect(() => {
    getClothingItems();
  }, []);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = clothingItemList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await deleteClothingItem(id);
    if (result.success) {
      setProductToDelete(null);
      toast.success("Продукт успішно видалено");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-title">Одяг ({clothingItemList.length})</h1>
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
              <th>ТОВАР</th>
              <th>ЦІНА</th>
              <th>КАТЕГОРІЯ</th>
              <th>ВИРОБНИК</th>
              <th>КІЛЬКІСТЬ</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <div className="product-info">
                    <div className="product-image">
                      <img
                        src={productImage(product.images[0]?.filePath)}
                        alt={product.name}
                      />
                    </div>
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.price} грн</td>
                <td>
                  <span className="category-tag category-shoes">
                    {product.category?.name}
                  </span>
                </td>
                <td>
                  <span className="category-tag category-manufacturer">
                    {product.manufacturer?.name}
                  </span>
                </td>
                <td>
                  <span className="category-tag category-clothes">
                    {product.stockQuantity}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => navigate(`edit/${product.id}`)}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => setProductToDelete(product.id)}
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
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => handleDelete(productToDelete)}
        title="Видалити товар?"
        message="Ви впевнені, що хочете видалити товар з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={productToDelete}
      />
    </div>
  );
};

export default ClothingList;
