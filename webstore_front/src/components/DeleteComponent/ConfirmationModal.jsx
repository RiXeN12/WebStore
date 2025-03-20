import React from 'react';
import { XCircle } from 'lucide-react';
import './style.css';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Так, видалити", 
  cancelText = "Скасувати",
  itemId
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <XCircle size={24} />
        </button>
        <h2>{title}</h2>
        <p>{message} <strong>{itemId}</strong>?</p>
        <div className="modal-actions">
          <button 
            className="confirm-button"
            onClick={() => onConfirm(itemId)}
          >
            {confirmText}
          </button>
          <button 
            className="cancel-button"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;