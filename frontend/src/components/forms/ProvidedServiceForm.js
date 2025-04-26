import React from 'react';
import ConfirmDialog from '../visual-components/ConfirmDialog';
import { textNumber } from '../utils/Functions';
import './style/form.css';

const ProvidedServiceForm = ({ 
    formData, 
    clients,
    loading, 
    error, 
    handleSubmit, 
    handleDelete, 
    handleChange,
    handleAmountChange,
    handleNumInstallmentsChange,
    handlePaidChange,
    handleClientChange,
    handleClientIdInputChange,
    clientIdInput,
    mode = 'create',
    isDialogOpen,
    setIsDialogOpen
}) => {
    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Dados do Serviço Prestado</h2>
                    
                    <div className="form-field select-id">
                        <label htmlFor="clientIdInput">ID do Cliente:</label>
                        <input
                            type="text"
                            id="clientIdInput"
                            value={clientIdInput}
                            onChange={handleClientIdInputChange}
                            disabled={loading}
                            placeholder="ID"
                        />
                        <select
                            value={formData.client_id}
                            onChange={handleClientChange}
                            disabled={loading}
                            required
                        >
                            <option value={0} disabled>Selecione um Cliente</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="amount">Valor:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="date">Data:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Descrição:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="num_installments">Número de Parcelas:</label>
                        <input
                            type="number"
                            id="num_installments"
                            name="num_installments"
                            min={1}
                            value={formData.num_installments}
                            onChange={(e) => handleNumInstallmentsChange(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="paid">Pago:</label>
                        <input
                            type="checkbox"
                            id="paid"
                            name="paid"
                            checked={formData.paid}
                            onChange={(e) => handlePaidChange(e.target.checked)}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={loading || !formData.client_id  || 
                                !formData.amount || !formData.date || !formData.description || 
                                !formData.num_installments}
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
                message="Tem certeza que deseja deletar este serviço prestado?"
            />
        </div>
    );
};

export default ProvidedServiceForm; 