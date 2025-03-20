import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, XCircle } from "lucide-react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/DeleteComponent/ConfirmationModal";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import APP_ENV from "../../env";
import { toast } from "react-toastify";

const UsersList = () => {
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);
  const { getUsers, deleteUser } = useActions();

  useEffect(() => {
    getUsers();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result.success) {
      toast.success("Користувача успішно видалено");
      navigate("/users");
      setUserToDelete(null);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="user-title">Користувачі ({users.length})</h1>
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
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>АВАТАР</th>
              <th>ІМ’Я</th>
              <th>EMAIL</th>
              <th>РОЛЬ</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="user-image">
                    <img
                      src={`${APP_ENV.USER_IMAGE_URL}${user.image}`}
                      alt={user.username}
                    />
                  </div>
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="category-tag category-shoes">
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      type="button"
                      onClick={() => navigate(`edit/${user.id}`)}
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => setUserToDelete(user.id)}
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
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => handleDelete(userToDelete)}
        title="Видалити каристувача?"
        message="Ви впевнені, що хочете видалити користувача з id"
        confirmText="Так, видалити"
        cancelText="Скасувати"
        itemId={userToDelete}
      />
    </div>
  );
};

export default UsersList;
