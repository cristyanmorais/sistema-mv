import React from 'react';
import ConfirmDialog from '../visual-components/ConfirmDialog';
import { textNumber } from '../utils/Functions';
import './style/form.css';

const WorkForm = ({ 
    formData, 
    cities,
    clients,
    loading, 
    error, 
    handleSubmit, 
    handleDelete, 
    handleChange,
    handleAreaChange,
    handleFloorsChange,
    handleZipCodeChange,
    handleNumberChange,
    handleCityChange,
    handleCityIdInputChange,
    handleClientChange,
    handleClientIdInputChange,
    cityIdInput,
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
                    <h2>Dados da Obra</h2>
                    
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

                    <div className="form-field">
                        <label htmlFor="area">Área (m²):</label>
                        <input
                            type="number"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={(e) => handleAreaChange(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="floors">Andares:</label>
                        <input
                            type="number"
                            id="floors"
                            name="floors"
                            value={formData.floors}
                            onChange={(e) => handleFloorsChange(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

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
                </div>

                <div className="form-section">
                    <h2>Endereço</h2>

                    <div className="form-field">
                        <label htmlFor="address.address_line_1">Rua:</label>
                        <input
                            type="text"
                            id="address.address_line_1"
                            name="address.address_line_1"
                            value={formData.address.address_line_1}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="address.address_line_2">Complemento:</label>
                        <input
                            type="text"
                            id="address.address_line_2"
                            name="address.address_line_2"
                            value={formData.address.address_line_2}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="address.number">Número:</label>
                        <input
                            type="text"
                            id="address.number"
                            name="address.number"
                            value={formData.address.number}
                            onChange={(e) => textNumber(e.target.value, handleNumberChange, 10)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="address.zip_code">CEP:</label>
                        <input
                            type="text"
                            id="address.zip_code"
                            name="address.zip_code"
                            value={formData.address.zip_code}
                            onChange={(e) => textNumber(e.target.value, handleZipCodeChange, 8)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field select-id">
                        <label htmlFor="cityIdInput">ID da Cidade:</label>
                        <input
                            type="text"
                            id="cityIdInput"
                            value={cityIdInput}
                            onChange={handleCityIdInputChange}
                            disabled={loading}
                            placeholder="ID"
                        />
                        <select
                            value={formData.address.city_id}
                            onChange={handleCityChange}
                            disabled={loading}
                            required
                        >
                            <option value={0} disabled>Selecione uma Cidade</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        disabled={loading || !formData.name || !formData.area || !formData.floors || !formData.client_id || 
                                !formData.address.address_line_1 || !formData.address.zip_code || 
                                !formData.address.city_id || !formData.address.number}
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
                message="Tem certeza que deseja deletar esta obra?"
            />
        </div>
    );
};

export default WorkForm; 