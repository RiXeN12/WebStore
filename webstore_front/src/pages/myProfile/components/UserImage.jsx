import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import APP_ENV from "../../../env";
import { useSelector } from "react-redux";

const UserImage = ({ user }) => {
    const { uploadImage } = useActions();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const purpleTheme = {
        primaryPurple: "#6a1b9a",
        lightPurple: "#9c4dcc",
        textColor: "#4a148c"
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = async () => {
        if (!selectedFile) {
            toast.error("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("UserId", user.id);
        formData.append("Image", selectedFile);

        const result = await uploadImage(formData);
        if (result.success) {
            toast.success(result.message);
            setPreview(null);
        } else {
            toast.error(`Error: ${result.message}`);
        }
    };

    return (
        <div className="store-profile-image text-center">
            <div className="position-relative mb-3">
                <div
                    className="profile-image-container rounded-circle overflow-hidden border border-3 shadow mx-auto"
                    style={{
                        height: "200px",
                        width: "200px",
                        borderColor: purpleTheme.primaryPurple
                    }}
                >
                    <img
                        src={preview || `${APP_ENV.USER_IMAGE_URL}${user.image}`}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt="no image"
                        loading="lazy"
                        key={user.image}
                    />
                </div>
                <div
                    className="badge position-absolute bottom-0 end-0 p-2 rounded-circle"
                    style={{ backgroundColor: purpleTheme.primaryPurple }}
                >
                    <i className="bi bi-shop fs-5"></i>
                </div>
            </div>
            

            <div className="image-upload-container">
                <div className="custom-file-input mb-3">
                    <input
                        type="file"
                        className="form-control"
                        style={{ borderColor: purpleTheme.lightPurple }}
                        id="formFile"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/gif"
                    />
                </div>
                <button
                    type="button"
                    className="btn text-white w-100"
                    style={{ backgroundColor: purpleTheme.primaryPurple }}
                    onClick={handleSaveImage}
                    disabled={!selectedFile}
                >
                    <i className="bi bi-arrow-up-circle me-2"></i>
                    Оновити зображення
                </button>
            </div>
        </div>
    );
};

export default memo(UserImage);