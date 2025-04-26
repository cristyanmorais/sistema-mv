import React from 'react';
import ConfirmDialog from '../visual-components/ConfirmDialog';
import { textNumber } from '../utils/Functions';
import './style/form.css';

const CompanyForm = ({ 
    formData, 
    cities,
    loading, 
    error, 
    handleSubmit, 
    handleDelete, 
    handleChange,
    handlePhoneChange,
    handleCnpjChange,
    handleZipCodeChange,
    handleNumberChange,
    handleCityChange,
    handleCityIdInputChange,
    cityIdInput,
    mode = 'create',
    isDialogOpen,
    setIsDialogOpen
}) => {
    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Dados da Empresa</h2>
                    
                    <div className="form-field">
                        <label htmlFor="fantasy_name">Nome Fantasia:</label>
                        <input
                            type="text"
                            id="fantasy_name"
                            name="fantasy_name"
                            value={formData.fantasy_name}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="real_name">Razão Social:</label>
                        <input
                            type="text"
                            id="real_name"
                            name="real_name"
                            value={formData.real_name}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input
                            type="text"
                            id="cnpj"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={(e) => textNumber(e.target.value, handleCnpjChange, 14)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="phone">Telefone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => textNumber(e.target.value, handlePhoneChange, 11)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
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
                        disabled={loading || !formData.fantasy_name || !formData.cnpj || !formData.phone || !formData.email || 
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
                message="Tem certeza que deseja deletar esta empresa?"
            />
        </div>
    );
};

export default CompanyForm; 