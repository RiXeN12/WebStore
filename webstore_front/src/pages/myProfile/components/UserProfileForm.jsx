import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";

const UserProfileForm = ({ user }) => {
    const { updateUser } = useActions();

    const [formData, setFormData] = useState({
        userName: user.userName || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateUser = async () => {
        if (!formData.userName) {
            toast.error("Username is required.");
            return;
        }

        const result = await updateUser({
            id: user.id,
            userName: formData.userName,
            email: user.email,
            phoneNumber: null,
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: user.role,
        });

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(`Error: ${result.message}`);
        }
    };

    const purpleTheme = {
        primaryPurple: "#6a1b9a",
        lightPurple: "#9c4dcc",
        textColor: "#4a148c"
    };

    return (
        <div className="store-profile-form">
            <h5 className="mb-3" style={{ color: purpleTheme.primaryPurple }}>Інформація про користувача</h5>
            <form>
                <div className="input-group mb-3">
          <span className="input-group-text text-white" style={{ backgroundColor: purpleTheme.primaryPurple }}>
            <i className="bi bi-person-badge"></i>
          </span>
                    <input
                        type="text"
                        name="userName"
                        className="form-control"
                        style={{ borderColor: purpleTheme.lightPurple }}
                        placeholder="Your store username"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
          <span className="input-group-text text-white" style={{ backgroundColor: purpleTheme.primaryPurple }}>
            <i className="bi bi-person"></i>
          </span>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        style={{ borderColor: purpleTheme.lightPurple }}
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group mb-3">
          <span className="input-group-text text-white" style={{ backgroundColor: purpleTheme.primaryPurple }}>
            <i className="bi bi-person"></i>
          </span>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        style={{ borderColor: purpleTheme.lightPurple }}
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <div className="d-flex justify-content-end mt-4">
                <button
                    type="button"
                    className="btn text-white px-4"
                    style={{ backgroundColor: purpleTheme.primaryPurple }}
                    onClick={handleUpdateUser}
                >
                    <i className="bi bi-save me-2"></i>
                    Оновити
                </button>
            </div>
        </div>
    );
};

export default memo(UserProfileForm);