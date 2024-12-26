import React from "react";
import "./confirmDialog.css"; // Importa o arquivo CSS para estilização

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>{message || "Tem certeza que deseja prosseguir?"}</p>
                <div className="confirm-dialog-buttons">
                    <button className="confirm-dialog-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="confirm-dialog-confirm" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;