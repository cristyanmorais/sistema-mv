import React from 'react';
import ConfirmDialog from '../visual-components/ConfirmDialog';
import './style/form.css';

const CityForm = ({ 
    formData, 
    loading, 
    error, 
    handleSubmit, 
    handleDelete, 
    handleChange,
    mode = 'create',
    isDialogOpen,
    setIsDialogOpen
}) => {
    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={loading || !formData.name}
                        className="primary-button"
                    >
                        {loading ? 'Salvando...' : (mode === 'create' ? 'Criar' : 'Salvar')}
                    </button>

                    {mode === 'edit' && (
                        <button
                            type="button"
                            onClick={() => setIsDialogOpen(true)}
                            disabled={loading}
                            className="danger-button"
                        >
                            Deletar
                        </button>
                    )}
                </div>
            </form>

            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDelete}
                message="Tem certeza que deseja deletar esta cidade?"
            />
        </div>
    );
};

export default CityForm; 