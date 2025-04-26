import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyForm from '../forms/CompanyForm';
import { useCompanyForm } from '../../hooks/useCompanyForm';
import Layout from '../Layout';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const {
        formData,
        cities,
        loading,
        error,
        handleSubmit,
        handleChange,
        handlePhoneChange,
        handleCnpjChange,
        handleZipCodeChange,
        handleNumberChange,
        handleCityChange,
        handleCityIdInputChange,
        cityIdInput
    } = useCompanyForm('create');

    return (
        <Layout>
            <h1>Criar Empresa</h1>
            <CompanyForm
                formData={formData}
                cities={cities}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
                handleDelete={() => {}}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                handleCnpjChange={handleCnpjChange}
                handleZipCodeChange={handleZipCodeChange}
                handleNumberChange={handleNumberChange}
                handleCityChange={handleCityChange}
                handleCityIdInputChange={handleCityIdInputChange}
                cityIdInput={cityIdInput}
                mode="create"
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </Layout>
    );
};

export default CompanyCreate; 